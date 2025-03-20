import { useEffect, useState, useContext } from "react";
import { getBookings, createBooking } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";
import BookingCalendar from "../components/BookingCalendar";
import PrivateRoute from "../components/PrivateRoute";

export default function BookingsPage() {
  const { user, loading } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);
  const [serviceType, setServiceType] = useState(""); // 🔹 No se selecciona un servicio por defecto

  const formattedServiceType = serviceType
                  .replace("_", " ") // Reemplaza "_" con " "
                  .split(" ") // Divide en palabras
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza cada palabra
                  .join(" "); // Une las palabras nuevamente

  useEffect(() => {
    console.log("Usuario en BookingsPage:", user);
    console.log("Cargando usuario en BookingsPage:", loading);
    if (loading || !user) return; // 🟢 Solo ejecuta si el usuario ya está autenticado

    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const { data } = await getBookings(token);
        setBookings(data);
      } catch (error) {
        console.error("Error al obtener reservas", error);
      }
    };

    fetchBookings();
  }, [user, loading]); // ⚡ Se ejecuta cuando el usuario se actualiza

  const handleServiceChange = (e) => {
    const newServiceType = e.target.value;
    setServiceType(newServiceType);
    setSelectedDate(null); // 🔹 Reiniciar la fecha seleccionada al cambiar de servicio
    setAvailableHours([]); // 🔹 Limpiar horarios disponibles
    setSelectedHour(null); // 🔹 Limpiar la hora seleccionada
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedHour || !serviceType) {
      alert("Por favor, selecciona un servicio, una fecha y una hora.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await createBooking({ date: selectedDate, hour: selectedHour, serviceType }, token);
      alert("Reserva creada exitosamente!");
      window.location.reload();
    } catch (error) {
      console.error("Error al crear reserva:", error);
      alert("No se pudo crear la reserva.");
    }
  };

  return (
    <PrivateRoute>
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reservas</h1>
      </div>

      {user ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Bienvenido a la seccion de Reservas, {user.firstName} {user.firstLastName}.</h2>

          {/* Selección de tipo de servicio */}
          <label className="block text-sm font-medium mb-1">Por favor selecciona el servicio que deseas reservar:</label>
          <select 
            value={serviceType} 
            onChange={handleServiceChange} 
            className="w-full p-2 border rounded mt-2"
          >
            <option value="">-- Selecciona un servicio --</option>
            <option value="futbol_5">Fútbol 5</option>
            <option value="futbol_11">Fútbol 11</option>
            <option value="padel">Pádel</option>
            <option value="bolos">Bolos</option>
          </select>

          {/* Renderizar solo si se ha seleccionado un servicio */}
          {serviceType && (
            <>
              {/* Calendario interactivo */}
              <div className="mb-6 mt-4">
                <BookingCalendar 
                  setSelectedDate={setSelectedDate} 
                  setAvailableHours={setAvailableHours} 
                  serviceType={serviceType} 
                />
              </div>

              {/* Selección de horario */}
              {availableHours.length > 0 ? (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Selecciona una hora:</h3>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {availableHours.map((hour) => (
                      <button
                        key={hour}
                        className={`px-4 py-2 border rounded ${selectedHour === hour ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                        onClick={() => setSelectedHour(hour)}
                      >
                        {hour}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 mt-4">No hay horarios disponibles.</p>
              )}

              <button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedHour || !serviceType}
                className={`mt-4 bg-green-600 text-white px-4 py-2 rounded ${(!selectedDate || !selectedHour || !serviceType) && "opacity-50 cursor-not-allowed"}`}
              >
                Reservar una hora de {formattedServiceType} {selectedDate ? ` para la fecha ${selectedDate}` : ""}  {selectedHour ? `a las ${selectedHour}` : ""}
              </button>
            </>
          )}

          <h2 className="text-2xl font-semibold mt-6">Mis Reservas</h2>

          {bookings.length ? (
            <ul className="mt-4">
              {bookings.map((b) => {
                // Convertir la fecha en formato legible (DD/MM/YYYY)
                const formattedDate = new Date(b.date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                });

                // Convertir serviceType a formato de texto capitalizado
                return (
                  <li key={b.id} className="flex justify-between bg-gray-100 p-4 rounded mb-2">
                    Reserva de {formattedServiceType}: {formattedDate} - {b.hour} hs - {b.status}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500 mt-4">No tienes reservas.</p>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600">Inicia sesión para ver tus reservas.</p>
      )}
    </div>
    </PrivateRoute>
  );
}
