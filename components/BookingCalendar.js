import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { checkAvailability } from "../services/api";

export default function BookingCalendar({ setSelectedDate, setAvailableHours, serviceType }) {
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (date && serviceType) {
      setSelectedDate(date.toISOString().split("T")[0]); 
      fetchAvailableHours(date, serviceType);
    }
  }, [date, serviceType]);

  const fetchAvailableHours = async (selectedDate, selectedServiceType) => {
    try {
      const token = localStorage.getItem("token");
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const { data } = await checkAvailability(formattedDate, selectedServiceType, token);

      // Si no hay horas disponibles, limpiar el estado
      if (!data.hours || data.hours.length === 0) {
        setAvailableHours([]);
        return;
      }

      setAvailableHours(data.hours);
    } catch (error) {
      console.error("Error al obtener disponibilidad de horas:", error);
      setAvailableHours([]);
    }
  };

  return (
    <div className="p-6 border rounded">
      <h2 className="text-xl font-semibold mb-4">Calendario de Reservas</h2>
      <Calendar
        onChange={setDate}
        value={date}
      />
    </div>
  );
}
