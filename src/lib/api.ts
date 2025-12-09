import { ProductInput } from "@/types/admin";
import { CategoryInput } from "@/types/category";

const BASE_URL = "https://api.escuelajs.co/api/v1";

export const api = {
  login: async (email: string, password: string) => {
    return fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then(r => r.json());
  },

  // PRODUCTS
  getProducts: async () => fetch(`${BASE_URL}/products`).then(r => r.json()),
  getProduct: async (id: number) => fetch(`${BASE_URL}/products/${id}`).then(r => r.json()),

  createProduct: (data: ProductInput, token: string) =>
    fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  updateProduct: (id: number, data: ProductInput, token: string) =>
    fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  deleteProduct: (id: number, token: string) =>
    fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()),


  getCategories: async () => fetch(`${BASE_URL}/categories`).then(r => r.json()),

  getCategory: async (id: number) =>
    fetch(`${BASE_URL}/categories/${id}`).then(r => r.json()),

  createCategory: (data: CategoryInput, token: string) =>
    fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  updateCategory: (id: number, data: CategoryInput, token: string) =>
    fetch(`${BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  deleteCategory: (id: number, token: string) =>
    fetch(`${BASE_URL}/categories/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()),
};
