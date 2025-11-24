import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";

// Landing Page
import Index from "./pages/Index";

// Auth Pages
import Login from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";
import PublisherRegister from "./pages/register/PublisherRegister";
import SchoolRegister from "./pages/register/SchoolRegister";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";

// Publisher Pages
import PublisherDashboard from "./pages/publisher/PublisherDashboard";

// School Pages
import SchoolDashboard from "./pages/school/SchoolDashboard";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RoleSelection />} />
            <Route path="/register/publisher" element={<PublisherRegister />} />
            <Route path="/register/school" element={<SchoolRegister />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
            </Route>

            {/* Publisher Routes */}
            <Route
              path="/publisher"
              element={
                <ProtectedRoute allowedRoles={["publisher"]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<PublisherDashboard />} />
            </Route>

            {/* School Routes */}
            <Route
              path="/school"
              element={
                <ProtectedRoute allowedRoles={["school"]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<SchoolDashboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
