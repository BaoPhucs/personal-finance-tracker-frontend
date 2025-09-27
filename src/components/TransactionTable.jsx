import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    Chip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { formatDate } from "../utils/utils";

export default function TransactionTable({ transactions, onEdit, onDelete }) {
    return (
        <TableContainer
            component={Paper}
            sx={{ mt: 2, borderRadius: 3, boxShadow: 3, overflow: "hidden" }}
        >
            <Table>
                <TableHead sx={{ backgroundColor: "#1976d2" }}>
                    <TableRow>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Ngày</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Loại</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Danh mục</TableCell>
                        <TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>
                            Số tiền (VND)
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Ghi chú</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Hành động</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {transactions.map((t) => (
                        <TableRow
                            key={t.id}
                            sx={{
                                "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.1)" },
                            }}
                        >
                            <TableCell>{formatDate(t.createdAt)}</TableCell>
                            <TableCell>
                                <Chip
                                    label={t.type}
                                    color={t.type === "Income" ? "success" : "error"}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>{t.category}</TableCell>
                            <TableCell align="right">{t.amount.toLocaleString()}</TableCell>
                            <TableCell>{t.note}</TableCell>
                            <TableCell>
                                <Tooltip title="Chỉnh sửa">
                                    <IconButton color="primary" onClick={() => onEdit(t)}>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Xóa">
                                    <IconButton color="error" onClick={() => onDelete(t.id)}>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
