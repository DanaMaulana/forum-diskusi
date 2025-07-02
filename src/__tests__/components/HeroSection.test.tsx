/** Skenario pengujian komponen HeroSection:
 *  Skenario 1: Render title dan description
 *    - Menampilkan "Forum Diskusi" dan deskripsi yang sesuai
 *  Skenario 2: Menampilkan tombol create thread ketika user login
 *    - Tombol "Buat Thread Baru" terlihat dan mengarah ke `/create-thread`
 *  Skenario 3: Menyembunyikan tombol create thread ketika user tidak login
 *    - Tombol "Buat Thread Baru" tidak terlihat
 *  Skenario 4: Styling CSS yang benar
 *    - Title memiliki class gradient yang sesuai
 */

import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';

const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  avatar: 'avatar.jpg',
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('HeroSection', () => {
  it('should render title and description', () => {
    renderWithRouter(<HeroSection user={null} />);

    expect(screen.getByText('Forum Diskusi')).toBeInTheDocument();
    expect(screen.getByText(/Tempat berkumpulnya para developer/)).toBeInTheDocument();
  });

  it('should show create thread button when user is logged in', () => {
    renderWithRouter(<HeroSection user={mockUser} />);

    const createButton = screen.getByRole('link', { name: /Buat Thread Baru/ });
    expect(createButton).toBeInTheDocument();
    expect(createButton).toHaveAttribute('href', '/create-thread');
  });

  it('should not show create thread button when user is not logged in', () => {
    renderWithRouter(<HeroSection user={null} />);

    expect(screen.queryByRole('link', { name: /Buat Thread Baru/ })).not.toBeInTheDocument();
  });

  it('should have correct styling classes', () => {
    renderWithRouter(<HeroSection user={mockUser} />);

    const title = screen.getByText('Forum Diskusi');
    expect(title).toHaveClass('bg-gradient-to-r', 'from-blue-600', 'via-purple-600', 'to-indigo-600');
  });
});
