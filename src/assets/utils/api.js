const API = {};
API.base = '/api/v1';

// Authentication
API.auth = {};
API.auth.login = '/auth/admin/login';
API.auth.logout = '/auth/admin/logout';

// Traffles
API.traffle = {};
API.traffle.Post = '/traffles';
API.traffle.Get = '/traffles';
API.traffle.DrawTraffleWinner = '/traffles/draw-winner';



export default API;