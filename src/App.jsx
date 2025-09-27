import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import TransactionFormPage from "./pages/TransactionFormPage";
import ExportPage from "./pages/ExportPage";
import TransactionsListPage from "./pages/TransactionListPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><TransactionsListPage /></ProtectedRoute>} />
        <Route path="/transactions/new" element={<ProtectedRoute><TransactionFormPage /></ProtectedRoute>} />
        <Route path="/transactions/edit/:id" element={<ProtectedRoute><TransactionFormPage /></ProtectedRoute>} />
        <Route path="/export" element={<ProtectedRoute><ExportPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
