"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Stack,
} from "@mui/material";

import { api } from "@/lib/api";

export default function Create() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);

type Catagories={
    name:string;
    id:number;
}
  
  // Load categories once
  useState(() => {
    api.getCategories().then(setCategories);
  });

  const handleSubmit = async () => {
    if (!title || !price || !categoryId || !image) {
      alert("⚠️ Please fill all fields");
      return;
    }

    const token = "YOUR_ADMIN_TOKEN"; // You can store in localStorage later

    const newProduct = {
      title,
      price: Number(price),
      categoryId: Number(categoryId),
      images: [image],
      description: "New product created from admin panel",
    };

    const res = await api.createProduct(newProduct, token);

    if (res?.id) {
      alert("🎉 Product Created Successfully!");
      router.push("/admin/products"); // redirect and update table
    } else {
      alert("❌ Failed to create product");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 3,
        p: 3,
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={3} sx={{ fontFamily: "monospace" }}>
        Create Product
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 4, background: "#fcf6ef" }}>
        <Stack spacing={3}>
          <TextField
            label="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
          />

          <TextField
            label="Category"
            select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            fullWidth
          >
            {categories.map((cat: Catagories) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
          />

          {/* Preview Image */}
          {image && (
            <Box sx={{ textAlign: "center" }}>
              <img
                src={image}
                alt="preview"
                style={{ width: 120, height: 120, borderRadius: 8, objectFit: "cover" }}
              />
            </Box>
          )}

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              background: "black",
              color: "white",
              "&:hover": { background: "#333" },
              fontFamily: "monospace",
              py: 1.2,
            }}
          >
            Create Product
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
