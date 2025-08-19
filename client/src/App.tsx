import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";
import Home from "@/pages/home";
import Works from "@/pages/works";
import NotFound from "@/pages/not-found";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

function Router() {
  const [location] = useLocation();
  
  return (
    <div className="min-h-screen bg-bone-white relative">
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Switch location={location}>
            <Route path="/" component={Home} />
            <Route path="/works" component={Works} />
            <Route component={NotFound} />
          </Switch>
        </motion.div>
      </AnimatePresence>
      
      {/* Bottom blur effect */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-bone-white/80 via-bone-white/30 to-transparent backdrop-blur-xs pointer-events-none z-10"></div>
    </div>
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
