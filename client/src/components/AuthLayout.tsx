import { type ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8">
        {/* Logo at top-left */}
        <div className="absolute top-8 left-8">
          <div className="flex items-center gap-3">
            <img src="logo-icon.svg" alt="HD Logo" className="w-8 h-8" />
            <span className="text-2xl font-bold text-gray-900">HD</span>
          </div>
        </div>
        
        {/* Centered form content */}
        <div className="w-full max-w-md mx-auto">
          {children}
        </div>
      </div>
      
      {/* Right Side Image (Desktop only) */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-1">
        <div className="w-full max-h-[98.5vh] aspect-square overflow-hidden rounded-3xl">
          <img
            src="auth-page-image.png"
            alt="Abstract blue waves"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;