import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

// Define what user data we want to store
type SerializableUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
};

type AuthState = {
  status: 'SIGNED_IN' | 'SIGNED_OUT' | 'UNKNOWN';
  currentUser: SerializableUser | null;
};

const initialState: AuthState = {
  status: 'UNKNOWN',
  currentUser: null,
};

// Helper function to convert Firebase User to serializable user
export const serializeUser = (user: User): SerializableUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  emailVerified: user.emailVerified
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ user: SerializableUser }>) => {
      state.status = 'SIGNED_IN';
      state.currentUser = action.payload.user;
    },
    signOut: (state) => {
      state.status = 'SIGNED_OUT';
      state.currentUser = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;