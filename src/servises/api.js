import { baseUrl } from "../constants/config";

export const api = {
  async fetchUsers() {
    const response = await fetch(`${baseUrl}/users`);
    return response.json();
  },
  async fetchPosts(id) {
    const response = await fetch(`${baseUrl}/posts?userId=${id}`);
    return response.json();
  },
  async createPost(title, body, userId) {
    const response = await fetch(`${baseUrl}/posts`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return response.json();
  },
  async deletePost(postId) {
    const response = await fetch(`${baseUrl}/posts/${postId}`, {
        method: 'DELETE'
    })
    return response
  },
  async updatePost(id, title, body, userId) {
    const response = await fetch(`${baseUrl}/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
        id: id,
        title: title,
        body: body,
        userId: userId,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
    })
    return response.json()
  }
};
