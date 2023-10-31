import {
  AttachMoney,
  Campaign,
  Folder,
  Handshake,
  Palette,
  Terminal,
  Theaters,
  Web,
} from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import CategoryCard from "./components/CategoryCard";
import { useState } from "react";

const categories = [
  {
    icon: <Campaign sx={{ fontSize: 52 }} />,
    title: "Marketing & Communication",
    jobs: "58",
  },
  { icon: <Web sx={{ fontSize: 52 }} />, title: "UI / UX Design", jobs: "120" },
  {
    icon: <AttachMoney sx={{ fontSize: 52 }} />,
    title: "Finance Management",
    jobs: "230",
  },
  {
    icon: <Terminal sx={{ fontSize: 52 }} />,
    title: "Web Development",
    jobs: "100",
  },
  {
    icon: <Folder sx={{ fontSize: 52 }} />,
    title: "Project Management",
    jobs: "87",
  },
  {
    icon: <Handshake sx={{ fontSize: 52 }} />,
    title: "Business & Consulting",
    jobs: "23",
  },
  {
    icon: <Palette sx={{ fontSize: 52 }} />,
    title: "Graphic Designer",
    jobs: "65",
  },
  {
    icon: <Theaters sx={{ fontSize: 52 }} />,
    title: "Video Editor",
    jobs: "120",
  },
];

type Props = {};

const Categories = (props: Props) => {
  return (
    <Box sx={{ my: 14, mx: { xs: 3, sm: 4, md: 8 } }}>
      <Box sx={{ textAlign: "center", mb: 12 }}>
        <Typography color="primary" fontWeight="600">
          Browse Categories
        </Typography>
        <Typography variant="h2"> Find Jobs In Over +100 Categories</Typography>
      </Box>
      <Grid container spacing={3}>
        {categories.map((c) => (
          <Grid key={c.title} item xs={12} sm={6} md={4} lg={3}>
            <CategoryCard category={c} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
