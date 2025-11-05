import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Loader2, User, Mail, MapPin, CheckCircle, Edit } from 'lucide-react'
import { toast } from 'sonner'
import { contractAddress } from '../lib/wagmi'
import ABI from '@/lib/contract_abi'

interface UserData {
  name: string
  email: string
  location: string
  status: boolean
}

// Composant Modal réutilisable
function Modal({ isOpen, onClose, className, children }: { 
  isOpen: boolean; 
  onClose: () => void; 
  className?: string;
  children: React.ReactNode 
}) {
  if (!isOpen) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={className}>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default function UserProfilePage() {
  const { address } = useAccount()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    location: '',
    status: false
  })

  const { data: storedUserData, refetch: refetchUser } = useReadContract({
    address: contractAddress,
    abi: ABI,
    functionName: 'getUser',
    args: [address],
  })

  const { writeContract, isPending, data: hash } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (storedUserData && Array.isArray(storedUserData) && storedUserData.length >= 4) {
      const [name, email, location, status] = storedUserData
      setUserData({
        name: name || '',
        email: email || '',
        location: location || '',
        status: status as boolean
      })
    }
  }, [storedUserData])

  useEffect(() => {
    if (isConfirmed) {
      toast.success('Profil mis à jour avec succès!')
      refetchUser()
      setIsEditing(false)
      setIsModalOpen(false)
    }
  }, [isConfirmed, refetchUser])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    setIsEditing(false)
  }

  const handleRegisterUser = () => {
    if (!userData.name || !userData.email || !userData.location) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    writeContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'registerUser',
      args: [userData.name, userData.email, userData.location],
    })
  }

  const handleUpdateUser = () => {
    if (!userData.name || !userData.email || !userData.location) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    writeContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'registerUser',
      args: [userData.name, userData.email, userData.location],
    })
  }

  const isLoading = isPending || isConfirming

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* En-tête du profil */}
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-gray-800">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
              <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                {userData.name ? (
                  <span className="text-2xl font-bold text-white">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                ) : (
                  <User className="h-8 w-8 text-white" />
                )}
              </div>
              <div className="order-3 xl:order-2">
                <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                  {userData.name || 'Utilisateur Non Enregistré'}
                </h4>
                <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {userData.status ? 'Membre Verifié' : 'Profil à Compléter'}
                  </p>
                  <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {userData.location || 'Localisation non définie'}
                  </p>
                </div>
              </div>
              <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
                {/* Social Links - Optionnel pour l'instant */}
                <div className="flex items-center gap-2">
                  <button className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                    <Mail className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={openModal}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              <Edit className="h-4 w-4" />
              {userData.status ? 'Modifier' : 'Compléter le Profil'}
            </button>
          </div>
        </div>

        {/* Informations Personnelles */}
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-gray-800">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                Informations Personnelles
              </h4>

              {userData.status ? (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Nom Complet
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {userData.name}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {userData.email}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Téléphone
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      Non défini
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Localisation
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {userData.location}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Statut
                    </p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">
                        Profil vérifié sur la blockchain
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 text-amber-800 dark:text-amber-200">
                      <div className="flex-1">
                        <h5 className="font-semibold mb-2">Profil Incomplet</h5>
                        <p className="text-sm">
                          Complétez votre profil pour pouvoir interagir avec le marketplace et ajouter des biens.
                        </p>
                      </div>
                      <Button
                        onClick={openModal}
                        className="bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        Compléter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <button
              onClick={openModal}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              <Edit className="h-4 w-4" />
              {userData.status ? 'Modifier' : 'Compléter'}
            </button>
          </div>
        </div>

        {/* Informations Wallet */}
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-gray-800">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
            Informations Wallet
          </h4>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Adresse Wallet
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90 font-mono">
                {address ? `${address.slice(0, 8)}...${address.slice(-6)}` : 'Non connecté'}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Statut Blockchain
              </p>
              <div className="flex items-center gap-2">
                {userData.status ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      Enregistré sur la blockchain
                    </p>
                  </>
                ) : (
                  <>
                    <Loader2 className="h-4 w-4 text-amber-500" />
                    <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                      Non enregistré
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'édition */}
      <Modal isOpen={isModalOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {userData.status ? 'Modifier le Profil' : 'Compléter votre Profil'}
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              {userData.status 
                ? 'Mettez à jour vos informations pour garder votre profil à jour.'
                : 'Complétez votre profil pour pouvoir ajouter des biens au marketplace.'
              }
            </p>
          </div>
          
          <div className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              {!userData.status && (
                <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 mb-6">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 text-amber-800 dark:text-amber-200">
                      <div>
                        <h5 className="font-semibold mb-1">Profil Requis</h5>
                        <p className="text-sm">
                          Vous devez compléter votre profil pour pouvoir interagir avec le marketplace.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-6">
                <h5 className="text-lg font-medium text-gray-800 dark:text-white/90">
                  Informations Personnelles
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label htmlFor="modal-name">Nom Complet *</Label>
                    <Input
                      id="modal-name"
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      placeholder="Votre nom complet"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label htmlFor="modal-email">Email *</Label>
                    <Input
                      id="modal-email"
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      placeholder="votre@email.com"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label htmlFor="modal-location">Localisation *</Label>
                    <Input
                      id="modal-location"
                      type="text"
                      value={userData.location}
                      onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                      placeholder="Ville, Pays"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label htmlFor="modal-phone">Téléphone</Label>
                    <Input
                      id="modal-phone"
                      type="text"
                      placeholder="+33 1 23 45 67 89"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="modal-bio">Bio</Label>
                    <Input
                      id="modal-bio"
                      type="text"
                      placeholder="Décrivez-vous en quelques mots..."
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={closeModal}
                disabled={isLoading}
              >
                Annuler
              </Button>
              <Button 
                size="sm" 
                onClick={userData.status ? handleUpdateUser : handleRegisterUser}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                {userData.status ? 'Mettre à jour' : 'Enregistrer le profil'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}