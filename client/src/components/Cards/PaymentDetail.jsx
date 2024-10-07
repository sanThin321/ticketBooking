import { ChevronRight } from "lucide-react";
import UserImg from "../../assets/User.png";
import AgencyLogo from "../../assets/AgencyLogo.jpeg";

export const PaymentDetail = () => {
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
                src={UserImg}
                className="rounded mx-auto d-block"
                alt="driver default icons"
                width={100}
              />
            </div>
            <div>
              <h5 className="mb-0">Pema Dawa</h5>
            </div>
          </div>
          <div
            className="d-flex flex-column gap-2 ms-3 pe-5"
            style={{ borderRight: "1px solid #D7E2EE" }}
          >
            <div className="d-flex flex-column">
              <p className="mb-0">
                <small>Bus Number</small>
              </p>
              <p className="mb-0">BP-1-10777</p>
            </div>

            <div className="d-flex flex-column">
              <p className="mb-0 fs-6">
                <small>Amount</small>
              </p>
              <p className="mb-0">840</p>
            </div>
          </div>

          <div className="d-flex gap-3 pe-5 align-items-center ">
            <div className="rounded-2 p-1" style={{ border: "1px solid #8DD3BB" }}>
              <img
                src={AgencyLogo}
                className="rounded mx-auto d-block"
                alt="driver default icons"
                width={50}
              />
            </div>
            <div className="d-flex flex-column">
              <p className="mb-0">
                <small>Agency</small>
              </p>
              <p className="mb-0">Meto Transpor</p>
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
