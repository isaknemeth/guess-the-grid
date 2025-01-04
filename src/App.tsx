import { ThemeProvider } from "@/hooks/use-theme";
import Index from "@/pages/Index";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="powerguess-theme">
      <Index />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;