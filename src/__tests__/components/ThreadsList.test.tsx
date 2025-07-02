/** Skenario pengujian komponen ThreadsList:
 *  Skenario 1: Render threads ketika disediakan
 *    - Menampilkan daftar thread dan jumlah thread yang ditemukan
 *  Skenario 2: Menampilkan empty state ketika tidak ada threads
 *    - Pesan "Tidak ada thread yang ditemukan" dan "0 thread ditemukan"
 *  Skenario 3: Menampilkan title yang benar untuk semua threads
 *    - Title "Semua Thread" untuk kategori "all"
 *  Skenario 4: Menampilkan title yang benar untuk kategori spesifik
 *    - Title "Thread #javascript" untuk kategori "javascript"
 *  Skenario 5: Render jumlah thread cards yang benar
 *    - Jumlah thread card sesuai dengan data yang diberikan
 */

import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ThreadsList from '@/components/ThreadsList';

const mockThreads = [
  {
    id: '1',
    title: 'First Thread',
    body: 'First thread body',
    category: 'javascript',
    createdAt: '2023-01-01T00:00:00.000Z',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
    user: { name: 'User 1', avatar: '' },
  },
  {
    id: '2',
    title: 'Second Thread',
    body: 'Second thread body',
    category: 'react',
    createdAt: '2023-01-01T00:00:00.000Z',
    ownerId: 'user-2',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
    user: { name: 'User 2', avatar: '' },
  },
];

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ThreadsList', () => {
  it('should render threads when provided', () => {
    renderWithRouter(<ThreadsList threads={mockThreads} selectedCategory="all" />);

    expect(screen.getByText('First Thread')).toBeInTheDocument();
    expect(screen.getByText('Second Thread')).toBeInTheDocument();
    expect(screen.getByText('2 thread ditemukan')).toBeInTheDocument();
  });

  it('should show empty state when no threads', () => {
    renderWithRouter(<ThreadsList threads={[]} selectedCategory="all" />);

    expect(screen.getByText('Tidak ada thread yang ditemukan')).toBeInTheDocument();
    expect(screen.getByText('0 thread ditemukan')).toBeInTheDocument();
  });

  it('should show correct title for all threads', () => {
    renderWithRouter(<ThreadsList threads={mockThreads} selectedCategory="all" />);

    expect(screen.getByText('Semua Thread')).toBeInTheDocument();
  });

  it('should show correct title for specific category', () => {
    renderWithRouter(<ThreadsList threads={mockThreads} selectedCategory="javascript" />);

    expect(screen.getByText('Thread #javascript')).toBeInTheDocument();
  });

  it('should render correct number of thread cards', () => {
    renderWithRouter(<ThreadsList threads={mockThreads} selectedCategory="all" />);

    // Each thread should render with its title
    expect(screen.getAllByText(/Thread/)).toHaveLength(3); // 2 thread titles + 1 header
  });
});
