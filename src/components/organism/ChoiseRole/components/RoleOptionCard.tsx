import { gradient } from "@/config/theme";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";

type Props = {
    role: { icon: ReactNode; title: string; text: string; textButton: string, route: any };
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

const RoleOptionCard = ({ role }: Props) => {
    const router = useRouter();
    const [styles, setStyles] = useState(hoverStyle);
    const route = role.route
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center',
                padding: "33px 25px",
                background: gradient.bg,
                borderRadius: 4,
                gap: 4,
                boxShadow: "0px 4.205862522125244px 21.029312133789062px 0px #FFEFE0",
                transition: "ease-in-out",
            }}
        >
            <Box sx={{ color: styles.icon }}>{role.icon}</Box>
            <Typography
                variant="subtitle1"
                sx={{ fontWeight: "700", color: styles.title }}
            >
                {role.title}
            </Typography>
            <Typography sx={{ color: styles.jobs, fontWeight: "400", mt: 2 }}>
                {role.text}
            </Typography>
            <Button variant="contained" size="large">
                <Link href={{
                    pathname: '/candidate/uploadResumen',
                }}>
                    {role.textButton}
                </Link>
            </Button>
        </Box>
    );
};

export default RoleOptionCard;
