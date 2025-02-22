import { useAuthState } from "../../hooks/auth";
import { SignInButton } from "../domain/auth/SignInButton";
import { SignOutButton } from "../domain/auth/SignOutButton";
import Avatar from "../shared/avatar/Avatar";

export const Header = () => {
  const state = useAuthState();

  return (
    <nav className="p-4 flex items-center justify-between bg-gray-900 text-white">
      <span className="text-lg font-bold">My App</span>
      <div className="flex items-center gap-4">
        {state.status === "SIGNED_IN" && <Avatar />}
        {state.status === "SIGNED_IN" ? <SignOutButton /> : <SignInButton />}
      </div>
    </nav>
  );
};