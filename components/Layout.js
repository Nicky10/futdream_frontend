'use client'

import { useState, useContext } from 'react'
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { AuthContext } from '../context/AuthContext'
import Image from 'next/image'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Reservas', href: '/bookings' },
  { name: 'Instalaciones', href: '/instalaciones' },
  { name: 'Contacto', href: '/contacto' },
]

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, handleLogout } = useContext(AuthContext) // 🔹 Obtener usuario autenticado
  console.log("Usuario en el header:", user);
  return (
    <div className="flex flex-col min-h-screen">
      {/* NAVBAR - Sticky */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Reserva Deportiva</span>
              <img alt="Logo" src="/logo.svg" className="h-8 w-auto" />
            </a>
          </div>

          {/* Menú para móvil */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Abrir menú</span>
              <Bars3Icon className="size-6" />
            </button>
          </div>

          {/* Menú de navegación en desktop */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold text-gray-900">
                {item.name}
              </a>
            ))}
          </div>

          {/* 🔹 Menú de usuario con desplegable */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {user ? (
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="flex items-center text-sm font-semibold text-gray-900">
                  <Image
                    src="/user-avatar.png"
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full mr-2"
                  />
                  {user.firstName} {user.firstLastName}
                  <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-600" />
                </MenuButton>
                <MenuItems className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none">
                  <MenuItem>
                    {({ active }) => (
                      <a href="/profile" className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}>
                        Tu Perfil
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`block w-full text-left px-4 py-2 text-sm text-red-600 ${active ? 'bg-gray-100' : ''}`}
                      >
                        Cerrar Sesión
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
                <>
                    <a
                        href="/register"
                        className="text-sm font-semibold text-white bg-indigo-600 px-4 py-2 rounded-md border border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700 transition-all duration-200"
                    >
                        Registrarse <span aria-hidden="true">&rarr;</span>
                    </a>
                    
                    <a
                        href="/login"
                        className="text-sm font-semibold text-indigo-600 bg-white px-4 py-2 rounded-md border border-indigo-600 hover:bg-indigo-100 hover:border-indigo-700 transition-all duration-200 ml-4"
                    >
                        Iniciar Sesión <span aria-hidden="true">&rarr;</span>
                    </a>
                </>
              
            )}
          </div>
        </nav>

        {/* Menú móvil - aparece cuando se abre el botón hamburguesa */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Reserva Deportiva</span>
                <img alt="Logo" src="/logo.svg" className="h-8 w-auto" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Cerrar menú</span>
                <XMarkIcon className="size-6" />
              </button>
            </div>
            <div className="mt-6">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                  {item.name}
                </a>
              ))}
              {!user ? (
                <a href="/login" className="block px-3 py-2 mt-4 text-base font-semibold text-gray-900 hover:bg-gray-50">
                  Iniciar Sesión
                </a>
              ) : (
                <button
                  onClick={handleLogout}
                  className="block px-3 py-2 mt-4 text-base font-semibold text-red-600 hover:bg-gray-50 w-full text-left"
                >
                  Cerrar Sesión
                </button>
              )}
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Contenido de la Página */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="bg-gray-100 mt-14">
        <div className="mx-auto w-full max-w-screen-xl p-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Empresa</h2>
              <ul className="text-gray-600">
                <li className="mb-4"><a href="#" className="hover:underline">Sobre Nosotros</a></li>
                <li className="mb-4"><a href="#" className="hover:underline">Carreras</a></li>
                <li className="mb-4"><a href="#" className="hover:underline">Blog</a></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Soporte</h2>
              <ul className="text-gray-600">
                <li className="mb-4"><a href="#" className="hover:underline">Contacto</a></li>
                <li className="mb-4"><a href="#" className="hover:underline">Ayuda</a></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
              <ul className="text-gray-600">
                <li className="mb-4"><a href="#" className="hover:underline">Privacidad</a></li>
                <li className="mb-4"><a href="#" className="hover:underline">Términos</a></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Descargar App</h2>
              <ul className="text-gray-600">
                <li className="mb-4"><a href="#" className="hover:underline">iOS</a></li>
                <li className="mb-4"><a href="#" className="hover:underline">Android</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 mt-6">
            © 2025 Reserva Deportiva. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
