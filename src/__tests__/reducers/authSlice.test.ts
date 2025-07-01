import { describe, it, expect, vi, beforeEach } from 'vitest';
import authReducer, {
  loginUser,
  registerUser,
  logout,
  clearError,
} from '@/store/slices/authSlice';

// Mock API service
vi.mock('@/services/api', () => ({
  apiService: {
    login: vi.fn(),
    register: vi.fn(),
    getOwnProfile: vi.fn(),
  },
}));

const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  avatar: 'avatar.jpg',
};

describe('authSlice reducer', () => {
  const initialState = {
    user: null,
    loading: false,
    error: null,
  };

  beforeEach(() => {
    // Clear localStorage mock calls
    vi.clearAllMocks();
  });

  it('should handle logout', () => {
    const stateWithUser = {
      ...initialState,
      user: mockUser,
      error: 'Some error',
    };

    const action = logout();
    const newState = authReducer(stateWithUser, action);

    expect(newState.user).toBeNull();
    expect(newState.error).toBeNull();
  });

  it('should handle clearError', () => {
    const stateWithError = {
      ...initialState,
      error: 'Some error',
    };

    const action = clearError();
    const newState = authReducer(stateWithError, action);

    expect(newState.error).toBeNull();
  });

  it('should handle loginUser pending', () => {
    const action = { type: loginUser.pending.type };
    const newState = authReducer(initialState, action);

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should handle loginUser fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const newState = authReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.user).toEqual(mockUser);
    expect(newState.error).toBeNull();
  });

  it('should handle registerUser rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Registration failed' }
    };
    const newState = authReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Registration failed');
  });
});
