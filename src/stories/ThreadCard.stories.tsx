import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import ThreadCard from '@/components/features/ThreadCard';

const meta: Meta<typeof ThreadCard> = {
  title: 'Components/ThreadCard',
  component: ThreadCard,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="max-w-2xl">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockThread = {
  id: '1',
  title: 'Getting Started with React Hooks',
  body: 'React Hooks are a powerful feature that allow you to use state and other React features without writing a class component. In this thread, we will explore the basics of useState, useEffect, and custom hooks.',
  category: 'react',
  createdAt: '2023-12-01T10:30:00.000Z',
  upVotesBy: ['user1', 'user2', 'user3'],
  downVotesBy: ['user4'],
  totalComments: 12,
  user: {
    name: 'John Developer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
};

export const Default: Story = {
  args: {
    thread: mockThread,
  },
};

export const LongTitle: Story = {
  args: {
    thread: {
      ...mockThread,
      title: 'This is a very long thread title that should wrap properly and demonstrate how the component handles lengthy titles in the UI',
    },
  },
};

export const NoVotes: Story = {
  args: {
    thread: {
      ...mockThread,
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
  },
};

export const HighActivity: Story = {
  args: {
    thread: {
      ...mockThread,
      upVotesBy: Array(25).fill(0).map((_, i) => `user${i}`),
      totalComments: 89,
      title: 'Popular Thread with High Engagement',
    },
  },
};

export const NoAvatar: Story = {
  args: {
    thread: {
      ...mockThread,
      user: {
        name: 'Anonymous User',
        avatar: '',
      },
    },
  },
};
