import React from 'react';
import ThreadCard from '@/components/features/ThreadCard';

// Definisikan tipe Thread sesuai struktur data thread Anda
export interface Thread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: string[];
  downVotesBy: string[];
  totalComments: number;
  user: {
    name: string;
    avatar: string;
  };
  // tambahkan properti lain jika ada
}

interface ThreadsListProps {
  threads: Thread[];
  selectedCategory: string;
}

const ThreadsList = ({ threads, selectedCategory }: ThreadsListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {selectedCategory === 'all'
            ? 'Semua Thread'
            : `Thread #${selectedCategory}`}
        </h2>
        <p className="text-gray-600">{threads.length} thread ditemukan</p>
      </div>

      {threads.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Tidak ada thread yang ditemukan
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ThreadsList;
