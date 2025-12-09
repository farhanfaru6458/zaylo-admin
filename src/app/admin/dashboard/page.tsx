"use client";

import { useEffect, useState, useMemo } from "react";
import { api } from "@/lib/api";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LinearProgress from "@mui/material/LinearProgress";
import Avatar from "@mui/material/Avatar";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";

type Trend = "up" | "down" | "flat";

export default function Dashboard() {
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  // Fake data you can replace with real API values later
  const userCount = 1280;
  const monthlyRevenue = 48230;
  const revenueChange = 18; // %

  useEffect(() => {
    api.getProducts().then((res) => setProductCount(res.length));
    api.getCategories().then((res) => setCategoryCount(res.length));
  }, []);

  const topCategories = useMemo(
    () => [
      { name: "Shoes", value: 32 },
      { name: "Bags", value: 21 },
      { name: "Accessories", value: 17 },
      { name: "Hoodies", value: 15 },
      { name: "T-Shirts", value: 12 },
    ],
    []
  );

  const recentActivity = useMemo(
    () => [
      { label: "New product added: Classic Red Hoodie", time: "5 min ago" },
      { label: "Category updated: Premium Bags", time: "18 min ago" },
      { label: "3 orders shipped", time: "30 min ago" },
      { label: "New user registered", time: "45 min ago" },
    ],
    []
  );

  return (
    <Box sx={{ pl: 3, pr: 3 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
        sx={{ fontFamily: "monospace" }}
      >
        Dashboard
      </Typography>

      {/* ===================== TOP STATS ===================== */}
      <Stack
        direction="row"
        spacing={3}
        flexWrap="wrap"
        useFlexGap
        sx={{ mb: 4 }}
      >
        <StatCard
          title="Total Products"
          value={productCount}
          icon={<ShoppingBagIcon />}
          color="#F7DFF0"
          trend="up"
          trendValue={12}
        />

        <StatCard
          title="Total Categories"
          value={categoryCount}
          icon={<CategoryIcon />}
          color="#DFF7E4"
          trend="flat"
        />

        <StatCard
          title="Users"
          value={userCount}
          icon={<PeopleIcon />}
          color="#E5E4FF"
          trend="up"
          trendValue={8}
        />

        <StatCard
          title="Monthly Revenue"
          value={`₹${monthlyRevenue.toLocaleString()}`}
          icon={<AttachMoneyIcon />}
          color="#FFEFD7"
          trend="up"
          trendValue={revenueChange}
        />
      </Stack>

      {/* ===================== MIDDLE ROW ===================== */}
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={3}
        sx={{ mb: 4 }}
      >
        {/* Revenue Line Chart */}
        <Card
          sx={{
            flex: 2,
            background: "#fcf6ef",
            borderRadius: 4,
            border: "1px solid #e1d5c5",
            p: 2,
          }}
        >
          <CardContent sx={{ pb: 1 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "monospace", mb: 0.5 }}
                >
                  Revenue Trend
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontFamily: "monospace" }}
                >
                  Last 7 months
                </Typography>
              </Box>
              <Chip
                label="+18% vs last period"
                size="small"
                color="success"
                icon={<TrendingUpIcon />}
                sx={{ fontFamily: "monospace" }}
              />
            </Stack>
          </CardContent>

          <LineChart
            height={280}
            series={[
              {
                data: [12, 19, 15, 30, 42, 48, 53],
                label: "Revenue",
              },
            ]}
            xAxis={[
              {
                scaleType: "point",
                data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              },
            ]}
          />
        </Card>

        {/* Orders Bar Chart + KPIs */}
        <Card
          sx={{
            flex: 1,
            borderRadius: 4,
            border: "1px solid #e1d5c5",
            background: "#fff",
            p: 2,
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontFamily: "monospace", mb: 1 }}
            >
              Orders Overview
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 2, fontFamily: "monospace" }}
            >
              Orders per day (this week)
            </Typography>

            <BarChart
              height={220}
              series={[{ data: [12, 8, 16, 19, 11, 15, 9], label: "Orders" }]}
              xAxis={[
                {
                  scaleType: "band",
                  data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                },
              ]}
            />

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" spacing={2} justifyContent="space-between">
              <KpiMini label="Avg. Order Value" value="₹1,320" />
              <KpiMini label="Return Rate" value="3.2%" />
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* ===================== BOTTOM ROW ===================== */}
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={3}
        sx={{ pb: 3 }}
      >
        {/* Top Categories */}
        <Card
          sx={{
            flex: 1,
            borderRadius: 4,
            border: "1px solid #e1d5c5",
            background: "#fff",
          }}
        >
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography
                variant="h6"
                sx={{ fontFamily: "monospace" }}
              >
                Top Categories
              </Typography>
              <LocalMallIcon />
            </Stack>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 2, fontFamily: "monospace" }}
            >
              Based on product count
            </Typography>

            {topCategories.map((cat) => (
              <Box key={cat.name} sx={{ mb: 1.5 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    sx={{ fontFamily: "monospace" }}
                  >
                    {cat.name}
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "monospace" }}
                  >
                    {cat.value}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={cat.value}
                  sx={{
                    height: 6,
                    borderRadius: 999,
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "#000",
                    },
                  }}
                />
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card
          sx={{
            flex: 1.2,
            borderRadius: 4,
            border: "1px solid #e1d5c5",
            background: "#fff",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontFamily: "monospace", mb: 1 }}
            >
              Recent Activity
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 2, fontFamily: "monospace" }}
            >
              Latest updates in your store
            </Typography>

            <List dense>
              {recentActivity.map((item, index) => (
                <ListItem
                  key={index}
                  disableGutters
                  secondaryAction={
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", fontFamily: "monospace" }}
                    >
                      {item.time}
                    </Typography>
                  }
                >
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: "#000",
                        fontSize: 14,
                        fontFamily: "monospace",
                      }}
                    >
                      <ArrowForwardIosIcon sx={{ fontSize: 14, color: "#fcf6ef" }} />
                    </Avatar>
                    <ListItemText
                      primaryTypographyProps={{
                        sx: { fontFamily: "monospace", fontSize: 14 },
                      }}
                      primary={item.label}
                    />
                  </Stack>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

/* ================== SMALL REUSABLE COMPONENTS ================== */

type StatCardProps = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  trend: Trend;
  trendValue?: number;
};

function StatCard({ title, value, icon, color, trend, trendValue }: StatCardProps) {
  const TrendIcon =
    trend === "up" ? TrendingUpIcon : trend === "down" ? TrendingDownIcon : null;

  const trendColor =
    trend === "up"
      ? "#22c55e"
      : trend === "down"
      ? "#ef4444"
      : "#9ca3af";

  return (
    <Card
      sx={{
        flex: { xs: "1 1 100%", md: "1 1 calc(25% - 16px)" },
        minWidth: { xs: "100%", md: 220 },
        background: color,
        borderRadius: 4,
        border: "1px solid #e1d5c5",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
        },
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontFamily: "monospace" }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                mt: 1,
                fontFamily: "monospace",
                color: "black",
              }}
            >
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: "16px",
              bgcolor: "rgba(0,0,0,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fcf6ef",
            }}
          >
            {icon}
          </Box>
        </Stack>

        {TrendIcon && trendValue != null && (
          <Stack direction="row" alignItems="center" spacing={0.8} mt={1.5}>
            <TrendIcon sx={{ fontSize: 18, color: trendColor }} />
            <Typography
              variant="body2"
              sx={{ color: trendColor, fontFamily: "monospace" }}
            >
              {trendValue > 0 ? `+${trendValue}%` : `${trendValue}%`} this month
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

function KpiMini({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontFamily: "monospace" }}
      >
        {label}
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontFamily: "monospace", mt: 0.5 }}
      >
        {value}
      </Typography>
    </Box>
  );
}
