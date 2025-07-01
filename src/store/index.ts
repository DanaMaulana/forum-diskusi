
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import threadsSlice from './slices/threadsSlice';
import usersSlice from './slices/usersSlice';
import leaderboardSlice from './slices/leaderboardSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    threads: threadsSlice,
    users: usersSlice,
    leaderboard: leaderboardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
