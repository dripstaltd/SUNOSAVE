import { useSignIn } from "../../../hooks/auth";


export const SignInButton = () => {
  const { signIn } = useSignIn();

  return (
    <button
      onClick={signIn}
      type="button"
      className="btn btn-primary w-full"
    >
      Sign In With Google
    </button>
  );
};
