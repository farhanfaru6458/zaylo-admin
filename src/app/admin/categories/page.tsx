"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Box, Button, Typography, Paper } from "@mui/material";
import DataTable from "@/app/components/DataTable";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.getCategories().then(setCategories);
  }, []);

  return (
    <Box sx={{ paddingLeft: "20px", marginTop: "-10px" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
        sx={{ fontFamily: "monospace" }}
      >
        Categories
      </Typography>

      <Button
        variant="contained"
        href="/admin/categories/create"
        sx={{
          mb: 2,
          background: "black",
          color: "white",
          borderRadius: "10px",
          paddingX: 3,
        }}
      >
        + Add Category
      </Button>

      <Paper sx={{ overflowX: "auto", borderRadius: "12px" }}>
        <DataTable rows={categories} type="categories" />
      </Paper>
    </Box>
  );
}
