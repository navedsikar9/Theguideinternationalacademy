import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import HomePage from "@/pages/HomePage";
import CoursesPage from "@/pages/CoursesPage";
import CourseDetailPage from "@/pages/CourseDetailPage";
import DirectorPage from "@/pages/DirectorPage";
import VerifyPage from "@/pages/VerifyPage";
import ContactPage from "@/pages/ContactPage";
import GalleryPage from "@/pages/GalleryPage";
import TestimonialsPage from "@/pages/TestimonialsPage";
import AboutPage from "@/pages/AboutPage";

import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import StudentsPage from "@/pages/admin/StudentsPage";
import CertificatesPage from "@/pages/admin/CertificatesPage";
import BulkImportPage from "@/pages/admin/BulkImportPage";
import CoursesAdminPage from "@/pages/admin/CoursesAdminPage";
import GalleryAdminPage from "@/pages/admin/GalleryAdminPage";
import TestimonialsAdminPage from "@/pages/admin/TestimonialsAdminPage";
import InquiriesAdminPage from "@/pages/admin/InquiriesAdminPage";
import SettingsAdminPage from "@/pages/admin/SettingsAdminPage";
import VerificationLogsPage from "@/pages/admin/VerificationLogsPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/courses/:slug" component={CourseDetailPage} />
      <Route path="/director" component={DirectorPage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/testimonials" component={TestimonialsPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/verify-certificate" component={VerifyPage} />

      <Route path="/admin/login" component={AdminLoginPage} />
      <Route path="/admin" component={DashboardPage} />
      <Route path="/admin/students" component={StudentsPage} />
      <Route path="/admin/certificates" component={CertificatesPage} />
      <Route path="/admin/bulk-import" component={BulkImportPage} />
      <Route path="/admin/courses" component={CoursesAdminPage} />
      <Route path="/admin/gallery" component={GalleryAdminPage} />
      <Route path="/admin/testimonials" component={TestimonialsAdminPage} />
      <Route path="/admin/inquiries" component={InquiriesAdminPage} />
      <Route path="/admin/settings" component={SettingsAdminPage} />
      <Route path="/admin/verification-logs" component={VerificationLogsPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
