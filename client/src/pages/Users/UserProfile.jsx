import { useState } from "react";
import backgroundImage from "../../assets/ProfileBackground.png";
import { Account } from "../../components/Profile/Account";
import { PurchaseHistory } from "../../components/Profile/PurchaseHistory";
import { useAuth } from "../../auth/auth";

export const UserProfile = () => {
  const [isSelected, setIsSelected] = useState(0);
  const { user } = useAuth();

  const isActive = {
    borderBottom: "3px solid #8DD3BB",
    cursor: "pointer",
    backgroundColor: "#8DD3BB", // Selected tab background color
    color: "#fff",
  };

  const defaultStyle = {
    padding: "10px 20px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <div className="container py-4 px-0">
      <div className="position-relative" style={{ marginBottom: "7rem" }}>
        <img
          src={backgroundImage}
          className="img-fluid w-100"
          alt="profile background"
          style={{ height: "35vh" }}
        />

        <img
          src="./Avatar.png"
          className="rounded position-absolute"
          alt="profile picture"
          style={{
            top: "65%",
            left: "50%",
            transform: "translateX(-50%)",
            height: "70%",
            zIndex: 10,
          }}
        />
      </div>

      <div className="d-flex flex-column align-items-center">
        <h4 className="">{user.firstName + " " + user.lastName}</h4>
        <p>{user.email}</p>
      </div>

      <div className="bg-white border rounded my-3 rounded">
        <ul
          className="d-flex align-items-center px-0 mb-0 rounded"
          style={{ listStyle: "none" }}
        >
          <li
            className="w-50 text-decoration-none rounded"
            style={
              isSelected === 0 ? { ...defaultStyle, ...isActive } : defaultStyle
            }
            onClick={() => setIsSelected(0)}
          >
            Account
          </li>
          <li
            className="w-50 text-decoration-none rounded"
            style={
              isSelected === 1 ? { ...defaultStyle, ...isActive } : defaultStyle
            }
            onClick={() => setIsSelected(1)}
          >
            Purchased History
          </li>
        </ul>
      </div>

      {isSelected === 0 ? (
        <Account />
      ) :
        (isSelected === 1 ? <PurchaseHistory /> : "")
      }
    </div>
  );
};
