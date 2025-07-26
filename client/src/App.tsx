import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Works from "@/pages/works";
import NotFound from "@/pages/not-found";

// ===== KONFIGURASI URUTAN SECTION =====
// INSTRUKSI PENGGUNAAN:
// 1. Untuk mengubah urutan: Pindahkan baris section ke posisi yang diinginkan
// 2. Untuk menghapus section: Hapus/comment baris yang tidak diinginkan
// 3. Section akan tampil sesuai urutan dari atas ke bawah
// 
// CONTOH:
// - Jika ingin FAQ muncul di atas, pindahkan ke urutan teratas
// - Jika tidak ingin menampilkan Testimonials, hapus/comment barisnya
// - Save file ini dan aplikasi akan otomatis update

export const SECTION_ORDER_CONFIG = [
  { id: "hero", name: "Hero Section", component: "HeroSection" },
  { id: "services", name: "Services", component: "ServicesSection" },  
  { id: "process", name: "Process", component: "ProcessSection" },
  { id: "winning-edge", name: "Winning Edge", component: "WinningEdgeSection" },
  { id: "hero-showcase", name: "Hero Showcase", component: "HeroSectionsShowcase" },
  { id: "testimonials", name: "Testimonials", component: "TestimonialsSection" },
  { id: "faq", name: "FAQ", component: "FAQSection" }
  
  // SECTION YANG TERSEDIA:
  // - HeroSection: Bagian utama dengan judul besar
  // - ServicesSection: Daftar layanan yang ditawarkan  
  // - ProcessSection: Alur kerja dengan 6 langkah
  // - WinningEdgeSection: Keunggulan kompetitif
  // - HeroSectionsShowcase: Showcase contoh hero section
  // - TestimonialsSection: Testimoni pelanggan
  // - FAQSection: Frequently Asked Questions
];
// ==========================================
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
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
