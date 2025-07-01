import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ThreadCard from '@/components/features/ThreadCard';

const mockThread = {
  id: '1',
  title: 'Test Thread Title',
  body: 'This is a test thread body with some content.',
  category: 'javascript',
  createdAt: '2023-01-01T00:00:00.000Z',
  upVotesBy: ['user1', 'user2'],
  downVotesBy: [],
  totalComments: 5,
  user: {
    name: 'Test User',
    avatar: 'avatar.jpg',
  },
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ThreadCard', () => {
  it('should render thread information correctly', () => {
    renderWithRouter(<ThreadCard thread={mockThread} />);

    expect(screen.getByText('Test Thread Title')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('#javascript')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // upvotes count
    expect(screen.getByText('5')).toBeInTheDocument(); // comments count
  });

  it('should truncate long body text', () => {
    const longThread = {
      ...mockThread,
      body: 'This is a very long thread body that should be truncated when it exceeds the maximum length limit set in the component. It should show ellipsis at the end.',
    };

    renderWithRouter(<ThreadCard thread={longThread} />);

    const bodyText = screen.getByText(/This is a very long thread body/);
    expect(bodyText.textContent).toContain('...');
  });

  it('should have correct navigation links', () => {
    renderWithRouter(<ThreadCard thread={mockThread} />);

    const titleLink = screen.getByRole('link', { name: /Test Thread Title/ });
    const readMoreLink = screen.getByRole('link', { name: /Read more/ });

    expect(titleLink).toHaveAttribute('href', '/thread/1');
    expect(readMoreLink).toHaveAttribute('href', '/thread/1');
  });

  it('should display user avatar fallback when no avatar', () => {
    const threadWithoutAvatar = {
      ...mockThread,
      user: {
        name: 'Test User',
        avatar: '',
      },
    };

    renderWithRouter(<ThreadCard thread={threadWithoutAvatar} />);

    // Should show User icon as fallback
    expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument();
  });

  it('should format creation date correctly', () => {
    renderWithRouter(<ThreadCard thread={mockThread} />);

    // Should show relative time
    expect(screen.getByText(/ago/)).toBeInTheDocument();
  });
});
