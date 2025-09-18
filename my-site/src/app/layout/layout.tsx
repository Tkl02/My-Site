import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { useTheme } from "@heroui/use-theme";
import { Rotas } from "../config/routes/routes";
import React from "react";

export const Layout: React.FC = () => {
    const {theme} = useTheme();

    React.useEffect(()=>{
        document.documentElement.classList.toggle('dark', theme === 'dark')
    },[theme])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow">
          <Rotas />
      </main>
      <Footer />
    </div>
  );
};
