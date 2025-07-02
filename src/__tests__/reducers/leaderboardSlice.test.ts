/** Skenario pengujian leaderboardSlice reducer:
 *  Skenario 1: Handle fetchLeaderboards pending
 *    - Loading true, error null
 *  Skenario 2: Handle fetchLeaderboards fulfilled
 *    - Loading false, leaderboards diupdate dengan data baru
 *  Skenario 3: Handle fetchLeaderboards rejected
 *    - Loading false, error diset dengan pesan error
 */

import { describe, it, expect, vi } from 'vitest';
import leaderboardReducer, { fetchLeaderboards } from '@/store/slices/leaderboardSlice';

// Mock API service
vi.mock('@/services/api', () => ({
  apiService: {
    getLeaderboards: vi.fn(),
  },
}));

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
];

describe('leaderboardSlice reducer', () => {
  const initialState = {
    leaderboards: [],
    loading: false,
    error: null,
  };

  it('should handle fetchLeaderboards pending', () => {
    const action = { type: fetchLeaderboards.pending.type };
    const newState = leaderboardReducer(initialState, action);

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should handle fetchLeaderboards fulfilled', () => {
    const action = {
      type: fetchLeaderboards.fulfilled.type,
      payload: mockLeaderboards
    };
    const newState = leaderboardReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.leaderboards).toEqual(mockLeaderboards);
  });

  it('should handle fetchLeaderboards rejected', () => {
    const action = {
      type: fetchLeaderboards.rejected.type,
      error: { message: 'Failed to fetch leaderboards' }
    };
    const newState = leaderboardReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Failed to fetch leaderboards');
  });
});
