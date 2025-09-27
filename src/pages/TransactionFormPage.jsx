import { useState, useEffect } from "react";
import { Container, Typography, TextField, MenuItem, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import Autocomplete from "@mui/material/Autocomplete";

const categories = ["Ăn uống", "Giải trí", "Học tập", "Di chuyển", "Khác"];

export default function TransactionFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ amount: "", category: "", type: "Expense", note: "" });
    const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        if (id) {
            axiosClient.get(`/Transactions/${id}`).then(res => setForm(res.data));
        }
    }, [id]);

    const validateForm = () => {
        if (form.amount <= 0) {
            setToast({ open: true, message: "Số tiền phải lớn hơn 0", severity: "error" });
            return false;
        }
        if (!form.category.trim()) {
            setToast({ open: true, message: "Danh mục không được để trống", severity: "error" });
            return false;
        }
        if (form.note.length > 200) {
            setToast({ open: true, message: "Ghi chú quá dài (tối đa 200 ký tự)", severity: "error" });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            if (id) await axiosClient.put(`/Transactions/${id}`, form);
            else await axiosClient.post("/Transactions", form);

            setToast({ open: true, message: "Lưu giao dịch thành công", severity: "success" });
            setTimeout(() => navigate("/transactions"), 1000);
        } catch (err) {
            setToast({ open: true, message: "Có lỗi xảy ra khi lưu", severity: "error" });
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 3 }}>
            <Typography variant="h5">{id ? "Cập nhật" : "Thêm"} giao dịch</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Số tiền"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={form.amount === null || isNaN(form.amount) ? "" : form.amount}
                    onChange={(e) => {
                        const value = e.target.value;
                        setForm({ ...form, amount: value === "" ? "" : parseFloat(value) });
                    }}
                />
                <TextField
                    select label="Loại" fullWidth margin="normal"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                    <MenuItem value="Income">Thu nhập</MenuItem>
                    <MenuItem value="Expense">Chi tiêu</MenuItem>
                </TextField>

                <Autocomplete
                    freeSolo
                    options={categories}
                    value={form.category}
                    onChange={(e, newValue) => setForm({ ...form, category: newValue || "" })}
                    onInputChange={(e, newInputValue) => setForm({ ...form, category: newInputValue })}
                    renderInput={(params) => (
                        <TextField {...params} label="Danh mục" margin="normal" fullWidth />
                    )}
                />

                <TextField
                    label="Ghi chú" fullWidth margin="normal"
                    value={form.note || ""}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                />
                <Button variant="contained" type="submit" sx={{ mt: 2 }}>Lưu</Button>
            </form>

            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity={toast.severity}>{toast.message}</Alert>
            </Snackbar>
        </Container>
    );
}
