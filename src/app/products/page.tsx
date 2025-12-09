"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button, Typography, Box, Paper } from "@mui/material";
import DataTable from "@/app/components/DataTable";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);

  return (
    <Box sx={{ width: "100%", overflowX: "hidden"   }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Products
      </Typography>

      <Button
        variant="contained"
        href="/admin/products/create"
        sx={{ mb: 2, background: "black", color: "white" }}
      >
        + Add Product
      </Button>

      <Paper sx={{ width: "80%", overflowX: "auto" ,background: "none",
    boxShadow:" none",
    border: "none" }}>
        <DataTable rows={products} type="products" />
      </Paper>
    </Box>
  );
}
