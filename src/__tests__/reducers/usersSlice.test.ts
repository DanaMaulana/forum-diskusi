
import { describe, it, expect, vi } from 'vitest';
import usersReducer, { fetchUsers } from '@/store/slices/usersSlice';

// Mock API service
vi.mock('@/services/api', () => ({
  apiService: {
    getUsers: vi.fn(),
  },
}));

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

describe('usersSlice reducer', () => {
  const initialState = {
    users: [],
    loading: false,
    error: null,
  };

  it('should handle fetchUsers pending', () => {
    const action = { type: fetchUsers.pending.type };
    const newState = usersReducer(initialState, action);

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should handle fetchUsers fulfilled', () => {
    const action = {
      type: fetchUsers.fulfilled.type,
      payload: mockUsers
    };
    const newState = usersReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.users).toEqual(mockUsers);
  });

  it('should handle fetchUsers rejected', () => {
    const action = {
      type: fetchUsers.rejected.type,
      error: { message: 'Failed to fetch users' }
    };
    const newState = usersReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Failed to fetch users');
  });
});
