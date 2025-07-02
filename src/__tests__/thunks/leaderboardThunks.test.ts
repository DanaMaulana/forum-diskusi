/** Skenario pengujian leaderboard thunks:
 *  Skenario 1: Fetch leaderboards berhasil
 *    - Mock API getLeaderboards, verifikasi data leaderboards
 *  Skenario 2: Handle fetchLeaderboards error
 *    - Mock API error, verifikasi error handling
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { fetchLeaderboards } from '@/store/slices/leaderboardSlice';
import leaderboardReducer from '@/store/slices/leaderboardSlice';
import { apiService } from '@/services/api';

// Mock API service
vi.mock('@/services/api', () => ({
  apiService: {
    getLeaderboards: vi.fn(),
  },
}));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockApiService = apiService as any;

describe('leaderboard thunks', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;

  beforeEach(() => {
    vi.clearAllMocks();
    store = configureStore({
      reducer: {
        leaderboard: leaderboardReducer,
      },
    });
  });

  describe('fetchLeaderboards', () => {
    it('should fetch leaderboards successfully', async () => {
      const mockLeaderboards = [
        {
          user: {
            id: '1',
            name: 'User 1',
            email: 'user1@example.com',
            avatar: 'avatar1.jpg',
          },
          score: 100,
        },
        {
          user: {
            id: '2',
            name: 'User 2',
            email: 'user2@example.com',
            avatar: 'avatar2.jpg',
          },
          score: 90,
        },
      ];

      mockApiService.getLeaderboards.mockResolvedValue({
        data: { leaderboards: mockLeaderboards },
      });

      const result = await store.dispatch(fetchLeaderboards());

      expect(result.type).toBe('leaderboard/fetchLeaderboards/fulfilled');
      expect(result.payload).toEqual(mockLeaderboards);
      expect(mockApiService.getLeaderboards).toHaveBeenCalledTimes(1);
    });

    it('should handle fetchLeaderboards error', async () => {
      mockApiService.getLeaderboards.mockRejectedValue(new Error('Network error'));

      const result = await store.dispatch(fetchLeaderboards());

      expect(result.type).toBe('leaderboard/fetchLeaderboards/rejected');
      expect(result.error.message).toBe('Network error');
    });
  });
});
