
import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  searchModalOpen: boolean;
  theme: 'light' | 'dark';
  setSidebarOpen: (open: boolean) => void;
  setSearchModalOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
  toggleSearchModal: () => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  searchModalOpen: false,
  theme: 'light',
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSearchModalOpen: (open) => set({ searchModalOpen: open }),
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleSearchModal: () => set((state) => ({ searchModalOpen: !state.searchModalOpen })),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
