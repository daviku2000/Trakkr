import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});

export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  quantity: number;
}

export interface ProductRequest {
  name: string;
  sku: string;
  description: string;
  price: number;
  quantity: number;
}

export const getProducts = () => API.get<Product[]>('/products');
export const createProduct = (product: ProductRequest) => API.post<Product>('/products', product);