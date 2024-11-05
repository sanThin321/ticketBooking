import { Armchair, CalendarDays, ChevronRight, Minus } from "lucide-react";
import Bus from "../../assets/Bus.png";
import { Link } from "react-router-dom";

export const AgencyBooking = () => {
  return (
    <div className="bg-white rounded border py-3 px-4 mb-3 hover">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-3">
          <div
            className="d-flex gap-3 pe-5 align-items-center"
            style={{ borderRight: "1px solid #D7E2EE" }}
          >
            <div className="rounded-2" style={{ border: "1px solid #8DD3BB" }}>
              <img
                src={Bus}
                className="rounded mx-auto d-block"
                alt="bus default icons"
                width={100}
              />
            </div>
            <div className="d-flex gap-3 align-items-center">
              <div>
                <p className="mb-0">
                  <small>Tsirang</small>
                </p>
                <h5 className="mb-0">11:00 am</h5>
              </div>
              <div>
                <Minus />
              </div>
              <div>
                <p className="mb-0">
                  <small>Thimphu</small>
                </p>
                <h5 className="mb-0">6:00 pm</h5>
              </div>
            </div>
          </div>

          <div
            className="d-flex gap-5 ms-3 pe-5"
          >
            <div className="d-flex gap-3 align-items-center">
              <div
                className="p-2 rounded"
                style={{ backgroundColor: "#EBF6F2" }}
              >
                <CalendarDays color="#8DD3BB" size={25} />
              </div>
              <div className="d-flex flex-column">
                <p className="mb-0">
                  <small>Date</small>
                </p>
                <p className="mb-0">12-08-2024</p>
              </div>
            </div>

            <div className="d-flex gap-3 align-items-center">
              <div
                className="p-2 rounded"
                style={{ backgroundColor: "#EBF6F2" }}
              >
                <Armchair color="#8DD3BB" size={25} />
              </div>
              <div className="d-flex flex-column">
                <p className="mb-0 fs-6">
                  <small>No. Seats</small>
                </p>
                <p className="mb-0">24</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Link to={`/agency/booking-sigle/3`}>
            <button
              className="btn px-2 hover"
              style={{ border: "1.5px solid #8DD3BB" }}
            >
              <ChevronRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
