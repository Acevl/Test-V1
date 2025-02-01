import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";
import Home from "./pages/Home";
import Info from "./pages/Info";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div 
        className="min-h-screen bg-gray-50 flex flex-col overscroll-none"
        style={{ 
          overscrollBehavior: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <Header />
        <main className="flex-1 pt-16 pb-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </main>
        <Navigation />
        <Toaster />
      </div>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;