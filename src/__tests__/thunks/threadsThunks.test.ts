/** Skenario pengujian threads thunks:
 *  Skenario 1: Fetch threads berhasil
 *    - Mock API getThreads, verifikasi data threads
 *  Skenario 2: Handle fetchThreads error
 *    - Mock API error, verifikasi error handling
 *  Skenario 3: Fetch thread detail berhasil
 *    - Mock API getThreadDetail dengan ID, verifikasi thread data
 *  Skenario 4: Create new thread berhasil
 *    - Mock API createThread, verifikasi thread creation dengan parameter
 *  Skenario 5-7: Vote thread (upvote, downvote, neutralize)
 *    - Mock API calls untuk berbagai jenis voting, verifikasi API calls
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { fetchThreads, fetchThreadDetail, createNewThread, voteThread } from '@/store/slices/threadsSlice';
import threadsReducer from '@/store/slices/threadsSlice';
import { apiService } from '@/services/api';

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockApiService = apiService as any;

describe('threads thunks', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;

  beforeEach(() => {
    vi.clearAllMocks();
    store = configureStore({
      reducer: {
        threads: threadsReducer,
      },
    });
  });

  describe('fetchThreads', () => {
    it('should fetch threads successfully', async () => {
      const mockThreads = [
        {
          id: '1',
          title: 'Test Thread',
          body: 'Test body',
          category: 'javascript',
          createdAt: '2023-01-01T00:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
          user: { name: 'Test User', avatar: '' },
        },
      ];

      mockApiService.getThreads.mockResolvedValue({
        data: { threads: mockThreads },
      });

      const result = await store.dispatch(fetchThreads());

      expect(result.type).toBe('threads/fetchThreads/fulfilled');
      expect(result.payload).toEqual(mockThreads);
      expect(mockApiService.getThreads).toHaveBeenCalledTimes(1);
    });

    it('should handle fetchThreads error', async () => {
      mockApiService.getThreads.mockRejectedValue(new Error('Network error'));

      const result = await store.dispatch(fetchThreads());

      expect(result.type).toBe('threads/fetchThreads/rejected');
      expect(result.error.message).toBe('Network error');
    });
  });

  describe('fetchThreadDetail', () => {
    it('should fetch thread detail successfully', async () => {
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

      mockApiService.getThreadDetail.mockResolvedValue({
        data: { detailThread: mockThread },
      });

      const result = await store.dispatch(fetchThreadDetail('1'));

      expect(result.type).toBe('threads/fetchThreadDetail/fulfilled');
      expect(result.payload).toEqual(mockThread);
      expect(mockApiService.getThreadDetail).toHaveBeenCalledWith('1');
    });
  });

  describe('createNewThread', () => {
    it('should create new thread successfully', async () => {
      const newThread = {
        title: 'New Thread',
        body: 'New body',
        category: 'react',
      };
      const mockCreatedThread = {
        id: '2',
        ...newThread,
        createdAt: '2023-01-01T00:00:00.000Z',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
        user: { name: 'Test User', avatar: '' },
      };

      mockApiService.createThread.mockResolvedValue({
        data: { thread: mockCreatedThread },
      });

      const result = await store.dispatch(createNewThread(newThread));

      expect(result.type).toBe('threads/createThread/fulfilled');
      expect(result.payload).toEqual(mockCreatedThread);
      expect(mockApiService.createThread).toHaveBeenCalledWith(
        newThread.title,
        newThread.body,
        newThread.category
      );
    });
  });

  describe('voteThread', () => {
    it('should upvote thread successfully', async () => {
      mockApiService.upVoteThread.mockResolvedValue({});

      const result = await store.dispatch(voteThread({ threadId: '1', voteType: 'up' }));

      expect(result.type).toBe('threads/voteThread/fulfilled');
      expect(result.payload).toEqual({ threadId: '1', voteType: 'up' });
      expect(mockApiService.upVoteThread).toHaveBeenCalledWith('1');
    });

    it('should downvote thread successfully', async () => {
      mockApiService.downVoteThread.mockResolvedValue({});

      const result = await store.dispatch(voteThread({ threadId: '1', voteType: 'down' }));

      expect(result.type).toBe('threads/voteThread/fulfilled');
      expect(result.payload).toEqual({ threadId: '1', voteType: 'down' });
      expect(mockApiService.downVoteThread).toHaveBeenCalledWith('1');
    });

    it('should neutralize thread vote successfully', async () => {
      mockApiService.neutralizeThreadVote.mockResolvedValue({});

      const result = await store.dispatch(voteThread({ threadId: '1', voteType: 'neutral' }));

      expect(result.type).toBe('threads/voteThread/fulfilled');
      expect(result.payload).toEqual({ threadId: '1', voteType: 'neutral' });
      expect(mockApiService.neutralizeThreadVote).toHaveBeenCalledWith('1');
    });
  });
});
