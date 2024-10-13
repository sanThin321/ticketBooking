import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../auth/auth";
import { toast } from "react-toastify";
import axios from "axios";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const { authorizationToken } = useAuth();

  const [tickets, setTickets] = useState([]);

  // get tickets
  const getTickets = async () => {
    try {
      const response = await axios.get("http://localhost:4004/pelrizhabtho/getallticket", {
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.status === 200) {
        setTickets(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const refreshTickets = () => {
    getTickets();
  };

  return (
    <StoreContext.Provider
      value={{
        tickets,
        refreshTickets
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const StoreContextValue = useContext(StoreContext);
  if (!StoreContextValue) {
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return StoreContextValue;
};
