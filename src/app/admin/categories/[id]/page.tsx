import EditCategoryForm from "@/app/components/EditCategoryForm";
import { api } from "@/lib/api";

export default async function CategoryEditPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  // Fetch category on the server
  const category = await api.getCategory(id);

  return <EditCategoryForm id={id} initialData={category} />;
}
