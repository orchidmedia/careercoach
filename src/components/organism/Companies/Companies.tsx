import { Box, List, ListItem, Typography } from "@mui/material";
import Image from "next/image";
import airbnb from "../../../assets/Companies/airbnb.svg";
import microsoft from "../../../assets/Companies/microsoft.svg";
import google from "../../../assets/Companies/google.svg";
import slack from "../../../assets/Companies/slack.svg";

const companies = [
  {
    name: "Airbnb",
    src: airbnb,
  },
  {
    name: "Microsoft",
    src: microsoft,
  },
  {
    name: "Google",
    src: google,
  },
  {
    name: "Slack",
    src: slack,
  },
];

type Props = {};

const Companies = (props: Props) => {
  return (
    <Box sx={{ background: "#fff", mt: 30, py: 7 }}>
      <Typography variant="subtitle1" textAlign="center" mb={10}>
        Join Most Well Known{" "}
        <Typography component="span" variant="subtitle1" color="primary">
          Companies
        </Typography>{" "}
        Around The World
      </Typography>
      <Box
        sx={{
          maxWidth: "100vw",
          overflow: "hidden",
          mask: "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)",
          WebkitMask:
            "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)",
        }}
        data-animated="true"
      >
        <List
          sx={{
            display: "flex",
            paddingBlock: "2rem",
            gap: "6rem",
            flexWrap: "nowrap",
            animation: "scroll 100s linear infinite",
            width: "max-content",
          }}
        >
          {Array.from({ length: 4 }).map((a) =>
            companies.map((c) => {
              return (
                <ListItem
                  key={c.name}
                  sx={{
                    width: "fit-content",
                  }}
                >
                  <Image src={c.src} alt={c.name} />
                </ListItem>
              );
            })
          )}
        </List>
      </Box>
    </Box>
  );
};

export default Companies;
