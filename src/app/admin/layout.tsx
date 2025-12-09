"use client";

import { ThemeProvider } from "@mui/material/styles";
import { adminTheme } from "./theme";
import AdminSidebar from "../components/AdminSidebar";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ThemeProvider theme={adminTheme}>
      <div style={{ display: "flex", background: "#fcf6ef" }}>
        
        {/* Sidebar */}
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Main content */}
        <main
          style={{
            padding: "20px",
            paddingLeft: collapsed ? "100px" : "260px",
            transition: "0.3s ease",
            width: "100%",
            minHeight: "100vh",
            overflowX: "hidden",
          }}
        >
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
