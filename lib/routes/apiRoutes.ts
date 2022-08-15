const login = () => "/api/login";
const logout = () => "/api/logout";

const myProfile = () => "/api/users/my-profile";
const user = (userId: number) => `/api/users/${userId}`;
const profilePic = (userId: number) => `/api/users/${userId}/profile-pic`;

const likes = (mediumId: number) => `/api/likes/${mediumId}`;
const likesOfPhotographerMedia = (photographerId: number) =>
  `/api/likes-of-photographer-media/${photographerId}`;

const userPendingTags = (userId: number) => `/api/users/${userId}/pending-tags`;
const tagSuggestions = () => "/api/tags/suggestions";

const apiRoutes = {
  login,
  logout,
  myProfile,
  likes,
  likesOfPhotographerMedia,
  user,
  profilePic,
  userPendingTags,
  tagSuggestions,
};

export default apiRoutes;
