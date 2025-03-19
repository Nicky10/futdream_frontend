import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Cambiar cuando se despliegue

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (user) => api.post("/auth/register", user);
export const login = async (user) => api.post("/auth/login", user);
export const getBookings = async (token) =>
  api.get("/bookings", { headers: { Authorization: `Bearer ${token}` } });

export const cancelBooking = async (id, token) =>
    api.delete(`/bookings/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const checkAvailability = async (date, serviceType, token) => {
    try {
      return await api.post("/bookings/check-availability", { date, serviceType }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Error en checkAvailability:", error.response?.data || error.message);
      throw error;
    }
  };
  
  export const createBooking = async ({ date, hour, serviceType }, token) => {
    try {
      return await api.post("/bookings", { date, hour, serviceType }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Error en createBooking:", error.response?.data || error.message);
      throw error;
    }
  };
  
  
