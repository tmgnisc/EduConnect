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
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminOrders from "./pages/admin/AdminOrders";

// Publisher Pages
import PublisherDashboard from "./pages/publisher/PublisherDashboard";
import PublisherBooks from "./pages/publisher/PublisherBooks";
import PublisherOrders from "./pages/publisher/PublisherOrders";
import PublisherSchools from "./pages/publisher/PublisherSchools.tsx";

// School Pages
import SchoolDashboard from "./pages/school/SchoolDashboard";
import SchoolBooks from "./pages/school/SchoolBooks";
import SchoolCart from "./pages/school/SchoolCart";
import SchoolOrders from "./pages/school/SchoolOrders";
import SchoolProgress from "./pages/school/SchoolProgress";
import SchoolActivities from "./pages/school/SchoolActivities";

// Settings
import Settings from "./pages/Settings";

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
              <Route path="users" element={<AdminUsers />} />
              <Route path="books" element={<AdminBooks />} />
              <Route path="orders" element={<AdminOrders />} />
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
              <Route path="books" element={<PublisherBooks />} />
              <Route path="orders" element={<PublisherOrders />} />
              <Route path="schools" element={<PublisherSchools />} />
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
              <Route path="books" element={<SchoolBooks />} />
              <Route path="cart" element={<SchoolCart />} />
              <Route path="orders" element={<SchoolOrders />} />
              <Route path="progress" element={<SchoolProgress />} />
              <Route path="activities" element={<SchoolActivities />} />
            </Route>

            {/* Settings Route (accessible by all authenticated users) */}
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
