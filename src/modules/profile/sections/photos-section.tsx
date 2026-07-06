"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Loader2Icon, UploadCloudIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import { mediaService } from "@/services/media.service";
import { formatImage } from "@/utils/format-image";
import { cn } from "@/lib/utils";
import ProfileSectionShell from "../profile-section-shell";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

async function uploadFile(file: File): Promise<string> {
  const res = await mediaService.uploadMedia(file);
  if (res.statusCode >= 400) throw new Error(res.message);
  return res.data.path;
}

export default function PhotosSection() {
  const { profile, setProfile } = useAuth();
  const [paths, setPaths] = useState<string[]>(profile?.profileImages ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    // Snapshot to a plain array BEFORE resetting — setting input.value to ""
    // clears the FileList in place.
    const fileArray = Array.from(files);
    if (inputRef.current) inputRef.current.value = "";

    const valid = fileArray.filter((file) => {
      if (file.size > MAX_SIZE) {
        toast.error(`${file.name} exceeds the 10 MB limit`);
        return false;
      }
      return true;
    });
    if (valid.length === 0) return;

    setUploading(true);
    const uploaded: string[] = [];
    for (const file of valid) {
      try {
        uploaded.push(await uploadFile(file));
      } catch {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
    if (uploaded.length > 0) setPaths((prev) => [...prev, ...uploaded]);
    setUploading(false);
  };

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (paths.length === 0) {
      toast.error("Add at least one profile photo");
      return;
    }
    try {
      setSaving(true);
      const res = await authService.updateProfile({ profileImages: paths });
      if (res.statusCode >= 400) throw new Error(res.message);
      setProfile(res.data);
      toast.success("Profile photos updated");
    } catch (error) {
      toast.error((error as Error).message ?? "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProfileSectionShell
      title="Profile Photos"
      description="Add or remove the photos shown on your profile."
      isLoading={saving}
      onSubmit={handleSave}
    >
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">Your Photos</p>
          {paths.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {paths.length} {paths.length === 1 ? "photo" : "photos"}
            </span>
          )}
        </div>

        {paths.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {paths.map((path) => (
              <div
                key={path}
                className="group relative h-24 w-24 overflow-hidden rounded-xl border border-border"
              >
                <Image
                  src={formatImage(path)}
                  alt="profile photo"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
                <button
                  type="button"
                  onClick={() =>
                    setPaths((prev) => prev.filter((p) => p !== path))
                  }
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <XIcon className="size-5 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/30 py-8 text-sm text-muted-foreground transition-colors hover:border-[#E32C6F]/50 hover:bg-[#E32C6F]/5 disabled:pointer-events-none disabled:opacity-60",
          )}
        >
          {uploading ? (
            <Loader2Icon className="size-6 animate-spin text-[#E32C6F]" />
          ) : (
            <UploadCloudIcon className="size-6" />
          )}
          <span>{uploading ? "Uploading…" : "Click to upload"}</span>
          <span className="text-xs">JPG, PNG or WEBP — max 10 MB each</span>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </ProfileSectionShell>
  );
}
