import { useParams } from "react-router-dom";
import { AdminHeader } from "../../components/PageHeaders/AdminHeader";
import { Table } from "../../components/Table/Table";
import axios from "axios";
import { useEffect, useState } from "react";

export const SingleBookingDetails = () => {
  const { id } = useParams();

  const [details, setDetails] = useState();

  const getTicketDetails = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:4004/pelrizhabtho/agency/getticket/${id}`
      );

      if (res.status === 200) {
        setDetails(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Format the departure date and time
  const departureDateTime = new Date(details?.departureTime).toLocaleString(
    [],
    {
      year: "numeric", // Full year (e.g., 2024)
      hour: "2-digit", // Hour in 2-digit format
      minute: "2-digit", // Minute in 2-digit format
      month: "short", // Short month (e.g., Jan, Feb)
      day: "2-digit", // Day of the month (e.g., 11)

      hour12: true, // AM/PM format
    }
  );

  // Format the arrival date and time
  const arrivalDateTime = new Date(details?.arrivalTime).toLocaleString([], {
    year: "numeric", // Full year
    month: "short", // Short month
    day: "2-digit", // Day of the month
    hour: "2-digit", // Hour in 2-digit format
    minute: "2-digit", // Minute in 2-digit format
    hour12: true, // AM/PM format
  });

  useEffect(() => {
    getTicketDetails(id);
  }, [id]);

  return (
    <>
      <AdminHeader title="Bookings / Details" />
      <div className="container mb-3">
        <div className="row">
          <div className="col p-3 me-2 container-background-color rounded border">
            <p className="mb-0">Bus</p>
            <h4>{details?.bus.busNumber}</h4>
          </div>
          <div className="col ms-2 p-3 container-background-color rounded border">
            <p className="mb-0">Route</p>
            <h4>
              {details?.from} - {details?.to}
            </h4>
          </div>
        </div>
      </div>
      <div className="container bg-white p-3 rounded border">
       
        <div className="row">
          <div className="col">
            <p className="mb-0">Driver</p>
            <h5>{details?.bus.driverId.fullName}</h5>
          </div>
          <div className="col">
            <p className="mb-0">Price</p>
            <h5>Nu. {details?.price}</h5>
          </div>
         
            <div className="col">
            <p className="mb-0">Available Seats</p>
            <h5>{details?.availableSeats}</h5>
          </div>
        </div>

        <div className="row mt-3">
        <div className="col">
            <p className="mb-0">Total Seats</p>
            <h5>{details?.bus.totalSeat}</h5>
          </div> 
          <div className="col">
            <p className="mb-0">Depature Time</p>
            <h5>{departureDateTime}</h5>
          </div>
        
          <div className="col">
            <p className="mb-0">Arrival Time</p>
            <h5>{arrivalDateTime}</h5>
          </div>
          
        </div>
      </div>
      <div className="container pb-3">
        <div className="row my-3 bg-white p-3 border rounded">
          <h4 className="px-0">Passengers Details</h4>
          <Table data={details?.booked} />
        </div>
      </div>
    </>
  );
};
