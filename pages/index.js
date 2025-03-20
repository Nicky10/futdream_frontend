import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Inicio', href: '#' },
  { name: 'Reservas', href: '#' },
  { name: 'Instalaciones', href: '#' },
  { name: 'Contacto', href: '#' },
]

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
    <div className="bg-white">
      

      {/* HERO SECTION */}
      <div className="relative isolate px-6 pt-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center py-24">
          <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl">
            Reserva tu cancha y juega sin límites
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Alquila tu espacio para fútbol, pádel y bolos en segundos. 
            Disfruta de instalaciones premium y reserva fácil desde cualquier dispositivo.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-indigo-500"
            >
              Reservar Ahora
            </a>
            <a href="#" className="text-lg font-semibold text-gray-900">
              Ver Instalaciones →
            </a>
          </div>
        </div>

        {/* GRID DE SERVICIOS */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg">
            <img src="/futbol.jpg" alt="Fútbol" className="h-40 w-full object-cover rounded-md" />
            <h3 className="mt-4 text-xl font-semibold">Fútbol</h3>
            <p className="mt-2 text-gray-600 text-center">
              Reserva canchas de fútbol 5 y 11 con césped de alta calidad.
            </p>
            <a href="#" className="mt-4 text-indigo-600 font-semibold hover:underline">
              Ver más →
            </a>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg">
            <img src="/padel.jpg" alt="Pádel" className="h-40 w-full object-cover rounded-md" />
            <h3 className="mt-4 text-xl font-semibold">Pádel</h3>
            <p className="mt-2 text-gray-600 text-center">
              Juega en nuestras modernas canchas de pádel techadas.
            </p>
            <a href="#" className="mt-4 text-indigo-600 font-semibold hover:underline">
              Ver más →
            </a>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg">
            <img src="/bolos.jpg" alt="Bolos" className="h-40 w-full object-cover rounded-md" />
            <h3 className="mt-4 text-xl font-semibold">Bolos</h3>
            <p className="mt-2 text-gray-600 text-center">
              Disfruta una partida con amigos en nuestras pistas profesionales.
            </p>
            <a href="#" className="mt-4 text-indigo-600 font-semibold hover:underline">
              Ver más →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
  }
  