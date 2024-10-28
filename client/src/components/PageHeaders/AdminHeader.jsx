import { SlidersHorizontal } from "lucide-react";

export const AdminHeader = ({title, btn }) => {
  return (
    <div className="container bg-white border rounded py-3 my-4">
      <div className="rounded-4 d-flex align-items-center">
        <div className="col-2 align-items-center">
          <h4 className="mb-0">{title}</h4>
        </div>
        <div className="col-lg-10">
          <div className="d-flex justify-content-end gap-3">
            {btn}
            <div className="input-group w-25">
              <input
                type="search"
                className="form-control custom-search"
                placeholder="Seach..."
                aria-describedby="search-button"
              />
            </div>
            <div className="dropdown">
              <button
                className="btn"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <SlidersHorizontal />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end mt-3"
                aria-labelledby="dropdownMenuButton"
              >
                <li className="dropdown-item hover">
                  Driver
                </li>
                <li className="dropdown-item hover">
                 Ticket Agents
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
