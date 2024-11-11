import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import dzongkhagsAndDungkhags from "../../data/Dzongkhags";

export const BookTicketsHeader = ({ to, from, inputDate, onSearch }) => {
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [selectedFrom, setSelectedFrom] = useState(from);
  const [selectedTo, setSelectedTo] = useState(to);
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const [date, setDate] = useState(inputDate);


  const filteredDzongkhagsFrom = dzongkhagsAndDungkhags.filter((opt) =>
    opt.name.toLowerCase().includes(fromSearch.toLowerCase())
  );

  const filteredDzongkhagsTo = dzongkhagsAndDungkhags.filter((opt) =>
    opt.name.toLowerCase().includes(toSearch.toLowerCase())
  );

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSearch = () => {
    onSearch(selectedFrom, selectedTo, date);
  };

  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <div className="mt-3 container p-3 border rounded bg-white">
      <div className="d-flex  flex-column gap-3 ">
        <div>
          <h4>Search tickets</h4>
        </div>

        <div className="d-flex justify-content-between gap-2 mb-3">
          <div className="custom-dropdown">
            <div
              className="dropdown-header d-flex justify-content-between"
              onClick={() => setIsFromOpen(!isFromOpen)}
            >
              <span>{selectedFrom}</span>
              <span>
                {isFromOpen ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </span>
            </div>
            {isFromOpen && (
              <div className="dropdown-list p-1">
                <input
                  type="search"
                  className="form-control custom-search"
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

          <div className="custom-dropdown">
            <div
              className="dropdown-header d-flex justify-content-between"
              onClick={() => setIsToOpen(!isToOpen)}
            >
              <span>{selectedTo}</span>
              <span>
                {isToOpen ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </span>
            </div>
            {isToOpen && (
              <div className="dropdown-list p-1">
                <input
                  type="search"
                  className="form-control custom-search"
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
              className="form-control custom-search"
              value={date}
              onChange={handleDateChange}
              aria-label="Date"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-bg" onClick={handleSearch}>
              <span className="me-2">
                <Send size={15} color="#242424" />
              </span>
              Search Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
