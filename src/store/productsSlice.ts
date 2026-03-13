import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const PRODUCTS_URL =
  'https://ip-194-99-21-145-139178.vps.hosted-by-mvps.net/api/v1/products';

export interface ProductVolume {
  id: string;
  label: string;
  in_stock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  old_price: number;
  discount_percent: number;
  currency: string;
  rating: number;
  reviews_count: number;
  in_stock: boolean;
  category: string;
  volumes: ProductVolume[];
  selected_volume_id: string;
}

interface ProductsResponse {
  success: boolean;
  data: {
    products: Product[];
  };
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null
};

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await axios.get<ProductsResponse>(PRODUCTS_URL);
  console.log('Products from API:', response.data);
  return response.data.data.products;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load products';
      });
  }
});

export const productsReducer = productsSlice.reducer;

