import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchThreadDetail,
  voteThread,
  clearCurrentThread,
} from '@/store/slices/threadsSlice';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Clock,
  User,
  Send,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { apiService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

// Tambahkan tipe untuk Thread dan Comment
interface ThreadOwner {
  id: string;
  name: string;
  avatar?: string;
}

interface ThreadComment {
  id: string;
  content: string;
  createdAt: string;
  owner: ThreadOwner;
  upVotesBy: string[];
  downVotesBy: string[];
}

interface Thread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  owner: ThreadOwner;
  upVotesBy: string[];
  downVotesBy: string[];
  comments: ThreadComment[];
}

const ThreadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { currentThread, loading } = useAppSelector((state) => state.threads);
  const thread = currentThread as unknown as Thread | null;
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchThreadDetail(id));
    }

    return () => {
      dispatch(clearCurrentThread());
    };
  }, [id, dispatch]);

  const handleVote = async (type: 'up' | 'down') => {
    if (!user || !thread) {
      navigate('/login');
      return;
    }

    try {
      const isUpVoted = thread.upVotesBy.includes(user.id);
      const isDownVoted = thread.downVotesBy.includes(user.id);

      let voteType: 'up' | 'down' | 'neutral' = type;

      if (type === 'up' && isUpVoted) {
        voteType = 'neutral';
      } else if (type === 'down' && isDownVoted) {
        voteType = 'neutral';
      }

      await dispatch(voteThread({ threadId: thread.id, voteType })).unwrap();
      dispatch(fetchThreadDetail(thread.id));
    } catch (error) {
      const err = error as Error;
      toast({
        title: 'Error',
        description:
          err instanceof Error ? err.message : 'Gagal memberikan vote',
        variant: 'destructive',
      });
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !thread) {
      navigate('/login');
      return;
    }

    if (!comment.trim()) {
      toast({
        title: 'Error',
        description: 'Komentar tidak boleh kosong',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      await apiService.createComment(thread.id, comment);
      setComment('');
      dispatch(fetchThreadDetail(thread.id));
      toast({
        title: 'Berhasil',
        description: 'Komentar berhasil ditambahkan',
      });
    } catch (error) {
      const err = error as Error;
      toast({
        title: 'Error',
        description:
          err instanceof Error ? err.message : 'Gagal menambahkan komentar',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCommentVote = async (commentId: string, type: 'up' | 'down') => {
    if (!user || !thread) {
      navigate('/login');
      return;
    }

    try {
      if (type === 'up') {
        await apiService.upVoteComment(thread.id, commentId);
      } else {
        await apiService.downVoteComment(thread.id, commentId);
      }
      dispatch(fetchThreadDetail(thread.id));
    } catch (error) {
      const err = error as Error;
      toast({
        title: 'Error',
        description:
          err instanceof Error ? err.message : 'Gagal memberikan vote',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Thread tidak ditemukan
            </h1>
            <Link to="/">
              <Button>Kembali ke Beranda</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Beranda
        </Button>

        {/* Thread Detail */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200/60 mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={thread.owner?.avatar} />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">
                    {thread.owner?.name}
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>
                      {formatDistanceToNow(new Date(thread.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0"
              >
                #{thread.category}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {thread.title}
            </h1>
            <div
              className="text-gray-700 mb-6 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: thread.body }}
            />

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote('up')}
                  className={`${
                    user && thread.upVotesBy?.includes(user.id)
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-600'
                  }`}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {thread.upVotesBy?.length || 0}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote('down')}
                  className={`${
                    user && thread.downVotesBy?.includes(user.id)
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-600'
                  }`}
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  {thread.downVotesBy?.length || 0}
                </Button>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <MessageCircle className="h-4 w-4" />
                <span>{thread.comments?.length || 0} komentar</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comment Form */}
        {user && (
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200/60 mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleCommentSubmit}>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tulis komentar Anda..."
                  className="mb-4 bg-white/90"
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {submitting ? (
                      'Mengirim...'
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Kirim Komentar
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Comments */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Komentar ({thread.comments?.length || 0})
          </h2>

          {!thread.comments || thread.comments.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200/60">
              <CardContent className="pt-6">
                <p className="text-gray-500 text-center">
                  Belum ada komentar. Jadilah yang pertama berkomentar!
                </p>
              </CardContent>
            </Card>
          ) : (
            thread.comments.map((comment) => (
              <Card
                key={comment.id}
                className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200/60"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.owner?.avatar} />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="font-medium text-gray-900">
                          {comment.owner?.name}
                        </p>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>
                            {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </div>
                      <div
                        className="text-gray-700 mb-3"
                        dangerouslySetInnerHTML={{ __html: comment.content }}
                      />
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCommentVote(comment.id, 'up')}
                          className={`${
                            user && comment.upVotesBy?.includes(user.id)
                              ? 'text-green-600 bg-green-50'
                              : 'text-gray-600'
                          }`}
                        >
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {comment.upVotesBy?.length || 0}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCommentVote(comment.id, 'down')}
                          className={`${
                            user && comment.downVotesBy?.includes(user.id)
                              ? 'text-red-600 bg-red-50'
                              : 'text-gray-600'
                          }`}
                        >
                          <ThumbsDown className="h-3 w-3 mr-1" />
                          {comment.downVotesBy?.length || 0}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreadDetail;
