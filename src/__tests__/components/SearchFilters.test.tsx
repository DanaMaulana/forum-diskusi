/* eslint-disable linebreak-style */

/** Skenario pengujian komponen SearchFilters:
 * Skenario 1: Render input search dan category select
 *  - Input placeholder "Cari thread atau topik..." dan combobox tersedia
 * Skenario 2: Memanggil setSearchTerm ketika mengetik
 *  - Event change pada input memicu callback dengan nilai yang benar
 * Skenario 3: Menampilkan term pencarian saat ini
 *  - Input menampilkan nilai searchTerm yang diberikan
 * Skenario 4: Render category select dengan benar
 *  - Select trigger terlihat dan berfungsi
 * Skenario 5: Menangani array categories kosong
 *  - Komponen tetap render meski categories kosong
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchFilters from '@/components/SearchFilters';

const mockProps = {
  searchTerm: '',
  setSearchTerm: vi.fn(),
  selectedCategory: 'all',
  setSelectedCategory: vi.fn(),
  categories: ['javascript', 'react', 'nodejs'],
};

describe('SearchFilters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render search input and category select', () => {
    render(<SearchFilters {...mockProps} />);

    expect(screen.getByPlaceholderText('Cari thread atau topik...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should call setSearchTerm when typing in search input', async () => {
    render(<SearchFilters {...mockProps} />);

    const searchInput = screen.getByPlaceholderText('Cari thread atau topik...');

    // Use fireEvent.change for more reliable testing
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    expect(mockProps.setSearchTerm).toHaveBeenCalledWith('test search');
    expect(mockProps.setSearchTerm).toHaveBeenCalledTimes(1);
  });

  it('should display current search term', () => {
    render(<SearchFilters {...mockProps} searchTerm="current search" />);

    const searchInput = screen.getByDisplayValue('current search');
    expect(searchInput).toBeInTheDocument();
  });

  it('should render category select correctly', () => {
    render(<SearchFilters {...mockProps} />);

    // Check if select trigger is rendered
    const selectTrigger = screen.getByRole('combobox');
    expect(selectTrigger).toBeInTheDocument();
  });

  it('should handle empty categories array', () => {
    render(<SearchFilters {...mockProps} categories={[]} />);

    expect(screen.getByPlaceholderText('Cari thread atau topik...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
