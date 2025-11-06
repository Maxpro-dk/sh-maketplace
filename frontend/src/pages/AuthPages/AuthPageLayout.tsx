import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 lg:grid relative overflow-hidden">
          {/* Arrière-plan animé cohérent */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-600/20 to-pink-500/20 animate-pulse"></div>
          
          {/* Étoiles scintillantes */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white animate-twinkle"
                style={{
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                }}
              />
            ))}
          </div>

          {/* Formes géométriques animées */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-morph-1"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-morph-2"></div>

          <div className="relative flex items-center justify-center z-1 p-8">
            <GridShape />
            
            {/* Contenu cohérent avec la page de connexion */}
            <div className="flex flex-col items-center max-w-md text-center space-y-8">
              
              {/* Logo et nom */}
              <div className="space-y-6">
                <Link to="/" className="block group">
                  <div className="relative">
                    {/* Icône cohérente */}
                    <div className="relative w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl mb-6 mx-auto transform group-hover:scale-105 transition-all duration-500">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    
                    {/* Anneau pulsant cohérent */}
                    <div className="absolute inset-0 border-2 border-blue-400/50 rounded-2xl animate-ping"></div>
                  </div>

                  {/* Nom de l'application */}
                  <div className="space-y-3">
                    <h1 className="text-4xl font-bold text-white tracking-tight">
                      Marketplace
                    </h1>
                    <h1 className="text-4xl font-bold text-white tracking-tight">
                      Connectée
                    </h1>
                    
                    {/* Séparateur élégant */}
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-4"></div>
                    
                    <p className="text-lg text-blue-200 font-light tracking-wide mt-6">
                      Plateforme Décentralisée
                    </p>
                  </div>
                </Link>
              </div>

              {/* Éléments visuels cohérents */}
              <div className="relative w-72 h-40">
                {/* Cercles concentriques */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border border-blue-400/30 rounded-full animate-spin-slow"></div>
                  <div className="w-40 h-40 border border-purple-400/40 rounded-full animate-spin-slow reverse"></div>
                </div>
                
                {/* Points de connexion animés */}
                <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white rounded-full transform -translate-y-1/2 animate-pulse shadow-lg"></div>
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-y-1/2 animate-pulse delay-300 shadow-lg"></div>
                <div className="absolute top-1/2 left-3/4 w-4 h-4 bg-white rounded-full transform -translate-y-1/2 animate-pulse delay-600 shadow-lg"></div>

                {/* Ligne de connexion */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-blue-100/90 leading-relaxed text-base">
                  Une marketplace décentralisée et sécurisée pour vos transactions de biens d'occasion.
                </p>
                
                {/* Points clés */}
                <div className="flex justify-center gap-6 pt-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-200 text-sm font-medium">Sécurisé</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                    <span className="text-blue-200 text-sm font-medium">Transparent</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-600"></div>
                    <span className="text-blue-200 text-sm font-medium">Décentralisé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>

      {/* Styles CSS unifiés */}
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes morph-1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(10px, -10px) scale(1.1); }
        }
        @keyframes morph-2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-10px, 10px) scale(1.1); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-spin-slow { animation: spin-slow 40s linear infinite; }
        .animate-spin-slow.reverse { animation: spin-slow 35s linear infinite reverse; }
        .animate-morph-1 { animation: morph-1 10s ease-in-out infinite; }
        .animate-morph-2 { animation: morph-2 12s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}