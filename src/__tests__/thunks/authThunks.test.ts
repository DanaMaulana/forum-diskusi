/** Skenario pengujian auth thunks:
 *  Skenario 1: Login user berhasil
 *    - Mock API login dan getOwnProfile, verifikasi payload dan API calls
 *  Skenario 2: Handle login error
 *    - Mock API error, verifikasi error handling
 *  Skenario 3: Register user berhasil
 *    - Mock API register, verifikasi API call dengan parameter yang benar
 *  Skenario 4: Get current user berhasil
 *    - Mock API getOwnProfile, verifikasi user data
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { loginUser, registerUser, getCurrentUser } from '@/store/slices/authSlice';
import authReducer from '@/store/slices/authSlice';
import { apiService } from '@/services/api';

// Mock API service
vi.mock('@/services/api', () => ({
  apiService: {
    login: vi.fn(),
    register: vi.fn(),
    getOwnProfile: vi.fn(),
  },
}));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockApiService = apiService as any;

describe('auth thunks', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;

  beforeEach(() => {
    vi.clearAllMocks();
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });

  describe('loginUser', () => {
    it('should login user successfully', async () => {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        avatar: 'avatar.jpg',
      };

      mockApiService.login.mockResolvedValue({
        data: { token: 'test-token' },
      });
      mockApiService.getOwnProfile.mockResolvedValue({
        data: { user: mockUser },
      });

      const result = await store.dispatch(loginUser({
        email: 'test@example.com',
        password: 'password',
      }));

      expect(result.type).toBe('auth/login/fulfilled');
      expect(result.payload).toEqual(mockUser);
      expect(mockApiService.login).toHaveBeenCalledWith('test@example.com', 'password');
      expect(mockApiService.getOwnProfile).toHaveBeenCalledTimes(1);
    });

    it('should handle login error', async () => {
      mockApiService.login.mockRejectedValue(new Error('Invalid credentials'));

      const result = await store.dispatch(loginUser({
        email: 'test@example.com',
        password: 'wrong-password',
      }));

      expect(result.type).toBe('auth/login/rejected');
      expect(result.error.message).toBe('Invalid credentials');
    });
  });

  describe('registerUser', () => {
    it('should register user successfully', async () => {
      mockApiService.register.mockResolvedValue({});

      const result = await store.dispatch(registerUser({
        name: 'New User',
        email: 'new@example.com',
        password: 'password',
      }));

      expect(result.type).toBe('auth/register/fulfilled');
      expect(mockApiService.register).toHaveBeenCalledWith(
        'New User',
        'new@example.com',
        'password'
      );
    });
  });

  describe('getCurrentUser', () => {
    it('should get current user successfully', async () => {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        avatar: 'avatar.jpg',
      };

      mockApiService.getOwnProfile.mockResolvedValue({
        data: { user: mockUser },
      });

      const result = await store.dispatch(getCurrentUser());

      expect(result.type).toBe('auth/getCurrentUser/fulfilled');
      expect(result.payload).toEqual(mockUser);
      expect(mockApiService.getOwnProfile).toHaveBeenCalledTimes(1);
    });
  });
});
