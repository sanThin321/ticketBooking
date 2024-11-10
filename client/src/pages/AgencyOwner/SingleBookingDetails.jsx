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
  const departureTime = new Date(details?.departureTime).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  );

  const arrivalTime = new Date(details?.arrivalTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const departureDate = new Date(details?.departureTime).toLocaleDateString(
    "en-GB"
  );

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
            <h3>{details?.bus.busNumber}</h3>
          </div>
          <div className="col ms-2 p-3 container-background-color rounded border">
            <p className="mb-0">Route</p>
            <h3>
              {details?.from} - {details?.to}
            </h3>
          </div>
        </div>
      </div>
      <div className="container bg-white p-3 rounded border">
        <div className="row">
          <div className="col">
            <p className="mb-0">Driver</p>
            <h3>{details?.bus.driverId.fullName}</h3>
          </div>
          <div className="col">
            <p className="mb-0">Date</p>
            <h3>{departureDate}</h3>
          </div>
          <div className="col">
            <p className="mb-0">Total Seats</p>
            <h3>{details?.bus.totalSeat}</h3>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <p className="mb-0">Depature Time</p>
            <h3>{departureTime}</h3>
          </div>
          <div className="col">
            <p className="mb-0">Arrival Time</p>
            <h3>{arrivalTime}</h3>
          </div>
          <div className="col">
            <p className="mb-0">Booked Seats</p>
            <h3>{details?.booked.length}</h3>
          </div>
        </div>
      </div>
      <div className="container pb-3">
        <div className="row my-3 bg-white p-3 border rounded">
          <h3 className="px-0">Passengers Details</h3>
          <Table />
        </div>
      </div>
    </>
  );
};
