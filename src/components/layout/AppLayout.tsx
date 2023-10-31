import { PropsWithChildren } from "react";
import Navbar from "../molecules/Navbar";
import { Toolbar } from "@mui/material";

type Props = {};

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navbar />
      <Toolbar sx={{ marginY: 4 }} />
      {children}
    </div>
  );
};

export default AppLayout;
