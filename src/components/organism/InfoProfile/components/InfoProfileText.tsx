import { gradient } from "@/config/theme";
import { Box, Button, Typography } from "@mui/material";

type Props = {
  query: boolean;
};

const InfoProfileText = ({ query }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop:{xs: 20, lg: -5}
      }}
    >
      <Box>
        <Box>
          <Typography
            sx={{
              fontWeight: 300,
              color:'#025E73',
              mb: 3,
              fontStyle: 'italic',
              fontSize: { xs: 15, sm: 20 },
              lineHeight: '140%'
            }}
          >
            Create Profile
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 300, color:'#333',  fontStyle: 'italic', fontSize: { xs: "0.9rem", sm: 46 } }}
          >
            Build Your Personal <br /> Account Profile
          </Typography>
          <Typography
            variant="body2"
            sx={{ marginTop: 4, maxWidth: 570, fontSize: { xs: "0.9rem", sm: 21 } }}
          >
            Create an account for the job information you want, get daily notifications and you can easily apply directly to the company you want and create an account now for free
          </Typography>
        </Box>
        <Box sx={{ mt: 7, textAlign: query ? "center" : "start" }}>
          <Button variant="contained" size="large">
            Create Account
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoProfileText;
