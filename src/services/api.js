import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_URL,
});

// --- Request interceptor : ajoute Authorization si access existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- Response interceptor : si 401 (access expiré) tenter refresh automatiquement
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // évite boucle infinie : on ne retry qu'une fois
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");
        if (!refresh) throw new Error("No refresh token");

        // utilise axios direct (pas api) pour éviter l'interceptor request
        const res = await axios.post(`${API_URL}/auth/refresh/`, { refresh });

        // sauvegarde nouveau access
        localStorage.setItem("access", res.data.access);

        // attache le nouveau token et rejoue la requête initiale
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return api(originalRequest);
      } catch (err) {
        // refresh invalide -> forcer déconnexion locale
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        // éventuellement redirect vers login
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// ========== Fonctions publiques ==========

// Auth
export const loginUser = async (email, password) => {
  // backend attend "username" (on passe email)
  const res = await api.post("/auth/login/", { username: email, password });
  return res.data; // { access, refresh }
};

export const registerUser = async (userData) => {
  const res = await api.post("/auth/register/", userData);
  return res.data;
};


export const getProfile = () => api.get("/auth/profile/");

export const logoutUser = async () => {
  const refresh = localStorage.getItem("refresh");
  const res = await api.post("/auth/logout/", { refresh });
  // nettoyage local
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  return res.data;
};

// Exports pour usage général
export const getProducts = () => api.get("/products/");
export const getServices = () => api.get("/services/");
export const getCategories = () => api.get("/categories/");
export const getProductById = (id) => api.get(`/products/${id}/`);
export const getTestimonials = () => api.get("/testimonials/");
export const getProductsByCategory = (categoryId) => api.get(`/products/?category=${categoryId}`);
