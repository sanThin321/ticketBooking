import { Armchair, CalendarDays, ChevronRight, Minus } from "lucide-react";
import AgencyLogo from "../../assets/AgencyLogo.png";

export const PurchaseHistory = () => {
  return (
    <div className="px-0">
      <h3 className="mt-4">Tickets / Bookings</h3>
      <div className="my-3 mb-5 ">
        <div
          className="d-flex align-items-center justify-content-between px-3 py-3 mb-3 rounded"
          style={{ boxShadow: "0 4px 16px rgba(17, 34, 17, 0.05)" }}
        >
          <div className="d-flex align-items-center gap-3">
            <img src={AgencyLogo} alt="agency logo" />
            <div>
              <div
                className="d-flex align-items-center gap-3 pe-5"
                style={{ borderRight: "1.5px solid #8DD3BB" }}
              >
                <div>
                  <p>Thimphu</p>
                  <h6>
                    <strong>12:00 pm</strong>
                  </h6>
                </div>
                <Minus />{" "}
                <div>
                  <p>Phuentsholing</p>
                  <h6>
                    <strong>6:00pm</strong>
                  </h6>
                </div>
              </div>
            </div>

            <div className="d-flex gap-5 ms-4">
              <div className="d-flex gap-3">
                <div
                  className="rounded px-2 d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: "#EBF6F2" }}
                >
                  <CalendarDays color="#8DD3BB" />
                </div>
                <div>
                  <p className="mb-0">Date</p>
                  <p className="mb-0">
                    <strong>12-09-24</strong>
                  </p>
                </div>
              </div>

              <div className="d-flex gap-3">
                <div
                  className="rounded px-2 py-0 d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: "#EBF6F2" }}
                >
                  <Armchair color="#8DD3BB" />
                </div>
                <div>
                  <p className="mb-0">Seat No</p>
                  <p className="mb-0">
                    <strong>12</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex gap-3">
            <button className="btn" style={{ backgroundColor: "#8DD3BB" }}>
              Download Ticket
            </button>
            <button
              className="btn px-2"
              style={{ border: "1.5px solid #8DD3BB" }}
            >
              <ChevronRight />
            </button>
          </div>
        </div>


        <div
          className="d-flex align-items-center justify-content-between px-3 mb-3 py-3 rounded"
          style={{ boxShadow: "0 4px 16px rgba(17, 34, 17, 0.05)" }}
        >
          <div className="d-flex align-items-center gap-3">
            <img src={AgencyLogo} alt="agency logo" />
            <div>
              <div
                className="d-flex align-items-center gap-3 pe-5"
                style={{ borderRight: "1.5px solid #8DD3BB" }}
              >
                <div>
                  <p>Thimphu</p>
                  <h6>
                    <strong>12:00 pm</strong>
                  </h6>
                </div>
                <Minus />{" "}
                <div>
                  <p>Phuentsholing</p>
                  <h6>
                    <strong>6:00pm</strong>
                  </h6>
                </div>
              </div>
            </div>

            <div className="d-flex gap-5 ms-4">
              <div className="d-flex gap-3">
                <div
                  className="rounded px-2 d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: "#EBF6F2" }}
                >
                  <CalendarDays color="#8DD3BB" />
                </div>
                <div>
                  <p className="mb-0">Date</p>
                  <p className="mb-0">
                    <strong>12-09-24</strong>
                  </p>
                </div>
              </div>

              <div className="d-flex gap-3">
                <div
                  className="rounded px-2 py-0 d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: "#EBF6F2" }}
                >
                  <Armchair color="#8DD3BB" />
                </div>
                <div>
                  <p className="mb-0">Seat No</p>
                  <p className="mb-0">
                    <strong>12</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex gap-3">
            <button className="btn" style={{ backgroundColor: "#8DD3BB" }}>
              Download Ticket
            </button>
            <button
              className="btn px-2"
              style={{ border: "1.5px solid #8DD3BB" }}
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div
          className="d-flex align-items-center justify-content-between px-3 mb-3 py-3 rounded"
          style={{ boxShadow: "0 4px 16px rgba(17, 34, 17, 0.05)" }}
        >
          <div className="d-flex align-items-center gap-3">
            <img src={AgencyLogo} alt="agency logo" />
            <div>
              <div
                className="d-flex align-items-center gap-3 pe-5"
                style={{ borderRight: "1.5px solid #8DD3BB" }}
              >
                <div>
                  <p>Thimphu</p>
                  <h6>
                    <strong>12:00 pm</strong>
                  </h6>
                </div>
                <Minus />{" "}
                <div>
                  <p>Phuentsholing</p>
                  <h6>
                    <strong>6:00pm</strong>
                  </h6>
                </div>
              </div>
            </div>

            <div className="d-flex gap-5 ms-4">
              <div className="d-flex gap-3">
                <div
                  className="rounded px-2 d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: "#EBF6F2" }}
                >
                  <CalendarDays color="#8DD3BB" />
                </div>
                <div>
                  <p className="mb-0">Date</p>
                  <p className="mb-0">
                    <strong>12-09-24</strong>
                  </p>
                </div>
              </div>

              <div className="d-flex gap-3">
                <div
                  className="rounded px-2 py-0 d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: "#EBF6F2" }}
                >
                  <Armchair color="#8DD3BB" />
                </div>
                <div>
                  <p className="mb-0">Seat No</p>
                  <p className="mb-0">
                    <strong>12</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex gap-3">
            <button className="btn" style={{ backgroundColor: "#8DD3BB" }}>
              Download Ticket
            </button>
            <button
              className="btn px-2"
              style={{ border: "1.5px solid #8DD3BB" }}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
