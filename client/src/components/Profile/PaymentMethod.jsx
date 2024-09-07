import { CirclePlus } from "lucide-react";
import Visa from "../../assets/Visa.png";
export const PaymentMethod = () => {
  return (
    <div className="px-0">
      <h3 className="mt-4">Payment methods</h3>
      <div
        className="d-flex flex-row gap-4 my-3 mb-5 p-3"
        style={{ boxShadow: "0 4px 16px rgba(17, 34, 17, 0.05)" }}
      >
        <div
          className="card"
          style={{ width: "18rem", backgroundColor: "#8DD3BB" }}
        >
          <div className="card-body d-flex flex-column gap-4">
            <div>
              <h5 className="card-title">Purna Bahadur Rana</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                123 456 6789 8890
              </h6>
            </div>
            <div>
              <img src={Visa} alt="visa logo" width={150} />
            </div>
          </div>
        </div>

        <div
          className="card"
          style={{
            width: "18rem",
            border: "2px dashed #8DD3BB", 
            cursor: "pointer"
          }}
        >
          <div className="card-body d-flex justify-content-center align-items-center gap-4">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <CirclePlus size={44} strokeWidth={0.9} color="#8DD3BB" />
              <p className="mb-0">Add new card</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
