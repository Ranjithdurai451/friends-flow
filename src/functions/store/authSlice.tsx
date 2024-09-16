import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from '../appwrite/api';

type user = {
  $id: string;
  name: string;
  username: string;
  email: string;
  profileUrl: string;
  bio: string;
};
const initialUser = {
  id: '',
  name: '',
  username: '',
  email: '',
  profileUrl: '',
  bio: '',
};
type auth = {
  user: user | unknown;
  isAuthenticated: boolean;
};
const initialState: auth = {
  user: initialUser,
  isAuthenticated: false,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeUserState(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    reset(state) {
      state.isAuthenticated = false;
      state.user = initialUser;
    },
  },
});
export const authActions = authSlice.actions;

export const setUserState = async (): Promise<unknown> => {
  return async (dispatch: Dispatch) => {
    try {
      const currentUser = (await getCurrentUser()) as unknown as user;
      if (currentUser) {
        dispatch(
          authActions.changeUserState({
            id: currentUser.$id,
            name: currentUser.name,
            username: currentUser.username,
            email: currentUser.email,
            profileUrl: currentUser.profileUrl,
            bio: currentUser.bio,
          })
        );
      } else {
        dispatch(authActions.reset());
      }
    } catch (error) {
      console.log('error');
    }
  };
};
