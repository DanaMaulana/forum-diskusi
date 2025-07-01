import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// Ganti 'any' dengan tipe yang lebih spesifik, misal:
interface HeroSectionProps {
  user?: {
    id: string;
    name: string;
    avatar?: string;
    // tambahkan properti lain jika ada
  } | null;
}

const HeroSection = ({ user }: HeroSectionProps) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Forum Diskusi
        </span>
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Tempat berkumpulnya para developer untuk berbagi pengalaman, berdiskusi,
        dan belajar bersama dalam komunitas yang solid.
      </p>

      {user && (
        <Link to="/create-thread">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
          >
            <Plus className="mr-2 h-5 w-5" />
            Buat Thread Baru
          </Button>
        </Link>
      )}
    </div>
  );
};

export default HeroSection;
