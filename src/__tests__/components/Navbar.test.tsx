import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '@/components/Navbar';

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

describe('Navbar', () => {
  it('should render correctly when user is not logged in', () => {
    renderWithRouter(<Navbar />);

    expect(screen.getByText('Forum Diskusi')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('should render correctly when user is logged in', () => {
    renderWithRouter(<Navbar user={mockUser} />);

    expect(screen.getByText('Forum Diskusi')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Register')).not.toBeInTheDocument();
  });

  it('should call onLogout when logout button is clicked', () => {
    const mockOnLogout = vi.fn();

    renderWithRouter(<Navbar user={mockUser} onLogout={mockOnLogout} />);

    const logoutButton = screen.getByRole('button');
    fireEvent.click(logoutButton);

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  it('should have correct navigation links', () => {
    renderWithRouter(<Navbar />);

    const homeLink = screen.getByRole('link', { name: /Home/ });
    const leaderboardLink = screen.getByRole('link', { name: /Leaderboard/ });
    const loginLink = screen.getByRole('link', { name: /Login/ });
    const registerLink = screen.getByRole('link', { name: /Register/ });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(leaderboardLink).toHaveAttribute('href', '/leaderboard');
    expect(loginLink).toHaveAttribute('href', '/login');
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  it('should show user profile link when logged in', () => {
    renderWithRouter(<Navbar user={mockUser} />);

    const profileLink = screen.getByRole('link', { name: /Test User/ });
    expect(profileLink).toHaveAttribute('href', '/profile');
  });
});
