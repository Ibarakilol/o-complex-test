import type { IProduct } from '@/interfaces';

export interface ProductListProps {
  isLoading: boolean;
  products: IProduct[];
}
