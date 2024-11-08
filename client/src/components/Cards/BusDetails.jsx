import {
  Armchair,
  CalendarDays,
  ChevronRight,
  User,
} from "lucide-react";
import Bus from "../../assets/Bus.png";

export const BusDetails = () => {

  return (
    <div className="bg-white rounded py-3 px-4 mb-3 border">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-3">
          <div className="d-flex gap-3 pe-5 align-items-center">
            <div className="rounded-2" style={{ border: "1px solid #8DD3BB" }}>
              <img
                src={Bus}
                className="rounded mx-auto d-block"
                alt="bus default icons"
                width={100}
              />
            </div>
          </div>

          <div className="d-flex  gap-5 ms-3 pe-5">
            <div className="d-flex gap-3 align-items-center">
              <div
                className="p-2 rounded"
                style={{ backgroundColor: "#EBF6F2" }}
              >
                <CalendarDays color="#8DD3BB" size={25} />
              </div>
              <div className="d-flex flex-column">
                <p className="mb-0">
                  <small>Bus Number</small>
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
                  <small>Total Seats</small>
                </p>
                <p className="mb-0">24</p>
              </div>
            </div>

            <div className="d-flex gap-3 align-items-center">
              <div
                className="p-2 rounded"
                style={{ backgroundColor: "#EBF6F2" }}
              >
                <User color="#8DD3BB" size={25} />
              </div>
              <div className="d-flex flex-column">
                <p className="mb-0 fs-6">
                  <small>Driver</small>
                </p>
                <p className="mb-0">Pema</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            className="btn px-2"
            style={{ border: "1.5px solid #8DD3BB" }}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};
