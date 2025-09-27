import { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [form, setForm] = useState({ username: "", email: "", passwordhash: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post("/Auth/register", form);
            alert("Đăng ký thành công");
            navigate("/login");
        } catch {
            alert("Đăng ký thất bại");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ mt: 6, p: 4, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
                    Đăng ký
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                            Register
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}
