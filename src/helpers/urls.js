const API_ROOT = `https://codeial:8000.com/api/v2`;

export const APIUrls = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  editProfile: () => `${API_ROOT}/users/edit`,
  fetchPosts: (page = 1, limit = 25) =>
    `${API_ROOT}/posts?page=${page}&limit=${limit}`,
  userProfile: (userId) => `${API_ROOT}/users/${userId}`,
  userFriends: (userId) => `${API_ROOT}/friendship/fetch_user_friends`,
  addFriends: (userId) =>
    `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
  removeFriend: (userId) =>
    `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
  createPost: () => `${API_ROOT}/posts/create`,
  createComment: () => `${API_ROOT}/comments/`,
  toggleLike: (id, likeType) =>
    `${API_ROOT}/likes/toggle?likeable_id=${id}&likeable_type=${likeType}`,
  userSearch: (searchText) => `${API_ROOT}/users/search?text=${searchText}`,
};
