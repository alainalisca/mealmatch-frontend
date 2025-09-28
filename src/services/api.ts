import axios from 'axios';

// Use production URL by default, fallback to localhost for development
//const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mealmatch-capstone.onrender.com/api';
const API_BASE_URL = 'https://mealmatch-capstone.onrender.com/api';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
};

export const cooksAPI = {
  getNearby: () => api.get('/cooks/nearby'),
  getCook: (id: string) => api.get(`/cooks/${id}`),
  createCook: (cookData: any) => api.post('/cooks', cookData),
  updateCook: (id: string, cookData: any) => api.put(`/cooks/${id}`, cookData),
  deleteCook: (id: string) => api.delete(`/cooks/${id}`),
};

export const recipesAPI = {
  getAll: () => api.get('/recipes'),
  getRecipe: (id: string) => api.get(`/recipes/${id}`),
  getByCook: (cookId: string) => api.get(`/recipes/cook/${cookId}`),
  createRecipe: (recipeData: any) => api.post('/recipes', recipeData),
  updateRecipe: (id: string, recipeData: any) => api.put(`/recipes/${id}`, recipeData),
  deleteRecipe: (id: string) => api.delete(`/recipes/${id}`),
};

export const ordersAPI = {
  getUserOrders: () => api.get('/orders/user'),
  getOrder: (id: string) => api.get(`/orders/${id}`),
  createOrder: (orderData: any) => api.post('/orders', orderData),
  updateOrderStatus: (id: string, status: string) => api.patch(`/orders/${id}/status`, { status }),
  cancelOrder: (id: string) => api.delete(`/orders/${id}`),
};

export default api;