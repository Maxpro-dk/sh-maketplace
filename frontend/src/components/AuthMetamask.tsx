import {useEffect, useState} from 'react'
import { useAccount, useConnect, useDisconnect, useReadContract} from 'wagmi'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import {useNavigate} from "react-router"

export default function AuthMetamask() {
    const navigate = useNavigate();
    const { isConnected } = useAccount()
    const { connect, connectors, isPending } = useConnect()
    const [selectedConnector, setSelectedConnector] = useState<string | null>(null)

    useEffect(() => {
        if(isConnected){
            navigate('/')
        }
    }, [isConnected]);

    const handleConnect = (connector: any) => {
        setSelectedConnector(connector.uid)
        connect({ connector })
    }

    return (
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl overflow-hidden relative">
            {/* Effet de lueur cohérent */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-30"></div>
            
            {/* Points lumineux aux coins */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-400 rounded-full blur-sm"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full blur-sm"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-400 rounded-full blur-sm"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full blur-sm"></div>
            
            <CardHeader className="text-center pt-8 pb-6 relative">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform transition-transform duration-300 hover:scale-110">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
                </div>
              </div>
              
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-700 bg-clip-text text-transparent">
                Connexion
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2 text-base">
                Sécurisez votre accès avec votre wallet
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pb-8 px-6 relative">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Connexion 100% sécurisée</span>
              </div>

              {connectors.map((connector) => (
                <Button
                  key={connector.uid}
                  onClick={() => handleConnect(connector)}
                  disabled={isPending}
                  className="w-full group relative overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-blue-300 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                  size="lg"
                  variant="outline"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  
                  {/* Loader amélioré */}
                  {isPending && selectedConnector === connector.uid && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm font-medium text-gray-700">Connexion...</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center w-full relative z-20">
                    <div className="flex items-center justify-center w-6 h-6 mr-3 bg-gray-100 group-hover:bg-blue-100 rounded-lg transition-colors">
                      {connector.name.toLowerCase().includes('meta') ? (
                        <svg className="w-4 h-4 text-[#f6851b]" viewBox="0 0 40 37" fill="none">
                          <path d="M36.0114 1.33333L24.1208 12.5219L27.0382 5.90476L36.0114 1.33333Z" fill="#E17726"/>
                          <path d="M4.00293 1.33333L15.6701 12.6667L13.0454 5.90476L4.00293 1.33333Z" fill="#E27625"/>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      )}
                    </div>
                    
                    <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors flex-1 text-left">
                      {isPending ? 'Connexion...' : `Se connecter avec ${connector.name}`}
                    </span>
                    
                    {!isPending && (
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                </Button>
              ))}

              <div className="text-center mt-6 pt-4 border-t border-gray-200/50">
                <p className="text-xs text-gray-500">
                  En vous connectant, vous acceptez nos{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium underline transition-colors">
                    conditions d'utilisation
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer cohérent */}
          <div className="text-center mt-6">
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/40 shadow-lg">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Sécurisé</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Crypté</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Rapide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}







// import {useEffect, useState} from 'react'
// import { useAccount, useConnect, useDisconnect ,   useReadContract} from 'wagmi'
// import { Button } from './ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
// import {useNavigate} from "react-router";


// export default function AuthMetamask() {
//     const navigate = useNavigate();

//   const {  isConnected } = useAccount()
//   const { connect, connectors, isPending } = useConnect()

//     useEffect(() => {
//         if(isConnected){
//             navigate('/')
//         }
//     }, [isConnected]);



//     return (
//       <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="w-full max-w-md">
//           <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
            
//             <CardHeader className="text-center pt-8 pb-6 relative">
//               <div className="flex justify-center mb-4">
//                 <div className="relative">
//                   <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
//                     <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                     </svg>
//                   </div>
//                   <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
//                 </div>
//               </div>
              
//               <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
//                 Marketplace Connectée
//               </CardTitle>
//               <CardDescription className="text-gray-600 mt-2 text-base">
//                 Sécurisez votre accès avec votre wallet
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-4 pb-8 px-6 relative">
//               <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
//                 <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                 </svg>
//                 <span>Connexion 100% sécurisée</span>
//               </div>

//               {connectors.map((connector) => (
//                 <Button
//                   key={connector.uid}
//                   onClick={() => connect({ connector })}
//                   disabled={isPending}
//                   className="w-full group relative overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-blue-300 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                   size="lg"
//                   variant="outline"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  
//                   <div className="flex items-center justify-center w-6 h-6 mr-3 bg-gray-100 group-hover:bg-blue-100 rounded-lg transition-colors">
//                     <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//                     </svg>
//                   </div>
                  
//                   <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
//                     {isPending ? 'Connexion...' : `Se connecter avec ${connector.name}`}
//                   </span>
                  
//                   {isPending && (
//                     <div className="absolute right-4">
//                       <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                     </div>
//                   )}
//                 </Button>
//               ))}

//               <div className="text-center mt-6 pt-4 border-t border-gray-200/50">
//                 <p className="text-xs text-gray-500">
//                   En vous connectant, vous acceptez nos{" "}
//                   <a href="#" className="text-blue-600 hover:text-blue-700 font-medium underline transition-colors">
//                     conditions d'utilisation
//                   </a>
//                 </p>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="text-center mt-6">
//             <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
//               <div className="flex items-center gap-1">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                 </svg>
//                 <span>Sécurisé</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                 </svg>
//                 <span>Crypté</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//                 <span>Rapide</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
// }