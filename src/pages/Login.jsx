import { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [form, setForm] = useState({ usernameOrEmail: "", passwordhash: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosClient.post("/Auth/login", form);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            alert("Đăng nhập thất bại");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ mt: 6, p: 4, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
                    Đăng nhập
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username / Email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={form.usernameOrEmail}
                        onChange={(e) => setForm({ ...form, usernameOrEmail: e.target.value })}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={form.passwordhash}
                        onChange={(e) => setForm({ ...form, passwordhash: e.target.value })}
                    />
                    <Box sx={{ textAlign: "center", mt: 3 }}>
                        <Button variant="contained" type="submit" sx={{ px: 5 }}>
                            Login
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}
