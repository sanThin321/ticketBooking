import { PencilLine } from "lucide-react";

export const Account = () => {
  return (
    <div>
      <h3 className="mt-4">Account</h3>
      <div
        className="my-3 mb-5 p-4"
        style={{ boxShadow: "0 4px 16px rgba(17, 34, 17, 0.05)" }}
      >
        <div className="mb-3">
          <label>Name</label>
          <div className="d-flex justify-content-between align-items-center">
            <h5>Namgay Dorji</h5>
            <button className="btn btn-outline-dark d-flex gap-2 align-items-center">
              <PencilLine size={18} />
              Change
            </button>
          </div>
        </div>

        <div className="mb-3">
          <label>Email</label>
          <div className="d-flex justify-content-between align-items-center ">
            <h5>namgaydorji@gmai.com</h5>
            <button className="btn btn-outline-dark d-flex gap-2 align-items-center">
              <PencilLine size={18} />
              Change
            </button>
          </div>
        </div>

        <div className="mb-3">
          <label>Password</label>
          <div className="d-flex justify-content-between align-items-center ">
            <h5>**********</h5>
            <button className="btn btn-outline-dark d-flex gap-2 align-items-center">
              <PencilLine size={18} />
              Change
            </button>
          </div>
        </div>

        <div>
          <label>Phone number</label>
          <div className="d-flex justify-content-between align-items-center ">
            <h5>17353725</h5>
            <button className="btn btn-outline-dark d-flex gap-2 align-items-center">
              <PencilLine size={18} />
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
