
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';

interface Thread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  upVotesBy: string[];
  downVotesBy: string[];
  totalComments: number;
  user: {
    name: string;
    avatar: string;
  };
  owner?: {
    id: string;
    name: string;
    avatar: string;
  };
  comments?: Array<{
    id: string;
    content: string;
    createdAt: string;
    owner: {
      id: string;
      name: string;
      avatar: string;
    };
    upVotesBy: string[];
    downVotesBy: string[];
  }>;
}

interface ThreadsState {
  threads: Thread[];
  currentThread: Thread | null;
  loading: boolean;
  error: string | null;
}

const initialState: ThreadsState = {
  threads: [],
  currentThread: null,
  loading: false,
  error: null,
};

export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async () => {
    const response = await apiService.getThreads();
    return response.data.threads;
  }
);

export const fetchThreadDetail = createAsyncThunk(
  'threads/fetchThreadDetail',
  async (id: string) => {
    const response = await apiService.getThreadDetail(id);
    return response.data.detailThread;
  }
);

export const createNewThread = createAsyncThunk(
  'threads/createThread',
  async ({ title, body, category }: { title: string; body: string; category: string }) => {
    const response = await apiService.createThread(title, body, category);
    return response.data.thread;
  }
);

export const voteThread = createAsyncThunk(
  'threads/voteThread',
  async ({ threadId, voteType }: { threadId: string; voteType: 'up' | 'down' | 'neutral' }) => {
    if (voteType === 'up') {
      await apiService.upVoteThread(threadId);
    } else if (voteType === 'down') {
      await apiService.downVoteThread(threadId);
    } else {
      await apiService.neutralizeThreadVote(threadId);
    }
    return { threadId, voteType };
  }
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    clearCurrentThread: (state) => {
      state.currentThread = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action: PayloadAction<Thread[]>) => {
        state.loading = false;
        state.threads = action.payload;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch threads';
      })
      .addCase(fetchThreadDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action: PayloadAction<Thread>) => {
        state.loading = false;
        state.currentThread = action.payload;
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch thread detail';
      })
      .addCase(createNewThread.fulfilled, (state, action: PayloadAction<Thread>) => {
        state.threads.unshift(action.payload);
      });
  },
});

export const { clearCurrentThread } = threadsSlice.actions;
export default threadsSlice.reducer;
