import { useState, useEffect } from "react";
import {
    Container,
    Grid,
    TextField,
    MenuItem,
    Button,
    Box,
    Paper,
    Typography,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import TransactionsTable from "../components/TransactionTable";

export default function TransactionListPage() {
    const [transactions, setTransactions] = useState([]);
    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        category: "",
        type: "",
        sort: "desc",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, value);
            });

            const res = await axiosClient.get(`/transactions/filter?${params.toString()}`);
            const formatted = Array.isArray(res.data)
                ? res.data.map((item, index) => ({
                    id: item.id || index,
                    createdAt: item.createdAt || item.Createdat || "",
                    amount: typeof item.amount === "number" ? item.amount : Number(item.amount) || 0,
                    category: item.category || "",
                    type: item.type || "",
                    note: item.note || "",
                }))
                : [];
            setTransactions(formatted);
        } catch (err) {
            console.error("API error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters]);

    const handleEdit = (t) => {
        navigate(`/transactions/edit/${t.id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Xóa giao dịch này?")) {
            try {
                await axiosClient.delete(`/transactions/${id}`);
                fetchData();
            } catch (err) {
                console.error("Delete error:", err);
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h4" fontWeight="bold">
                    📊 Danh sách giao dịch có lọc
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate("/transactions/new")}
                    sx={{
                        background: "linear-gradient(90deg, #1e3c72, #2a5298)",
                        "&:hover": { background: "linear-gradient(90deg, #2a5298, #1e3c72)" },
                    }}
                >
                    + Thêm giao dịch
                </Button>
            </Box>

            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            type="date"
                            label="Từ ngày"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={filters.startDate}
                            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            type="date"
                            label="Đến ngày"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={filters.endDate}
                            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            label="Danh mục"
                            fullWidth
                            placeholder="VD: Ăn uống, học tập..."
                            value={filters.category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField
                            select
                            label="Loại"
                            fullWidth
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        >
                            <MenuItem value="">Tất cả</MenuItem>
                            <MenuItem value="Income">Thu nhập</MenuItem>
                            <MenuItem value="Expense">Chi tiêu</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={1} display="flex" alignItems="center">
                        <Button
                            variant="contained"
                            fullWidth
                            color="primary"
                            onClick={fetchData}
                            startIcon={<FilterAltIcon />}
                        >
                            Lọc
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <TransactionsTable
                transactions={transactions}
                onEdit={handleEdit}
                onDelete={(id) => handleDelete(id)}
            />
        </Container>
    );
}