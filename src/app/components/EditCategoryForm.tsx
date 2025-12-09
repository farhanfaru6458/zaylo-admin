"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { CategoryInput } from "@/types/category";

export default function EditCategoryForm({
  id,
  initialData,
}: {
  id: number;
  initialData: CategoryInput;
}) {
  const router = useRouter();
  const [category, setCategory] = useState(initialData);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token") ?? "";
    await api.updateCategory(id, category, token);
    router.push("/admin/categories");
  };

  return (
    <Box sx={{ paddingLeft: "20px", width: "100%" }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Edit Category
      </Typography>

      <Box
        sx={{
          width: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          background: "#fcf6ef",
          padding: 3,
          borderRadius: "12px",
        }}
      >
        <TextField
          label="Category Name"
          value={category.name}
          onChange={(e) =>
            setCategory({ ...category, name: e.target.value })
          }
        />

        <TextField
          label="Image URL"
          value={category.image}
          onChange={(e) =>
            setCategory({ ...category, image: e.target.value })
          }
        />

        <Button
          variant="contained"
          sx={{ background: "black", color: "white" }}
          onClick={handleUpdate}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
