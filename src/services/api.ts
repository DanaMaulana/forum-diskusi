
const BASE_URL = 'https://forum-api.dicoding.dev/v1';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(name: string, email: string, password: string) {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  async login(email: string, password: string) {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getOwnProfile() {
    return this.request('/users/me');
  }

  // Threads endpoints
  async getThreads() {
    return this.request('/threads');
  }

  async getThreadDetail(id: string) {
    return this.request(`/threads/${id}`);
  }

  async createThread(title: string, body: string, category: string) {
    return this.request('/threads', {
      method: 'POST',
      body: JSON.stringify({ title, body, category }),
    });
  }

  async upVoteThread(threadId: string) {
    return this.request(`/threads/${threadId}/up-vote`, {
      method: 'POST',
    });
  }

  async downVoteThread(threadId: string) {
    return this.request(`/threads/${threadId}/down-vote`, {
      method: 'POST',
    });
  }

  async neutralizeThreadVote(threadId: string) {
    return this.request(`/threads/${threadId}/neutral-vote`, {
      method: 'POST',
    });
  }

  // Comments endpoints
  async createComment(threadId: string, content: string) {
    return this.request(`/threads/${threadId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  async upVoteComment(threadId: string, commentId: string) {
    return this.request(`/threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST',
    });
  }

  async downVoteComment(threadId: string, commentId: string) {
    return this.request(`/threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST',
    });
  }

  // Users endpoints
  async getUsers() {
    return this.request('/users');
  }

  async getLeaderboards() {
    return this.request('/leaderboards');
  }
}

export const apiService = new ApiService();
