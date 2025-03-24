
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-md mx-auto animate-fade-in">
          <h1 className="text-7xl font-bold mb-4 text-primary">404</h1>
          <p className="text-xl text-foreground mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Button asChild className="transition-all-200">
            <a href="/">Return Home</a>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
