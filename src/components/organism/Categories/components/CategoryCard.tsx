import { gradient } from "@/config/theme";
import { Box, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

type Props = {
  category: { icon: ReactNode; title: string; jobs: string };
};

const initialStyle = {
  background: "#fff",
  title: "text.secondary",
  jobs: "#828282",
  icon: "primary.main",
};
const hoverStyle = {
  background: gradient.bg,
  title: "#fff",
  jobs: "#fff",
  icon: "#fff",
};

const CategoryCard = ({ category }: Props) => {
  const [styles, setStyles] = useState(initialStyle);

  return (
    <Box
      sx={{
        display: "flex",
        padding: "33px 25px",
        background: styles.background,
        borderRadius: 4,
        gap: 4,
        boxShadow: "0px 4.205862522125244px 21.029312133789062px 0px #FFEFE0",
        transition: "ease-in-out",
      }}
      onMouseEnter={() => setStyles(hoverStyle)}
      onMouseLeave={() => setStyles(initialStyle)}
    >
      <Box sx={{ color: styles.icon }}>{category.icon}</Box>
      <Box>
        <Typography
          variant="subtitle1"
          sx={{ width: "145px", fontWeight: "700", color: styles.title }}
        >
          {category.title}
        </Typography>
        <Typography sx={{ color: styles.jobs, fontWeight: "400", mt: 2 }}>
          {category.jobs} Jobs Available
        </Typography>
      </Box>
    </Box>
  );
};

export default CategoryCard;
