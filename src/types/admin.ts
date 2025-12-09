export type ProductRow = {
  id: number;
  title: string;
  price: number;
  category: string;
  images: string[];
};




export interface ProductInput {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}
