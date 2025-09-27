import { AppBar, Toolbar, Button, Typography, Box, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <AppBar
            position="static"
            sx={{
                background: "linear-gradient(90deg, #1e3c72, #2a5298)",
                boxShadow: 4,
                px: 3,
            }}
        >
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                {/* Logo */}
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        fontWeight: "bold",
                        letterSpacing: 1,
                        color: "#fff",
                        textDecoration: "none",
                        "&:hover": { opacity: 0.8 },
                    }}
                >
                    💰 Finance Tracker
                </Typography>

                {/* Navigation Buttons */}
                <Stack direction="row" spacing={10}>
                    {token ? (
                        <>
                            <NavButton to="/dashboard" label="Dashboard" />
                            <NavButton to="/transactions" label="Transactions" />
                            <NavButton to="/export" label="Export" />
                            <Button
                                onClick={handleLogout}
                                sx={{
                                    color: "#fff",
                                    backgroundColor: "rgba(255,0,0,0.2)",
                                    "&:hover": { backgroundColor: "rgba(255,0,0,0.4)" },
                                }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <NavButton to="/login" label="Login" />
                            <Button
                                component={Link}
                                to="/register"
                                sx={{
                                    color: "#fff",
                                    backgroundColor: "rgba(0,255,255,0.2)",
                                    "&:hover": { backgroundColor: "rgba(0,255,255,0.3)" },
                                }}
                            >
                                Register
                            </Button>
                        </>
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

// 🔧 Custom button component for cleaner code
function NavButton({ to, label }) {
    return (
        <Button
            component={Link}
            to={to}
            sx={{
                color: "#fff",
                fontSize: "20px",
                textTransform: "none",
                "&:hover": {
                    background: "rgba(255,255,255,0.1)",
                },
            }}
        >
            {label}
        </Button>
    );
}