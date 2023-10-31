import { gradient } from "@/config/theme";
import { Box, Button, Typography } from "@mui/material";

type Props = {
  query: boolean;
};

const HeroText = ({ query }: Props) => {
  return (
    <Box
      sx={{
        flex: 2,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ ml: "5%", mr: { xs: "5%", md: 0 } }}>
        <Box>
          <Typography
            variant="h1"
            sx={{
              maxWidth: 800,
              mb: 3,
              fontSize: { xs: "3rem", sm: "6rem" },
            }}
          >
            Find the job of your{" "}
            <Typography
              variant="h1"
              component="span"
              sx={{ ...gradient.text, fontSize: { xs: "3rem", sm: "6rem" } }}
            >
              Dreams
            </Typography>
          </Typography>
          <Typography
            variant="body2"
            sx={{ maxWidth: 570, fontSize: { xs: "0.9rem", sm: 21 } }}
          >
            Land Your Dream Job Now! AI matches you with the best opportunities
            for your skills and goals. Search and apply easily in minutes.
          </Typography>
        </Box>
        <Box sx={{ mt: 7, textAlign: query ? "center" : "start" }}>
          <Button variant="contained" size="large">
            Start Searching
          </Button>
          <Button size="large">How It Works</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroText;
