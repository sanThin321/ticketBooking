import { Armchair } from "lucide-react";
import agencyLogo from "../../assets/AgencyLogo.jpeg";

export const Ticket = ({ ticket }) => {
    // Format the departure and arrival times
    const departureTime = new Date(ticket?.departureTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  
    const arrivalTime = new Date(ticket?.arrivalTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  
  return (
    <div className="container border p-3 rounded mb-2">
      <div className="row">
        <div className="d-flex col-3 justify-content-center align-items-center">
          <img src={ticket?.agencyLogo} alt="agency logo" width={150} />
        </div>
        <div className="col-9 d-flex flex-column gap-3 justify-content-center">
          <h4>{ticket.agency}</h4>
          <div className="d-flex ">
            <div className="border-right">
              <h5 className="mb-2">Nu. {ticket.price}</h5>
              <div className="d-flex align-items-center gap-3 pe-5">
                <div className="border-right pe-4">
                  <p className="mb-0">
                    <small>{ticket.from}</small>
                  </p>
                  <h6>
                    <strong>{departureTime}</strong>
                  </h6>
                </div>

                <div className="ms-1">
                  <p className="mb-0">
                    <small>{ticket.to}</small>
                  </p>
                  <h6>
                    <strong>{arrivalTime}</strong>
                  </h6>
                </div>
              </div>
            </div>
            <div className="ps-3 d-flex gap-5 align-items-center">
              <div>
                <p className="mb-0">
                  <small>Total seats</small>
                </p>
                <p>
                  <strong className="me-2">{ticket.bus.totalSeat}</strong>
                  <Armchair color="#8DD3BB" size={20} />
                </p>
              </div>
              <div>
                <p className="mb-0">
                  <small>Available</small>
                </p>
                <p>
                  <strong className="me-2">{ticket.availableSeats}</strong>
                  <Armchair color="#8DD3BB" size={20} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
