import axios from "axios";

// ----------------------------
// ENV AUTO-SELECTION
// ----------------------------
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_URL,
});

// ----------------------------
// REQUEST INTERCEPTOR
// ----------------------------
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ----------------------------
// RESPONSE INTERCEPTOR
// Auto refresh token
// ----------------------------
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");
        if (!refresh) throw new Error("No refresh token");

        const res = await axios.post(`${API_URL}/auth/refresh/`, { refresh });

        localStorage.setItem("access", res.data.access);

        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// ----------------------------
// AUTH
// ----------------------------
export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login/", { username: email, password });
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await api.post("/auth/register/", userData);
  return res.data;
};

export const getProfile = () => api.get("/auth/profile/");

export const logoutUser = async () => {
  const refresh = localStorage.getItem("refresh");
  const res = await api.post("/auth/logout/", { refresh });

  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  return res.data;
};

// ----------------------------
// GENERAL ENDPOINTS
// ----------------------------
export const getProducts = () => api.get("/products/");
export const getServices = () => api.get("/services/");
export const getCategories = () => api.get("/categories/");
export const getProductById = (id) => api.get(`/products/${id}/`);
export const getTestimonials = () => api.get("/testimonials/");
export const getProductsByCategory = (categoryId) =>
  api.get(`/products/?category=${categoryId}`);