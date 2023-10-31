import { Box, useMediaQuery } from "@mui/material";
import HeroText from "./components/HeroText";
import HeroImage from "./components/HeroImage";

type Props = {};

const Hero = (props: Props) => {
  const query = useMediaQuery("(max-width:600px)");
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: { xs: 12, sm: 25, md: 0 },
        mt: { xs: 8, md: 20 },
        justifyContent: "center",
      }}
    >
      <HeroText query={query} />
      <HeroImage query={query} />
    </Box>
  );
};

export default Hero;
