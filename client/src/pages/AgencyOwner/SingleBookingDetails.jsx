import { AdminHeader } from "../../components/PageHeaders/AdminHeader";
import { Table } from "../../components/Table/Table";
export const SingleBookingDetails = () => {
  return (
    <>
      <AdminHeader title="Bookings / Details" />
      <div className="container my-3 pb-5">
        <div className="row container-background-color rounded py-3">
          <div className="col-4">
            <p>
              <strong>Agency: </strong>
              <span>Meto Transport</span>
            </p>
            <p>
              <strong>Agency: </strong>
              <span>Meto Transport</span>
            </p>
            <p>
              <strong>Agency: </strong>
              <span>Meto Transport</span>
            </p>
            <p>
              <strong>Agency: </strong>
              <span>Meto Transport</span>
            </p>
          </div>
          <div className="col-4"></div>
          <div className="col-4"></div>
        </div>

        <div className="row my-3 bg-white p-3 container-shadow rounded">
          <h5 className="px-0">Passengers Details</h5>
          <Table />
        </div>
      </div>
    </>
  );
};
