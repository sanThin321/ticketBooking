import { ChevronRight, Mail, Phone } from "lucide-react";
import Driver from "../../assets/Driver.png";
export const UserDetail = () => {
  return (
    <div className="bg-white rounded container-shadow py-3 px-4 mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-3">
          <div
            className="d-flex gap-3 pe-5 align-items-center"
            style={{ borderRight: "1px solid #D7E2EE" }}
          >
            <div className="rounded-2" style={{ border: "1px solid #8DD3BB" }}>
              <img
                src={Driver}
                className="rounded mx-auto d-block"
                alt="driver default icons"
                width={100}
              />
            </div>
            <div>
              <h5 className="mb-0">Pema Dawa</h5>
              <p>user</p>
            </div>
          </div>
          <div className="d-flex flex-column gap-2 ms-3">
            <div className="d-flex gap-3 align-items-center">
              <div
                className="p-2 rounded"
                style={{ backgroundColor: "#EBF6F2" }}
              >
                <Phone color="#8DD3BB" size={25} />
              </div>
              <div className="d-flex flex-column">
                <p className="mb-0"><small>Contact No</small></p>
                <p className="mb-0">17353725</p>
              </div>
            </div>

            <div className="d-flex gap-3 align-items-center">
              <div
                className="p-2 rounded"
                style={{ backgroundColor: "#EBF6F2" }}
              >
                <Mail color="#8DD3BB" size={25} />
              </div>
              <div className="d-flex flex-column">
                <p className="mb-0 fs-6"><small>Email</small></p>
                <p className="mb-0">dorji@gmail.com</p>
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
