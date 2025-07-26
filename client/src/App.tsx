import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TextSizeEditor } from "@/components/text-size-editor";
import Home from "@/pages/home";
import Works from "@/pages/works";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/works" component={Works} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Load custom text sizes on app start
  useEffect(() => {
    const savedSizes = localStorage.getItem('textSizes');
    if (savedSizes) {
      const sizes = JSON.parse(savedSizes);
      
      // Hapus style lama jika ada
      const existingStyle = document.getElementById('custom-text-sizes');
      if (existingStyle) {
        existingStyle.remove();
      }

      // Buat style baru
      const style = document.createElement('style');
      style.id = 'custom-text-sizes';
      style.textContent = `
        .custom-hero-title { font-size: ${sizes.heroTitle} !important; }
        .custom-hero-subtitle { font-size: ${sizes.heroSubtitle} !important; }
        .custom-hero-stats { font-size: ${sizes.heroStats} !important; }
        .custom-button { font-size: ${sizes.button} !important; }
        .custom-accepting { font-size: ${sizes.accepting} !important; }
        .custom-project-title { font-size: ${sizes.projectTitle} !important; }
        .custom-project-desc { font-size: ${sizes.projectDesc} !important; }
        .custom-about-title { font-size: ${sizes.aboutTitle} !important; }
        .custom-about-text { font-size: ${sizes.aboutText} !important; }
        .custom-contact-title { font-size: ${sizes.contactTitle} !important; }
        .custom-contact-text { font-size: ${sizes.contactText} !important; }
      `;
      
      document.head.appendChild(style);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <TextSizeEditor />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
