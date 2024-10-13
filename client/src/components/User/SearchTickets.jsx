import { useState } from "react";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import dzongkhagsAndDungkhags from "../../data/Dzongkhags";

export const SearchTickets = () => {
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [selectedFrom, setSelectedFrom] = useState("From");
  const [selectedTo, setSelectedTo] = useState("To");
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);

  const filteredDzongkhagsFrom = dzongkhagsAndDungkhags.filter((opt) =>
    opt.name.toLowerCase().includes(fromSearch.toLowerCase())
  );

  const filteredDzongkhagsTo = dzongkhagsAndDungkhags.filter((opt) =>
    opt.name.toLowerCase().includes(toSearch.toLowerCase())
  );

  return (
    <div className="container d-flex justify-content-center">
      <div className="d-flex p-3 border flex-column gap-3 search-tickets rounded bg-white container-shadow">
        <div>
          <h4>Where are you travelling?</h4>
        </div>

        <div className="d-flex justify-content-between gap-2 mb-3">
          {/* Custom From dropdown with search */}
          <div className="custom-dropdown">
            <div className="dropdown-header d-flex justify-content-between" onClick={() => setIsFromOpen(!isFromOpen)}>
              <span>{selectedFrom}</span>
              <span>
                {isFromOpen ? <ChevronUp size={20}/> :  <ChevronDown size={20}/>}
              </span>
            </div>
            {isFromOpen && (
              <div className="dropdown-list p-1">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search From"
                  value={fromSearch}
                  onChange={(e) => setFromSearch(e.target.value)}
                />
                <div className="dropdown-options">
                  {filteredDzongkhagsFrom.map((opt) => (
                    <div
                      key={opt.id}
                      className="dropdown-item"
                      onClick={() => {
                        setSelectedFrom(opt.name);
                        setIsFromOpen(false);
                      }}
                    >
                      {opt.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Custom To dropdown with search */}
          <div className="custom-dropdown">
            <div className="dropdown-header d-flex justify-content-between" onClick={() => setIsToOpen(!isToOpen)}>
              <span>{selectedTo}</span>
              <span>
                {isToOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
              </span>
            </div>
            {isToOpen && (
              <div className="dropdown-list p-1">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search To"
                  value={toSearch}
                  onChange={(e) => setToSearch(e.target.value)}
                />
                <div className="dropdown-options">
                  {filteredDzongkhagsTo.map((opt) => (
                    <div
                      key={opt.id}
                      className="dropdown-item"
                      onClick={() => {
                        setSelectedTo(opt.name);
                        setIsToOpen(false);
                      }}
                    >
                      {opt.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="date-input">
            <input
              type="date"
              className="form-control"
              aria-label="Date"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-bg">
            <span className="me-2">
              <Send size={15} color="#242424" />
            </span>
            Search Tickets
          </button>
        </div>
      </div>
    </div>
  );
};
