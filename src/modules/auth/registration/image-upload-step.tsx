"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Loader2Icon, UploadCloudIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import StepWrapper from "./step-wrapper";
import { authService } from "@/services/auth.service";
import { formatImage } from "@/utils/format-image";
import { cn } from "@/lib/utils";

interface ImageUploadStepProps {
  registrationToken: string;
  defaultProfileImages?: string[];
  defaultIdCardImages?: string[];
  onComplete: (data: {
    profileImages: string[];
    idCardImages: string[];
  }) => void;
  onBack: () => void;
  isLoading?: boolean;
}

async function uploadFile(
  file: File,
  registrationToken: string,
): Promise<string> {
  const res = await authService.uploadAccountDocuments({ file, registrationToken });
  if (res.statusCode >= 400) throw new Error(res.message);
  return res.data.path;
}

interface UploadZoneProps {
  label: string;
  hint: string;
  paths: string[];
  uploading: boolean;
  registrationToken: string;
  accept?: string;
  multiple?: boolean;
  onUploaded: (paths: string[]) => void;
  onRemove: (path: string) => void;
}

function UploadZone({
  label,
  hint,
  paths,
  uploading,
  registrationToken,
  accept = "image/*",
  multiple = true,
  onUploaded,
  onRemove,
}: Readonly<UploadZoneProps>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localUploading, setLocalUploading] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    // Snapshot to a plain array BEFORE resetting — the browser clears the
    // FileList object in place when input.value is set to "", so any reference
    // to the original FileList would become empty after the reset.
    const fileArray = Array.from(files);
    if (inputRef.current) inputRef.current.value = "";

    const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
    const valid = fileArray.filter((file) => {
      if (file.size > MAX_SIZE) {
        toast.error(`${file.name} exceeds the 10 MB limit`);
        return false;
      }
      return true;
    });
    if (valid.length === 0) return;
    setLocalUploading(true);
    const uploaded: string[] = [];
    for (const file of valid) {
      try {
        const path = await uploadFile(file, registrationToken);
        uploaded.push(path);
      } catch {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
    if (uploaded.length > 0) onUploaded(uploaded);
    setLocalUploading(false);
  };

  const isLoading = uploading || localUploading;

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {paths.length > 0 && (
          <span className="text-xs text-muted-foreground">
            {paths.length} {paths.length === 1 ? "file" : "files"} uploaded
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {paths.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {paths.map((path) => (
            <div
              key={path}
              className="relative w-24 h-24 rounded-xl overflow-hidden border border-border group"
            >
              <Image
                src={formatImage(path)}
                alt="uploaded"
                fill
                className="object-cover"
                sizes="96px"
              />
              <button
                type="button"
                onClick={() => onRemove(path)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <XIcon className="size-5 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <button
        type="button"
        disabled={isLoading}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "w-full flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/30 py-8 text-sm text-muted-foreground transition-colors hover:border-[#E32C6F]/50 hover:bg-[#E32C6F]/5 disabled:pointer-events-none disabled:opacity-60",
        )}
      >
        {isLoading ? (
          <Loader2Icon className="size-6 animate-spin text-[#E32C6F]" />
        ) : (
          <UploadCloudIcon className="size-6" />
        )}
        <span>{isLoading ? "Uploading…" : "Click to upload"}</span>
        <span className="text-xs">{hint}</span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

export default function ImageUploadStep({
  registrationToken,
  defaultProfileImages = [],
  defaultIdCardImages = [],
  onComplete,
  onBack,
  isLoading = false,
}: Readonly<ImageUploadStepProps>) {
  const [profilePaths, setProfilePaths] =
    useState<string[]>(defaultProfileImages);
  const [idCardPaths, setIdCardPaths] = useState<string[]>(defaultIdCardImages);

  const handleComplete = () => {
    onComplete({ profileImages: profilePaths, idCardImages: idCardPaths });
  };

  return (
    <StepWrapper
      title="UPLOAD PHOTOS"
      subtitle="Add your profile photo and ID for verification"
    >
      <UploadZone
        label="Profile Photos"
        hint="JPG, PNG or WEBP — max 10 MB each"
        paths={profilePaths}
        uploading={false}
        registrationToken={registrationToken}
        onUploaded={(newPaths) =>
          setProfilePaths((prev) => [...prev, ...newPaths])
        }
        onRemove={(path) =>
          setProfilePaths((prev) => prev.filter((p) => p !== path))
        }
      />

      <UploadZone
        label="ID Card Images"
        hint="Aadhaar, PAN or Voter ID — JPG or PNG"
        paths={idCardPaths}
        uploading={false}
        registrationToken={registrationToken}
        onUploaded={(newPaths) =>
          setIdCardPaths((prev) => [...prev, ...newPaths])
        }
        onRemove={(path) =>
          setIdCardPaths((prev) => prev.filter((p) => p !== path))
        }
      />

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="flex-1 rounded-full"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="button"
          size="lg"
          className="flex-1 bg-[#E32C6F] hover:bg-[#c4225e] text-white rounded-full"
          onClick={handleComplete}
          isLoading={isLoading}
        >
          Complete Registration
        </Button>
      </div>
    </StepWrapper>
  );
}
