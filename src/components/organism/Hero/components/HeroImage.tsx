import { gradient } from "@/config/theme";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Img from "../../../../assets/Hero/hero-image.webp";
import Vector from "../../../../assets/Hero/hero-vector.svg";
import GlassCard from "@/components/molecules/GlassCard";
import { BusinessCenter, FlashOn } from "@mui/icons-material";

type Props = {
  query: boolean;
};

const HeroImage = ({ query }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: query ? "center" : "flex-end",
        flex: 1,
        position: "relative",
      }}
    >
      <Box position="relative">
        <GlassCard left={-40} bottom={-250}>
          <FlashOn fontSize="large" color="primary" />
          <Typography
            sx={{
              lineHeight: "26px",
              letterSpacing: "0.084px",
              width: "110px",
              textAlign: "center",
              color: "text.secondary",
              fontWeight: "500",
            }}
          >
            It only takes a few seconds
          </Typography>
        </GlassCard>
        <GlassCard top={query ? -200 : -250} right={query ? -300 : -450}>
          <BusinessCenter fontSize="large" color="primary" />
          <Typography
            sx={{
              lineHeight: "26px",
              fontSize: "24px",
              letterSpacing: "0.084px",
              width: "110px",
              textAlign: "center",
              color: "text.secondary",
              fontWeight: "600",
            }}
          >
            10.5K
          </Typography>
          <Typography>Job Vacancy</Typography>
        </GlassCard>
      </Box>
      <Box
        sx={{
          borderRadius: "50%",
          width: query ? 275 : "475px",
          height: query ? 275 : "475px",
          background: gradient.bg,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mr: query ? 0 : "15%",
        }}
      >
        <Image
          src={Img}
          alt="Hero Image"
          width={query ? 373 : 665}
          height={query ? 331 : 590}
        />
      </Box>
      <Image
        src={Vector}
        alt="Hero Vector"
        width={query ? 360 : 709}
        height={query ? 502 : 989}
        style={{ zIndex: -1, position: "absolute", right: 0 }}
      />
    </Box>
  );
};

export default HeroImage;
