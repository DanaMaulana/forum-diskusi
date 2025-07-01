
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  language: 'id' | 'en';
  itemsPerPage: number;
  autoRefresh: boolean;
  notifications: boolean;
  setLanguage: (language: 'id' | 'en') => void;
  setItemsPerPage: (count: number) => void;
  setAutoRefresh: (enabled: boolean) => void;
  setNotifications: (enabled: boolean) => void;
}

export const usePreferencesStore = create<UserPreferences>()(
  persist(
    (set) => ({
      language: 'id',
      itemsPerPage: 10,
      autoRefresh: true,
      notifications: true,
      setLanguage: (language) => set({ language }),
      setItemsPerPage: (itemsPerPage) => set({ itemsPerPage }),
      setAutoRefresh: (autoRefresh) => set({ autoRefresh }),
      setNotifications: (notifications) => set({ notifications }),
    }),
    {
      name: 'user-preferences',
    }
  )
);
