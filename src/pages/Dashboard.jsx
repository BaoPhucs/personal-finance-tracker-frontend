import { useEffect, useState } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import axiosClient from "../api/axiosClient";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9c27b0"];

export default function DashboardPage() {
    const [monthly, setMonthly] = useState([]);
    const [categories, setCategories] = useState([]);
    const year = new Date().getFullYear();

    useEffect(() => {
        axiosClient.get(`/Dashboard/monthly?year=${year}`).then(r => setMonthly(r.data));
        axiosClient.get(`/Dashboard/categories?year=${year}&type=Expense`).then(r => setCategories(r.data));
    }, []);

    return (
        <Container sx={{ mt: 3, mb: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                Dashboard - {year}
            </Typography>

            <Box sx={{ mb: 5 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Thu nhập / Chi tiêu theo tháng
                </Typography>
                <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthly}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="income" fill="#4caf50" name="Thu nhập" />
                            <Bar dataKey="expense" fill="#f44336" name="Chi tiêu" />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            </Box>

            <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Chi tiêu theo danh mục
                </Typography>
                <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 3, display: "flex", justifyContent: "center" }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={categories} dataKey="total" nameKey="category" outerRadius={120} label>
                                {categories.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" />
                        </PieChart>
                    </ResponsiveContainer>
                </Paper>
            </Box>
        </Container>
    );
}
