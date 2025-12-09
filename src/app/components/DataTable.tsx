"use client";

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";

import {
  IconButton,
  Box,
  Chip,
  Avatar,

} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

import { ProductRow } from "@/types/admin";
import { CategoryRow } from "@/types/category";

type Props = {
  rows: ProductRow[] | CategoryRow[];
  type: "products" | "categories";
};

export default function DataTable({ rows, type }: Props) {
  const router = useRouter();

  
  const columns: GridColDef[] =
    type === "products"
      ? [
          { field: "id", headerName: "ID", width: 70 },

          {
            field: "title",
            headerName: "Title",
            flex: 1,
            minWidth: 180,
          },

          {
            field: "price",
            headerName: "Price",
            width: 120,
            renderCell: (params) => `₹${params.value}`,
          },

          {
            field: "category",
            headerName: "Category",
            width: 180,
            renderCell: (params) => (
              <Chip
                label={params.value?.name || "N/A"}
                sx={{
                  fontFamily: "monospace",
                  background: "#e8dfd7",
                }}
              />
            ),
          },

          {
            field: "images",
            headerName: "Image",
            width: 120,
            renderCell: (params) => (
              <Avatar
                src={params.value?.[0]}
                alt="product"
                variant="rounded"
                sx={{
                  width: 55,
                  height: 55,
                  borderRadius: 2,
                  border: "2px solid #ddd",
                  objectFit: "cover",
                }}
              />
            ),
          },
        ]
      : [
          { field: "id", headerName: "ID", width: 80 },
          {
            field: "name",
            headerName: "Name",
            width: 200,
          },

          {
            field: "image",
            headerName: "Image",
            width: 120,
            renderCell: (params) => (
              <Avatar
                src={params.value}
                alt="category"
                variant="rounded"
                sx={{
                  width: 55,
                  height: 55,
                  borderRadius: 2,
                  border: "2px solid #ddd",
                }}
              />
            ),
          },
        ];

  /* ACTION COLUMN */
  const actionColumn: GridColDef = {
    field: "actions",
    headerName: "Actions",
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton
          onClick={() =>
            router.push(`/admin/${type}/${params.row.id}`)
          }
          sx={{
            color: "#333",
            "&:hover": { color: "black" },
          }}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          color="error"
          onClick={() => alert(`Delete ${type} ${params.row.id}`)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "none",
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
        transition: "0.3s ease",
        "&:hover": { boxShadow: "0 10px 35px rgba(0,0,0,0.12)" },
      }}
    >
      <DataGrid
        rows={rows}
        columns={[...columns, actionColumn]}
        autoHeight
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: {
              debounceMs: 300,
            },
          },
        }}
        sx={{
          border: "none",
          fontFamily: "monospace",

          /* Header styling */
          "& .MuiDataGrid-columnHeaders": {
            background: "linear-gradient(90deg, #fcf6ef, #f0e6d8)",
            borderBottom: "2px solid #e1d5c5",
            fontWeight: "bold",
            fontSize: "15px",
          },

          /* Row styling */
          "& .MuiDataGrid-row": {
            borderRadius: 2,
            transition: "0.2s ease",
          },

          "& .MuiDataGrid-row:hover": {
            background: "#fff7ed",
            transform: "scale(1.01)",
          },

          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #f1e9df",
          },

          /* Checkbox custom style */
          "& .MuiCheckbox-root.Mui-checked": {
            color: "black",
          },

          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #e1d5c5",
            background: "#fcf6ef",
          },

          "& .MuiTablePagination-actions svg": {
            color: "black",
          },
        }}
      />
    </Box>
  );
}
