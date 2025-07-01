
import { describe, it, expect, vi } from 'vitest';
import threadsReducer, {
  fetchThreads,
  createNewThread,
  clearCurrentThread,
} from '@/store/slices/threadsSlice';

// Mock API service
vi.mock('@/services/api', () => ({
  apiService: {
    getThreads: vi.fn(),
    getThreadDetail: vi.fn(),
    createThread: vi.fn(),
    upVoteThread: vi.fn(),
    downVoteThread: vi.fn(),
    neutralizeThreadVote: vi.fn(),
  },
}));

const mockThread = {
  id: '1',
  title: 'Test Thread',
  body: 'Test body',
  category: 'javascript',
  createdAt: '2023-01-01T00:00:00.000Z',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
  user: { name: 'Test User', avatar: '' },
};

describe('threadsSlice reducer', () => {
  const initialState = {
    threads: [],
    currentThread: null,
    loading: false,
    error: null,
  };

  it('should handle clearCurrentThread', () => {
    const stateWithThread = {
      ...initialState,
      currentThread: mockThread,
    };

    const action = clearCurrentThread();
    const newState = threadsReducer(stateWithThread, action);

    expect(newState.currentThread).toBeNull();
  });

  it('should handle fetchThreads pending', () => {
    const action = { type: fetchThreads.pending.type };
    const newState = threadsReducer(initialState, action);

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should handle fetchThreads fulfilled', () => {
    const threads = [mockThread];
    const action = {
      type: fetchThreads.fulfilled.type,
      payload: threads
    };
    const newState = threadsReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.threads).toEqual(threads);
  });

  it('should handle fetchThreads rejected', () => {
    const action = {
      type: fetchThreads.rejected.type,
      error: { message: 'Network error' }
    };
    const newState = threadsReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Network error');
  });

  it('should handle createNewThread fulfilled', () => {
    const action = {
      type: createNewThread.fulfilled.type,
      payload: mockThread
    };
    const newState = threadsReducer(initialState, action);

    expect(newState.threads).toHaveLength(1);
    expect(newState.threads[0]).toEqual(mockThread);
  });
});
