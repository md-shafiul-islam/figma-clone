import { LoginForm } from "@/components/ui/Login/LoginForm";
import { GalleryVerticalEnd } from "lucide-react";
import React from "react";

const signUpIndexPage = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Sign In
        </a>
        <LoginForm />
      </div>
    </div>
  );
};

export default signUpIndexPage;
