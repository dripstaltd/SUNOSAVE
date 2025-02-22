import { auth } from "../lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut
} from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signOut, serializeUser } from '../store/slices/authSlice';
import { RootState } from '../store/store';

export const useAuthState = () => {
  const authState = useSelector((state: RootState) => state.auth);
  return authState;
};

export const useSignIn = () => {
  const dispatch = useDispatch();

  return {
    signIn: async () => {
      if (auth.currentUser) {
        console.log("🚀 User already signed in:", auth.currentUser);
        dispatch(signIn({ user: serializeUser(auth.currentUser) }));
        return;
      }

      console.log("🖼️ Using popup for Google login...");
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        console.log("✅ Signed in with popup:", result.user);
        dispatch(signIn({ user: serializeUser(result.user) }));
      } catch (error) {
        console.error("❌ Error during sign-in popup:", error);
      }
    }
  };
};

export const useSignOut = () => {
  const dispatch = useDispatch();

  return {
    signOut: async () => {
      await firebaseSignOut(auth);
      dispatch(signOut());
    }
  };
};
