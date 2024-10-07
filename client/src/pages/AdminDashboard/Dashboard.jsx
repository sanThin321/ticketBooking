import { ChevronRight, LifeBuoy, Flag, UserRound, BookCheck, DoorClosed, Ticket, SquareUserRound } from "lucide-react"


export const Dashboard = () => {
  return (
    <>
      <div className="container">
        <div className="first-container mb-5">
          <div>
            <h4>General Overview</h4>
          </div>
          <div className="d-flex justify-content-around  rounded-2" style={{ backgroundColor: 'rgba(205, 234, 225, 1)' }}>
            <div className="px-2 py-4">
              <LifeBuoy />
              <p>45 Buses</p>
            </div>
            <div className="px-lg-4 py-4 mx-lg-2 py-4 border-start border-2 h-25" style={{ borderColor: "darkgreen" }}>
              <Flag />
              <p>40 Registered Routes</p>
            </div>
            <div className="px-lg-4 py-4 mx-lg-2 border-start border-2 h-25">
              <UserRound />
              <p>20 Users</p>
            </div>
            <div className="px-lg-4 py-4 mx-lg-2 border-start border-2 h-25">
              <BookCheck />
              <p>200 Daily Passenger</p>
            </div>
            <div className="px-lg-4 py-4 mx-lg-2 border-start border-2 h-25">
              <DoorClosed />
              <p>10 Agency</p>
            </div>
            <div className="px-lg-4 py-4 mx-lg-2 border-start border-2 h-25">
              <Ticket />
              <p>10 Ticket Agents</p>
            </div>
            <div className="px-lg-4 py-4 mx-lg-2 border-start border-2 h-25">
              <SquareUserRound />
              <p>20 Drivers</p>
            </div>
          </div>
        </div>
        <div className="second-container" >
          <div className="d-flex justify-content-end mb-2">
            <button className="mx-2 rounded-2">
              Add Routes
            </button>
            <div className="input-group" style={{ maxWidth: '200px' }}>
              <input type="text" className="form-control border border-dark border-2" placeholder="Search" aria-label="Search" />
            </div>
            <div>
              <select name="agency" id="agency" className="border border-dark border-2 mx-2 rounded-2" style={{ width: '120px', height: '40px' }}>
                <option selected>Agency</option>
                <option value="1">Bumpa</option>
                <option value="1">Pempa</option>
                <option value="1">Dawa</option>
                <option value="1">Etc..</option>
              </select>
            </div>
          </div>
          <div className="justify-content-start"><h4>Routes</h4></div>

          <div className="table">
            <table className="table">
              <thead>
                <tr>
                  <th>SL NO</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Departure Time</th>
                  <th>Arrival Time</th>
                  <th>Agency</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Tsirang</td>
                  <td>Thimphu</td>
                  <td>11:00</td>
                  <td>5:00</td>
                  <td>Dawa</td>
                  <td><button
                    className="btn px-2"
                    style={{ border: "1.5px solid #8DD3BB" }}
                  >
                    <ChevronRight />
                  </button></td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Tsirang</td>
                  <td>Thimphu</td>
                  <td>11:00</td>
                  <td>5:00</td>
                  <td>Dawa</td>
                  <td><button
                    className="btn px-2"
                    style={{ border: "1.5px solid #8DD3BB" }}
                  >
                    <ChevronRight />
                  </button></td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Tsirang</td>
                  <td>Thimphu</td>
                  <td>11:00</td>
                  <td>5:00</td>
                  <td>Dawa</td>
                  <td><button
                    className="btn px-2"
                    style={{ border: "1.5px solid #8DD3BB" }}
                  >
                    <ChevronRight />
                  </button></td>

                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end">
            <button className="bg-dark text-light rounded-2">
              show more results
            </button>
          </div>
        </div>

      </div>

    </>
  )
}
