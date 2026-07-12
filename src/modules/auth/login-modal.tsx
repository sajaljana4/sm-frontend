"use client";
import { decorativeLeaf, smLogo } from "@/assets";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import { setAuthToken } from "@/utils/cookie-storage";
import { loginSchema, LoginSchemaType } from "@/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const loginModalImage =
  "https://images.unsplash.com/photo-1621801306185-8c0ccf9c8eb8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function LoginModal() {
  const router = useRouter();
  const { loginModalOpen, closeLoginModal, setProfile } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const navigateToRegister = () => {
    closeLoginModal();
    router.push("/auth/register");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      setLoading(true);
      const res = await authService.login(data);
      if (!res.data) {
        throw new Error(res.message ?? "Failed to login");
      }
      const { user, accessToken } = res.data;
      setProfile(user);
      await setAuthToken(accessToken);
      toast.success("Login successful");
      closeLoginModal();
      router.push("/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={loginModalOpen} onOpenChange={closeLoginModal}>
      <DialogContent
        showCloseButton={false}
        className="grid grid-cols-1 lg:grid-cols-2 p-0 w-full md:max-w-4xl overflow-hidden bg-white rounded-2xl gap-0"
      >
        <DialogTitle hidden>Log in</DialogTitle>

        {/* wrapper only exists to give absolute children a positioning context —
            does not touch DialogContent's own fixed/centering classes */}
        <div className="relative col-span-full grid grid-cols-1 lg:grid-cols-2 items-stretch">
          {/* top ribbon accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#B3243A] via-[#C9302E] to-[#98BA42] z-20" />

          {/* custom close button */}
          <button
            type="button"
            onClick={closeLoginModal}
            aria-label="Close"
            className="cursor-pointer absolute top-5 right-5 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white border border-black/10 text-black/50 hover:text-[#B3243A] hover:border-[#B3243A]/30 shadow-sm transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2L14 14M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* image side — stretches to match the form column's height instead of a fixed h-130 */}
          <div className="relative w-full h-full min-h-130 hidden lg:block">
            <Image
              src={loginModalImage}
              alt="Raibar"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B16] via-[#1E1B16]/40 to-[#B3243A]/25" />

            <Image
              src={smLogo}
              width={40}
              height={40}
              alt="Raibar"
              className="absolute top-8 left-8 z-10 w-10 h-10 object-contain"
            />

            <svg
              className="absolute bottom-8 left-8 w-16 h-16 text-[#98BA42]/70"
              viewBox="0 0 64 64"
              fill="none"
            >
              <path
                d="M4 60V16C4 9.373 9.373 4 16 4h44"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <circle cx="4" cy="60" r="2.5" fill="currentColor" />
            </svg>

            <div className="absolute bottom-8 right-8 z-10 text-right">
              <p className="text-md tracking-[0.25em] uppercase text-[#F5F0E8]/70 font-medium">
                Santali Matrimony
              </p>
              <p className="text-xs font-serif italic text-[#F5F0E8]/50 tracking-wide">
                India&apos;s Trusted Santhali Matrimony
              </p>
            </div>
          </div>

          {/* form side */}
          <div className="flex flex-col items-center justify-center py-12 px-8 sm:px-12">
            <Image
              src={decorativeLeaf}
              alt=""
              width={72}
              height={72}
              className="w-14 aspect-square object-contain opacity-80"
            />

            <div className="text-center max-w-md pt-5 pb-8">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold bg-[#98BA42]/12 text-[#6f8a2e] border border-[#98BA42]/25 mb-4">
                Sign In
              </span>
              <h4 className="font-serif text-3xl text-[#1E1B16]">
                Welcome Back
              </h4>
              <p className="text-[#1E1B16]/55 text-sm mt-2">
                Continue your journey to find a life partner
              </p>
            </div>

            <div className="w-full max-w-md space-y-4">
              <FormProvider {...methods}>
                <Input
                  placeholder="Email / Phone / SMID"
                  type="email"
                  {...register("email")}
                  error={errors.email?.message}
                  className="bg-[#FAFAF8] border border-black/12 text-[#1E1B16] placeholder:text-black/35 hover:border-black/20 focus-visible:ring-[#98BA42]/30 focus-visible:border-[#98BA42]/60 h-12 rounded-lg"
                />
                <Input
                  placeholder="Password"
                  type="password"
                  {...register("password")}
                  error={errors.password?.message}
                  className="bg-[#FAFAF8] border border-black/12 text-[#1E1B16] placeholder:text-black/35 hover:border-black/20 focus-visible:ring-[#98BA42]/30 focus-visible:border-[#98BA42]/60 h-12 rounded-lg"
                />

                <Button
                  size="lg"
                  className="w-full h-12 bg-[#B3243A] hover:bg-[#C9302E] text-white font-medium tracking-wide rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed disabled:bg-[#B3243A]/50 disabled:text-white/60"
                  onClick={handleSubmit(onSubmit)}
                  isLoading={loading}
                >
                  LOG IN
                </Button>
              </FormProvider>

              <div className="flex items-center gap-3 py-1">
                <span className="h-px flex-1 bg-black/10" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-black/35">
                  New here
                </span>
                <span className="h-px flex-1 bg-black/10" />
              </div>

              <p className="text-center text-[#1E1B16]/60 text-sm">
                Don&apos;t have an account?{" "}
                <Button
                  variant="link"
                  onClick={navigateToRegister}
                  className="text-[#B3243A] hover:text-[#C9302E] px-1 cursor-pointer transition-colors text-sm font-medium"
                >
                  Register
                </Button>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
