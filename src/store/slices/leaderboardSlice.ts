
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';

interface LeaderboardUser {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  score: number;
}

interface LeaderboardState {
  leaderboards: LeaderboardUser[];
  loading: boolean;
  error: string | null;
}

const initialState: LeaderboardState = {
  leaderboards: [],
  loading: false,
  error: null,
};

export const fetchLeaderboards = createAsyncThunk(
  'leaderboard/fetchLeaderboards',
  async () => {
    const response = await apiService.getLeaderboards();
    return response.data.leaderboards;
  }
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboards.fulfilled, (state, action: PayloadAction<LeaderboardUser[]>) => {
        state.loading = false;
        state.leaderboards = action.payload;
      })
      .addCase(fetchLeaderboards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch leaderboards';
      });
  },
});

export default leaderboardSlice.reducer;
