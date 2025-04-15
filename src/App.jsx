import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import IncidentReport from "./pages/IncidentReport";
import HealthMonitoring from "./pages/HealthMonitoring";
import PerformanceAnalytics from "./pages/PerformanceAnalytics";
import NotFound from "./pages/NotFound";
import Overview from "./pages/overviewpage";
import Feeds from "./pages/Feeds";
import SettingsPage from "./pages/SettingsPage";

import "./style.css";
import LoginPage from "./pages/login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="/" element={<Layout />}>
            {/* <Route index element={<IncidentReport />} /> */}
            {/* <Route path="/health-monitoring" element={<HealthMonitoring />} /> */}
            <Route path="/overview" element={<Overview />} />
            <Route path="/incident-report" element={<IncidentReport />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/feed" element={<Feeds />} />
            <Route path="performance" element={<PerformanceAnalytics />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
