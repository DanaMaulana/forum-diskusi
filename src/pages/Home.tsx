import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchThreads } from '@/store/slices/threadsSlice';
import { fetchUsers } from '@/store/slices/usersSlice';
import LoadingSpinner from '@/components/LoadingSpinner';
import HeroSection from '@/components/HeroSection';
import SearchFilters from '@/components/SearchFilters';
import StatsSection from '@/components/StatsSection';
import PopularCategories from '@/components/PopularCategories';
import ThreadsList from '@/components/ThreadsList';
import { useAuth } from '@/context/AuthContext';

// Definisikan tipe Thread dan User sesuai kebutuhan aplikasi Anda
type User = {
  id: string;
  name: string;
  avatar: string;
  // tambahkan properti lain jika ada
};

type Thread = {
  id: string;
  ownerId: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  upVotesBy: string[];
  downVotesBy: string[];
  totalComments: number;
  // tambahkan properti lain jika ada
  user: User;
};

const Home = () => {
  const dispatch = useAppDispatch();
  const { threads, loading: threadsLoading } = useAppSelector(
    (state) => state.threads
  );
  const { users, loading: usersLoading } = useAppSelector(
    (state) => state.users
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { user } = useAuth();

  useEffect(() => {
    dispatch(fetchThreads());
    dispatch(fetchUsers());
  }, [dispatch]);

  // Combine threads with user data
  const threadsWithUsers: Thread[] = (threads as unknown as Thread[]).map(
    (thread) => {
      const threadUser = users.find((u: User) => u.id === thread.ownerId);
      return {
        ...thread,
        user: threadUser || { id: '', name: 'Unknown', avatar: '' },
      };
    }
  );

  const categories: string[] = [
    ...new Set(
      (threads as unknown as Thread[]).map((thread: Thread) => thread.category)
    ),
  ];

  const filteredThreads: Thread[] = threadsWithUsers.filter(
    (thread: Thread) => {
      const matchesSearch =
        thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        thread.body.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || thread.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }
  );

  const loading = threadsLoading || usersLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection user={user} />

        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        <StatsSection
          threadsCount={threads.length}
          usersCount={users.length}
          categoriesCount={categories.length}
        />

        <PopularCategories
          categories={categories}
          setSelectedCategory={setSelectedCategory}
        />

        <ThreadsList
          threads={filteredThreads}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
};

export default Home;
