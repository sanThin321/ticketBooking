import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../auth/auth";
import { toast } from "react-toastify";
import axios from "axios";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const { authorizationToken} = useAuth();
  const [tickets, setTickets] = useState([]);
  const [agencyMembers, setAgencyMembers] = useState([]);

  // get tickets
  const getTickets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4004/pelrizhabtho/getallticket",
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

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

  // get all members of agency

  const getAgencyMembers = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:4004/pelrizhabtho/allmembers/${id}`
      );

      if (res.status === 200) {
        setAgencyMembers(res.data.members);
      }

      console.log("Members: " + res.data)
    } catch (error) {
      console.error("Error fectching members. " + error.message);
    }
  };

  const refreshAgencyMembers = (id) => {
    getAgencyMembers(id);
  };

  return (
    <StoreContext.Provider
      value={{
        tickets,
        refreshTickets,
        agencyMembers,
        refreshAgencyMembers
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
