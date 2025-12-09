"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Stack,
} from "@mui/material";

type EditFormProps = {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    categoryId: { id: number; name: string };
    category: { id: number; name: string };
    images: string[];
  };
  categories: { id: number; name: string }[];
};

export default function EditProductForm({ product, categories }: EditFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [categoryId, setCategoryId] = useState(product.category?.id ?? "");
  const [images, setImages] = useState(product.images?.[0] ?? "");

  const handleUpdate = async () => {
    const token = localStorage.getItem("token") ?? "";

    await api.updateProduct(
      product.id,
      {
        title,
        price,
        description,
        categoryId,
        images: [images],
      },
      token
    );

    router.push("/admin/products");
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Edit Product
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 4 }}>
        <Stack spacing={3}>
          <TextField
            label="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice( Number(e.target.value))}
          />

          <TextField
            label="Description"
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            select
            label="Category"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Image URL"
            value={images}
            onChange={(e) => setImages(e.target.value)}
          />

          {images && (
            <img
              src={images}
              style={{ width: 120, height: 120, borderRadius: 8, objectFit: "cover" }}
            />
          )}

          <Button variant="contained" onClick={handleUpdate}>
            Update Product
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
