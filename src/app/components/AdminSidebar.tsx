"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AdminSidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
const router = useRouter()
 const navItem = (path: string, label: string, Icon: React.ElementType) => {
  const active = pathname.startsWith(path);

  return (
    <Tooltip title={collapsed ? label : ""} placement="right">
      <Button
        component={Link}
        href={path}
        fullWidth
        startIcon={<Icon sx={{ color: active ? "#000" : "#ffff" }} />}
        sx={{
          justifyContent: collapsed ? "center" : "flex-start",
          background: active ? "#e8dfd7" : "#00000",
          color: active?"black":"#fff",
          fontWeight: "bold",
          borderRadius: 2,
          px: collapsed ? 1 : 2,
          minHeight: "48px",
          transition: "0.3s ease",

          "& .MuiButton-startIcon": {
            margin: collapsed ? 0 : "",
          },

          "&:hover": { background: "#e0d5cc",color:"black" },
        }}
      >
        {!collapsed && label}
      </Button>
    </Tooltip>
  );
};


  return (
    <Box
      sx={{
        width: collapsed ? 80 : 240,
        background: "black",
        color: "white",
        padding: 2,
        paddingTop: 3,
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid #222",
        transition: "0.3s ease",
        zIndex: 100,
      }}
    >
      {/* Logo + toggle */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          px: collapsed ? 0 : 1,
        }}
      >
        {!collapsed && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Image
              src="/zaylo-logo.png"
              alt="Zaylo Logo"
              width={45}
              height={45}
              style={{ filter: "invert(1)" }}
            />
            <Typography variant="h6" fontWeight="bold">
              Zaylo
            </Typography>
          </Box>
        )}

        {collapsed && (
          <Image
            src="/zaylo-logo.png"
            alt="Zaylo Logo"
            width={40}
            height={40}
            style={{ filter: "invert(1)" }}
          />
        )}

        <IconButton sx={{ color: "white" }} onClick={() => setCollapsed(!collapsed)}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: "#444" }} />

      {navItem("/admin/dashboard", "Dashboard", DashboardIcon)}
      {navItem("/admin/products", "Products", InventoryIcon)}
      {navItem("/admin/categories", "Categories", CategoryIcon)}
    <Button
  fullWidth
  startIcon={<LogoutIcon />}
  onClick={() => {
    localStorage.removeItem("token");
    router.push("/");
  }}
  sx={{
    justifyContent: collapsed ? "center" : "flex-start",
    background: "#0000",
    color: "white",
    fontWeight: "bold",
    borderRadius: 2,
    px: collapsed ? 1 : 2,
    minHeight: "48px",
    transition: "0.3s ease",
    "&:hover": { background: "#fcf6ef",color:"black" },
  }}
>
  {!collapsed && "Logout"}
</Button>


      <Box sx={{ flexGrow: 1 }} />

      
    </Box>
  );
}
