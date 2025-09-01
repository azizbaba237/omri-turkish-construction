import axios from "axios";

// URL de ton backend Django
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
// const api = axios.create({
//   baseURL: "https://turkishbackend.pythonanywhere.com/api",
// });

export const api = axios.create({
  baseURL: API_URL,
});

export const getProducts = () => api.get("/products/");
export const getServices = () => api.get("/services/");
export const getCategories = () => api.get("/categories/");
export const getProductById = (id) => api.get(`/products/${id}/`);
export const getTestimonials = () => api.get("/testimonials/");
export const getProductsByCategory = (categoryId) => api.get(`/products/?category=${categoryId}`);