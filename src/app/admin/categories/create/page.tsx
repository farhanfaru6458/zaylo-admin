"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function CreateCategoryPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    image: "",
  });

  const handleCreate = async () => {
    const token = localStorage.getItem("token")?? "";
    await api.createCategory(form, token);
    router.push("/admin/categories");
  };

  return (
    <Box sx={{ paddingLeft: "20px", width: "100%" }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Add New Category
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
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <TextField
          label="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <Button
          variant="contained"
          sx={{ background: "black", color: "white" }}
          onClick={handleCreate}
        >
          Create Category
        </Button>
      </Box>
    </Box>
  );
}
