
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchLeaderboards } from '@/store/slices/leaderboardSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, User } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

const Leaderboard = () => {
  const dispatch = useAppDispatch();
  const { leaderboards, loading } = useAppSelector((state) => state.leaderboard);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchLeaderboards());
  }, [dispatch]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Award className="h-6 w-6 text-amber-600" />;
    default:
      return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
    case 2:
      return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
    case 3:
      return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
    default:
      return 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800';
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Papan Peringkat
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ranking pengguna berdasarkan kontribusi dan aktivitas di forum Dicoding
          </p>
        </div>

        {/* Current User Stats */}
        {user && (
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-center text-blue-700">Peringkat Anda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">
                    Peringkat: #{leaderboards.findIndex((lb) => lb.user.id === user.id) + 1 || 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              Top Contributors
            </CardTitle>
          </CardHeader>
          <CardContent>
            {leaderboards.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Belum ada data leaderboard</p>
              </div>
            ) : (
              <div className="space-y-4">
                {leaderboards.map((leaderboard, index) => {
                  const rank = index + 1;
                  return (
                    <div
                      key={leaderboard.user.id}
                      className={`flex items-center space-x-4 p-4 rounded-lg transition-all hover:shadow-lg ${
                        rank <= 3
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(rank)}
                      </div>

                      {/* Avatar */}
                      <Avatar className="h-12 w-12 border-2 border-white shadow-lg">
                        <AvatarImage src={leaderboard.user.avatar} />
                        <AvatarFallback>
                          <User className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>

                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">
                            {leaderboard.user.name}
                          </h3>
                          {rank <= 3 && (
                            <Badge className={getRankBadgeColor(rank)}>
                              Top {rank}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{leaderboard.user.email}</p>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {leaderboard.score}
                        </div>
                        <div className="text-xs text-gray-500">poin</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="mt-8 text-center">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-blue-900 mb-2">Cara Mendapatkan Poin</h3>
              <p className="text-blue-700 text-sm">
                Poin dihitung berdasarkan aktivitas Anda: membuat thread, memberikan komentar,
                dan mendapatkan vote dari pengguna lain.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
