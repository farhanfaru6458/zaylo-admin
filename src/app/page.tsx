"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("admin@mail.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);

    const res = await api.login(email, password);

    if (res?.access_token) {
      localStorage.setItem("token", res.access_token);
      setTimeout(() => router.push("/admin/dashboard"), 1000);
    } else {
      alert("Invalid login");
      setLoading(false);
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #fcf6ef, #e8dfd7)",
        fontFamily: "monospace",
        position: "relative",
      }}
    >
      {/* ===== Animated Logo Loader ===== */}
      {loading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(6px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 20,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Image
              src="/zaylo-logo.png"
              alt="Loading Logo"
              width={85}
              height={85}
              className="logo-spin"
              style={{ filter: "invert(0)" }}
            />
            <Typography
              mt={2}
              fontSize={18}
              fontWeight="bold"
              sx={{ animation: "fadeText 1.5s infinite" }}
            >
              Loading...
            </Typography>
          </Box>
        </Box>
      )}

      {/* ===== Login Card ===== */}
      <Paper
        sx={{
          padding: 4,
          width: 420,
          borderRadius: 4,
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          animation: "fadeInUp 0.6s ease",
        }}
      >
        <Box textAlign="center" mb={3}>
          <Image
            src="/zaylo-logo.png"
            alt="Zaylo Logo"
            width={70}
            height={70}
            style={{ filter: "invert(0)" }}
          />
          <Typography
            variant="h5"
            fontWeight="bold"
            mt={1}
            sx={{ letterSpacing: 1 }}
          >
            Admin Login
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          disabled={loading}
          sx={{
            background: "black",
            ":hover": { background: "#333" },
            color: "white",
            fontFamily: "monospace",
            paddingY: 1.2,
            borderRadius: 2,
            fontSize: "16px",
          }}
        >
          {loading ? <CircularProgress size={26} sx={{ color: "white" }} /> : "Login"}
        </Button>
      </Paper>

      {/* ===== Custom Animations ===== */}
      <style>
        {`
        @keyframes spinLogo {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }

        .logo-spin {
          animation: spinLogo 1.6s infinite ease-in-out;
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeText {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        `}
      </style>
    </Box>
  );
}
