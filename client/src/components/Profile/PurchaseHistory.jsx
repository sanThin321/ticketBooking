import { Armchair, CalendarDays, Minus } from "lucide-react";
import AgencyLogo from "../../assets/AgencyLogo.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

export const PurchaseHistory = () => {
  const storedData = localStorage.getItem("user");
  let userId = null;

  try {
    userId = storedData ? JSON.parse(storedData)?.id : null;
  } catch (error) {
    console.error("Error parsing storedData:", error);
  }
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4004/pelrizhabtho/agency/ticket/${userId}`
        );
        if (res.status === 200) {
          setTickets(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const downloadTicket = (ticket) => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Ticket Details", 105, 20, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Ticket details
    doc.text(`From: ${ticket.from}`, 20, 40);
    doc.text(`To: ${ticket.to}`, 20, 50);
    doc.text(
      `Departure Time: ${new Date(ticket.departureTime).toLocaleString()}`,
      20,
      60
    );
    doc.text(
      `Arrival Time: ${new Date(ticket.arrivalTime).toLocaleString()}`,
      20,
      70
    );
    doc.text(`Seat Number: ${ticket.bookedSeats?.seatNumber}`, 20, 80);

    const imgWidth = 50;
    const imgHeight = 50;
    doc.addImage(AgencyLogo, "JPEG", 150, 40, imgWidth, imgHeight);
    doc.save(`Ticket_${ticket.from}_to_${ticket.to}.pdf`);
  };

  return (
    <div className="px-0">
      <h3 className="mt-4 mb-2 mb-lg-4">Tickets / Bookings</h3>
      {tickets?.map((ticket, index) => {
        return (
          <div className="my-1w bg-white" key={index}>
            <div className="d-flex align-items-center justify-content-between px-3 py-3 mb-3 rounded border">
              <div className="d-flex flex-sm-column flex-lg-row align-items-center gap-3">
                <img src={AgencyLogo} alt="agency logo" width={70} />
                <div>
                  <div className="d-flex align-items-center gap-3 pe-5" style={{ borderRight: "1.5px solid #8DD3BB" }}>
                    <div>
                      <p>{ticket.from}</p>
                      <h6>
                        <strong>{new Date(ticket.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
                      </h6>
      {tickets.length === 0 ? ( // Check if tickets array is empty
        <div className="text-center my-5">
          <h5>No tickets available.</h5>
        </div>
      ) : (
        tickets.map((ticket, index) => {
          return (
            <div className="my-1w bg-white" key={index}>
              <div className="d-flex align-items-center justify-content-between px-3 py-3 mb-3 rounded border">
                <div className="d-flex align-items-center gap-3">
                  <img src={AgencyLogo} alt="agency logo" width={70} />
                  <div>
                    <div
                      className="d-flex align-items-center gap-3 pe-5"
                      style={{ borderRight: "1.5px solid #8DD3BB" }}
                    >
                      <div>
                        <p>{ticket.from}</p>
                        <h6>
                          <strong>
                            {new Date(ticket.departureTime).toLocaleTimeString(
                              [],
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                          </strong>
                        </h6>
                      </div>
                      <Minus />{" "}
                      <div>
                        <p>{ticket.to}</p>
                        <h6>
                          <strong>
                            {new Date(ticket.arrivalTime).toLocaleTimeString(
                              [],
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                          </strong>
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
                          <strong>
                            {new Date(
                              ticket.departureTime
                            ).toLocaleDateString()}
                          </strong>
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
                          <strong>{ticket.bookedSeats?.seatNumber}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                  <br />
                <div className="d-flex gap-5 ms-4">
                  <div className="d-flex gap-3">
                    <div className="rounded px-2 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#EBF6F2" }}>
                      <CalendarDays color="#8DD3BB" />
                    </div>
                    <div>
                      <p className="mb-0">Date</p>
                      <p className="mb-0">
                        <strong>{new Date(ticket.departureTime).toLocaleDateString()}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-3">
                    <div className="rounded px-2 py-0 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#EBF6F2" }}>
                      <Armchair color="#8DD3BB" />
                    </div>
                    <div>
                      <p className="mb-0">Seat No</p>
                      <p className="mb-0">
                        <strong>{ticket.bookedSeats?.seatNumber}</strong>
                      </p>
                    </div>
                  </div>

                <div className="d-flex gap-3">
                  <button
                    className="btn btn-sm"
                    style={{ backgroundColor: "#8DD3BB" }}
                    onClick={() => downloadTicket(ticket)}
                  >
                    Download Ticket
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
