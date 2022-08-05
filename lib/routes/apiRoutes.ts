const login = () => "/api/login";
const logout = () => "/api/logout";

const myProfile = () => "/api/users/my-profile";
const user = (userId: number) => `/api/users/${userId}`;

const likes = (mediumId: number) => `/api/likes/${mediumId}`;
const likesOfPhotographerMedia = (photographerId: number) =>
  `/api/likes-of-photographer-media/${photographerId}`;

const userPendingTags = (userId: number) => `/api/users/${userId}/pending-tags`;

const apiRoutes = {
  login,
  logout,
  myProfile,
  likes,
  likesOfPhotographerMedia,
  user,
  userPendingTags,
};

export default apiRoutes;
