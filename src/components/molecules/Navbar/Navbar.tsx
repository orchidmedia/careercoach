import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Hidden,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import logo from "../../../../public/logo.svg";
import { routes } from "@/components/layout/routes";
import { useRouter } from "next/router";
import { theme } from "@/config/theme";
import Link from "@/components/atoms/Link";
import { Menu } from "@mui/icons-material";

type Props = {};

const Navbar = (props: Props) => {
  const router = useRouter();

  return (
    <AppBar component="nav">
      <Toolbar>
        <Image src={logo} alt="Career Coach Logo" width={222} />
        {/* Displays Navbar on Desktop */}
        <Hidden smDown>
          <Box sx={{ display: "flex", gap: 2 }}>
            {routes.map((r) => (
              <Link
                key={r.name}
                href={r.path}
                style={{
                  color:
                    router.pathname === r.path
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                  fontWeight: router.pathname === r.path ? "700" : "500",
                }}
              >
                {r.name}
              </Link>
            ))}
          </Box>
          <Box>
            <Button sx={{ color: "text.secondary" }}>Login</Button>
            <Button variant="contained">Sign Up</Button>
          </Box>
        </Hidden>
        {/* {Displays Drawer on Mobile} */}
        <Hidden smUp>
          <IconButton>
            <Menu fontSize="large" />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
