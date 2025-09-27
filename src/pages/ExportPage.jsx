import { Container, Button, Typography, Paper, Box } from "@mui/material";
import axiosClient from "../api/axiosClient";

export default function ExportPage() {
    const handleExport = async () => {
        const res = await axiosClient.get("/Export/transactions", { responseType: "blob" });
        const blob = new Blob([res.data], { type: res.headers["content-type"] });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `transactions_${Date.now()}.xlsx`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Container sx={{ mt: 3 }}>
            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                    Export Excel
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleExport}
                    sx={{
                        background: "linear-gradient(90deg, #1e3c72, #2a5298)",
                        px: 4,
                        py: 1.5,
                        fontWeight: "bold",
                        "&:hover": { background: "linear-gradient(90deg, #2a5298, #1e3c72)" },
                    }}
                >
                    Tải xuống báo cáo Excel
                </Button>
            </Paper>
        </Container>
    );
}
