import { Link } from "react-router-dom";
import { useAuthState } from "../../hooks/auth";
import { SignInButton } from "../domain/auth/SignInButton";
import { SignOutButton } from "../domain/auth/SignOutButton";
import Avatar from "../shared/avatar/Avatar";

export const Header = () => {
  const state = useAuthState();

  return (
    <nav className="hidden lg:flex flex-col w-64 bg-base-200 p-4 gap-8">
      {/* App Title */}
      <h1 className="text-2xl font-bold text-primary">SUNOSAVE</h1>

      {/* Navigation */}
      <div className="flex flex-col gap-2">
        <Link to="/" className="btn btn-ghost justify-start">Home</Link>
        <Link to="/lyrics" className="btn btn-ghost justify-start">Lyrics</Link>
        <Link to="/prompts" className="btn btn-ghost justify-start">Prompts</Link>
        <Link to="/songs" className="btn btn-ghost justify-start">Songs</Link>
        <Link to="/artwork" className="btn btn-ghost justify-start">Artwork</Link>
      </div>

      {/* User Section - Pushed to bottom */}
      <div className="mt-auto space-y-4">
        {state.status === "SIGNED_IN" && <Avatar />}
        {state.status === "SIGNED_IN" ? <SignOutButton /> : <SignInButton />}
      </div>
    </nav>
  );
};