import { ThemeProvider } from "@/hooks/use-theme";
import Index from "@/pages/Index";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthWrapper from "@/components/auth/AuthWrapper";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="powerguess-theme">
      <Router>
        <AuthWrapper>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </AuthWrapper>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;