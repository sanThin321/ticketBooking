import React from "react";

const Table = () => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Seat</th>
          <th scope="col">Passenger name</th>
          <th scope="col">Contact number</th>
          <th scope="col">CID</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ transition: 'background-color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f8ff'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr style={{ transition: 'background-color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f8ff'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr style={{ transition: 'background-color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f8ff'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
          <th scope="row">3</th>
          <td colSpan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  );
};

export { Table };
