import { useEffect, ReactNode } from "react";
import { auth } from "../../../lib/firebase";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { signIn, signOut } from '../../../store/slices/authSlice';
import { serializeUser } from '../../../store/slices/authSlice';

export const AuthInitializer = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("✅ User signed in via redirect:", result.user);
          dispatch(signIn({ user: serializeUser(result.user) }));
        } else {
          console.log("⚠️ No user returned from redirect.");
        }
      })
      .catch((error) => console.error("❌ Error handling sign-in redirect:", error));

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(signIn({ user: serializeUser(user) }));
      } else {
        dispatch(signOut());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};