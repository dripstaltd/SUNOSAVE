import { useEffect, ReactNode } from 'react';
import { auth } from '../../../lib/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signIn, signOut } from '../../../store/slices/authSlice';
import { serializeUser } from '../../../store/slices/authSlice';
import { useMutation, gql } from '@apollo/client';

const UPSERT_USER = gql`
  mutation UpsertUser($id: String!, $email: String!, $name: String) {
    upsertUser(id: $id, email: $email, name: $name) {
      id
      email
      name
    }
  }
`;

export const AuthInitializer = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const [upsertUser] = useMutation(UPSERT_USER);

  useEffect(() => {
    const syncUser = async (user: User | null) => {
      if (user) {
        try {
          await upsertUser({
            variables: {
              id: user.uid,
              email: user.email,
              name: user.displayName,
            },
          });
          dispatch(signIn({ user: serializeUser(user) }));
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      } else {
        dispatch(signOut());
      }
    };

    const unsubscribe = onAuthStateChanged(auth, syncUser);
    return () => unsubscribe();
  }, [dispatch, upsertUser]);

  return <>{children}</>;
};
