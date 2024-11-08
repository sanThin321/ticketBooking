import { AdminHeader } from "../../components/PageHeaders/AdminHeader";
import { Table } from "../../components/Table/Table";
export const SingleBookingDetails = () => {
  return (
    <>
      <AdminHeader title="Bookings / Details" />
      <div className="container mb-3">
        <div className="row">
          <div className="col p-3 me-2 container-background-color rounded border">
            <p className="mb-0">Bus</p>
            <h3>Meto Transport</h3>
          </div>
          <div className="col ms-2 p-3 container-background-color rounded border">
            <p className="mb-0">Route</p>
            <h3>Thimphu - Phuntsholing</h3>
          </div>
        </div>
      </div>
      <div className="container bg-white p-3 rounded border">
        <div className="row">
          <div className="col">
            <p className="mb-0">Driver</p>
            <h3>Pema Dorji</h3>
          </div>
          <div className="col">
            <p className="mb-0">Date</p>
            <h3>01-03-2024</h3>
          </div>
          <div className="col">
            <p className="mb-0">Total Seats</p>
            <h3>24</h3>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <p className="mb-0">Depature Time</p>
            <h3>11:00 am</h3>
          </div>
          <div className="col">
            <p className="mb-0">Arrival Time</p>
            <h3>5:00 pm</h3>
          </div>
          <div className="col">
            <p className="mb-0">Booked Seats</p>
            <h3>20</h3>
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
