import {createContext, useEffect, useState} from "react";
import axiosInstance from "../utils/axiosInstance";

export const AttendantContext = createContext();

export function AttendantProvider({children}) {
  const [attendants, setAttendants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  // Fetch all attendants from backend
  const getAllAttendants = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/invitados");
      setAttendants(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAttendants();
  }, []);

  const confirmedAttendants = attendants.filter(
    (attendant) => !!attendant.completed
  ).length;
  const totalAttendants = attendants.length;
  const searchedAttendants = attendants.filter(
    (attendant) =>
      typeof attendant.name === "string" &&
      attendant.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  // Add new attendant
  const addAttendant = async (name) => {
    try {
      const response = await axiosInstance.post("/api/invitados", {name});
      setAttendants((prev) => [...prev, response.data.invitado]);
    } catch (err) {
      setError(err);
    }
  };

  // Confirm attendance for an attendant
  const confirmAttendance = async (id) => {
    try {
      const response = await axiosInstance.patch(
        `/api/invitados/${id}/confirmar`
      );
      setAttendants((prev) =>
        prev.map((att) => (att._id === id ? response.data.invitado : att))
      );
    } catch (err) {
      setError(err);
    }
  };

  return (
    <AttendantContext.Provider
      value={{
        attendants,
        loading,
        error,
        getAllAttendants,
        addAttendant,
        confirmAttendance,
        searchValue,
        setSearchValue,
        searchedAttendants,
        confirmedAttendants,
        totalAttendants,
      }}>
      {children}
    </AttendantContext.Provider>
  );
}
