"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Paper,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import AddIcon from "@mui/icons-material/Add";

import DataTable from "@/app/components/DataTable";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
type Products ={
  title:string;
}
  useEffect(() => {
    api.getProducts().then((res) => setProducts(res));
  }, []);

  const filteredProducts = products.filter((p: Products) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, height:"100%", width:"100%"}}>
      {/* Page Header */}      <Box
        sx={{
          mb: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ fontFamily: "monospace" }}
        >
          Products
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          href="/admin/products/create"
          sx={{
            background: "black",
            color: "white",
            px: 5,
            py: 1,
            mx:3,
            fontSize: "16px",
            borderRadius: 2,
            textTransform: "none",
            "&:hover": { background: "#333" },
          }}
        >
          Add Product
        </Button>
      </Box>

      {/* Filters */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          mx:3,
          borderRadius: 3,
      background:"#00000",
          border: "1px solid #e1d5c5",
          display: "flex",
          flexWrap: "wrap",
          gap: 2,

          
        }}
      >
        {/* Search */}
        <TextField
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: { xs: "100%", md: "35%" } }}
          InputProps={{
            sx: {
              bgcolor: "white",
              borderRadius: 2,
            },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "gray" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Sort Dropdown */}
        <TextField
          select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          label="Sort By"
          sx={{ flex: { xs: "100%", md: "20%" } }}
          InputProps={{
            sx: { bgcolor: "white", borderRadius: 2 },
          }}
        >
          <MenuItem value="recent">
            <SortIcon sx={{ mr: 1 }} /> Most Recent
          </MenuItem>
          <MenuItem value="price-low">Price: Low to High</MenuItem>
          <MenuItem value="price-high">Price: High to Low</MenuItem>
        </TextField>
      </Paper>

      {/* Product Table */}
      <Paper
        sx={{
          p: 2,
          borderRadius: 3,
          border: "1px solid #e2e2e2",
          boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
          
        }}
      >
        <DataTable rows={filteredProducts} type="products" />
      </Paper>
    </Box>
  );
}
