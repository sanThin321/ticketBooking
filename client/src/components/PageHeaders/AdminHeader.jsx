import { SlidersHorizontal } from "lucide-react";
import AddMemberBtn from "../AddMemberBtn";

export const AdminHeader = ({ toggleFilters, title }) => {
  return (
    <div className="container bg-white border rounded container-shadow py-3 my-4">
      <div className="rounded-4 d-flex align-items-center">
        <div className="col-2 align-items-center">
          <h4 className="mb-0">{title}</h4>
        </div>
        <div className="col-lg-10">
          <div className="d-flex justify-content-end gap-3">
            <AddMemberBtn/>
            <div className="input-group w-25">
              <input
                type="text"
                className="form-control"
                placeholder="Seach..."
                aria-describedby="search-button"
              />
            </div>
            <div>
              <button className="btn">
                <SlidersHorizontal onClick={toggleFilters} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
