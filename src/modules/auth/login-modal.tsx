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

type LoginTab = "email" | "phone" | "smId";

const LOGIN_TABS: { id: LoginTab; label: string }[] = [
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "smId", label: "SM ID" },
];

function LoginModal() {
  const router = useRouter();
  const { loginModalOpen, closeLoginModal, setProfile } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<LoginTab>("email");

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
    resetField,
    formState: { errors },
  } = methods;

  const handleTabChange = (tab: LoginTab) => {
    resetField("email");
    resetField("phone");
    resetField("smId");
    setActiveTab(tab);
  };

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
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 p-0 w-full md:max-w-4xl overflow-hidden">
        <DialogTitle hidden />

        <div className="relative h-130 w-full hidden md:block">
          <Image
            src={smLogo}
            width={200}
            height={200}
            alt="Logo"
            className="w-10 aspect-4/3 absolute top-8 left-8 z-10"
          />
          <Image
            src={loginModalImage}
            alt="login"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center py-10">
          <Image
            src={decorativeLeaf}
            alt="Decorative Element"
            width={100}
            height={100}
            className="w-20 aspect-square object-contain"
          />

          <div className="text-center max-w-md py-6">
            <h4 className="text-2xl font-bold">LOG IN</h4>
            <p>Choose how you&apos;d like to sign in to your account</p>
          </div>

          <div className="w-full max-w-md space-y-4 pr-6">
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {LOGIN_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#E32C6F] text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <FormProvider {...methods}>
              {activeTab === "email" && (
                <Input
                  placeholder="Email"
                  type="email"
                  {...register("email")}
                  error={errors.email?.message}
                />
              )}
              {activeTab === "phone" && (
                <PhoneInput
                  placeholder="XXXXXXXXXX"
                  error={errors.phone?.message}
                  value={methods.watch("phone")}
                  onChange={(value) => methods.setValue("phone", value)}
                  onBlur={() => {}}
                />
              )}
              {activeTab === "smId" && (
                <Input
                  placeholder="SM ID"
                  {...register("smId")}
                  error={errors.smId?.message}
                />
              )}
              <Input
                placeholder="Password"
                type="password"
                {...register("password")}
                error={errors.password?.message}
              />
              <Button
                size={"lg"}
                className="bg-[#E32C6F] w-full"
                onClick={handleSubmit(onSubmit)}
                isLoading={loading}
              >
                LOG IN
              </Button>
            </FormProvider>
            <p className="text-center">
              Don&apos;t have an account?{" "}
              <Button variant={"link"} onClick={navigateToRegister}>
                Register
              </Button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
