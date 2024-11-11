import React from "react";

const Table = ({ data }) => {
  let slNo = 0;
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">SL No</th>
          <th scope="col">Seat No</th>
          <th scope="col">Passenger name</th>
          <th scope="col">CID</th>
          <th scope="col">Contact number</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((detail, index) => {
            return (
              <tr
                key={index}
                style={{ transition: "background-color 0.3s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0f8ff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <th scope="row">{(slNo += 1)}</th>
                <td>{detail.seatNumber}</td>
                <td>{detail.name}</td>
                <td>{detail.cid}</td>
                <td>{detail.contactNo}</td>
              </tr>
            );
          })}

      </tbody>
    </table>
  );
};

export { Table };
