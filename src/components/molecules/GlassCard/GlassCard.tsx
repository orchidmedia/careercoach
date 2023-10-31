import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

const GlassCard = ({ children, top, right, bottom, left }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        padding: 2,
        borderRadius: 2,
        background: "rgba(255, 253, 253, 0.60)",
        boxShadow: "0px 5px 10px 0px rgba(51, 48, 48, 0.25)",
        backdropFilter: "blur(5px)",
        position: "absolute",
        top,
        right,
        bottom,
        left,
      }}
    >
      {children}
    </Box>
  );
};

export default GlassCard;
