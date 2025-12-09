import EditProductForm from "@/app/components/EditProductForm";
import { api } from "@/lib/api";

export default async function EditProductPage(props: { params: Promise<{ id: number }> }) {
  const { id } = await props.params;  

  const product = await api.getProduct(Number(id));
  const categories = await api.getCategories();

  return (
    <EditProductForm product={product} categories={categories} />
  );
}
