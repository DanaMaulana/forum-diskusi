
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, ThumbsUp, Clock, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ThreadCardProps {
  thread: {
    id: string;
    title: string;
    body: string;
    category: string;
    createdAt: string;
    upVotesBy: string[];
    downVotesBy: string[];
    totalComments: number;
    user: {
      name: string;
      avatar: string;
    };
  };
}

const ThreadCard = ({ thread }: ThreadCardProps) => {
  const truncateBody = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)  }...`;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white/80 backdrop-blur-sm border border-gray-200/60">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={thread.user.avatar} />
              <AvatarFallback data-testid="avatar-fallback">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-900">{thread.user.name}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0">
            #{thread.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <Link to={`/thread/${thread.id}`} className="block group">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {thread.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {truncateBody(thread.body.replace(/<[^>]*>/g, ''), 150)}
          </p>
        </Link>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{thread.upVotesBy.length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{thread.totalComments}</span>
            </div>
          </div>
          <Link
            to={`/thread/${thread.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Read more →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreadCard;
