import { theme } from "@/config/theme";
import { SxProps } from "@mui/material";
import NextLink, { LinkProps } from "next/link";

interface Props extends LinkProps {
  children: string;
  style: SxProps;
}

const Link = (props: Props) => {
  return (
    <NextLink
      {...props}
      style={{ ...props.style, textDecoration: "none" } as {}}
    >
      {props.children}
    </NextLink>
  );
};

export default Link;
