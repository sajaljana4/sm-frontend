import { loginDialogAtom, userprofileAtom } from "@/context/auth.context";
import { UserType } from "@/types/common/user.type";
import { useAtom } from "jotai";
import { usePromise } from "./usePromise";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

interface UseAuthReturns {
  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  profile: UserType | null;
  setProfile: (profile: UserType | null) => void;
  fetchingProfile: boolean;
  refetchProfile: () => void;
}

export const useAuth = (): UseAuthReturns => {
  const router = useRouter();
  const [loginModalOpen, setLoginModalOpen] = useAtom(loginDialogAtom);
  const [profile, setProfile] = useAtom(userprofileAtom);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const { loading: fetchingProfile, runPromise: refetchProfile } = usePromise({
    initialLoading: true,
    promise: authService.profile,
    onSuccess: (response) => {
      setProfile(response.data);
      const { isPublished } = response.data;
      if (!isPublished) {
        router.replace("/auth/verification-pending");
      }
    },
  });

  return {
    loginModalOpen,
    openLoginModal,
    closeLoginModal,
    profile,
    setProfile,
    fetchingProfile,
    refetchProfile,
  };
};
