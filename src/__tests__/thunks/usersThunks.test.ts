/** Skenario pengujian users thunks:
 *  Skenario 1: Fetch users berhasil
 *    - Mock API getUsers, verifikasi data users
 *  Skenario 2: Handle fetchUsers error
 *    - Mock API error, verifikasi error handling
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { fetchUsers } from '@/store/slices/usersSlice';
import usersReducer from '@/store/slices/usersSlice';
import { apiService } from '@/services/api';

// Mock API service
vi.mock('@/services/api', () => ({
  apiService: {
    getUsers: vi.fn(),
  },
}));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockApiService = apiService as any;

describe('users thunks', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;

  beforeEach(() => {
    vi.clearAllMocks();
    store = configureStore({
      reducer: {
        users: usersReducer,
      },
    });
  });

  describe('fetchUsers', () => {
    it('should fetch users successfully', async () => {
      const mockUsers = [
        {
          id: '1',
          name: 'User 1',
          email: 'user1@example.com',
          avatar: 'avatar1.jpg',
        },
        {
          id: '2',
          name: 'User 2',
          email: 'user2@example.com',
          avatar: 'avatar2.jpg',
        },
      ];

      mockApiService.getUsers.mockResolvedValue({
        data: { users: mockUsers },
      });

      const result = await store.dispatch(fetchUsers());

      expect(result.type).toBe('users/fetchUsers/fulfilled');
      expect(result.payload).toEqual(mockUsers);
      expect(mockApiService.getUsers).toHaveBeenCalledTimes(1);
    });

    it('should handle fetchUsers error', async () => {
      mockApiService.getUsers.mockRejectedValue(new Error('Network error'));

      const result = await store.dispatch(fetchUsers());

      expect(result.type).toBe('users/fetchUsers/rejected');
      expect(result.error.message).toBe('Network error');
    });
  });
});
