import { useState } from "react";
import backgroundImage from "../../assets/ProfileBackground.png";
import { Account } from "../../components/Profile/Account";
import { PurchaseHistory } from "../../components/Profile/PurchaseHistory";
import { PaymentMethod } from "../../components/Profile/PaymentMethod";

export const UserProfile = () => {
  const [isSelected, setIsSelected] = useState(0);

  const isActive = {
    borderBottom: "3px solid #8DD3BB",
    cursor: "pointer",
  };

  const defaultStyle = {
    cursor: "pointer",
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
        <h4 className="">Namgay Wangchuk</h4>
        <p>namgay@gmail.com</p>
      </div>

      <div
        className="rounded my-3 py-3 px-3"
        style={{ boxShadow: "0 4px 16px rgba(17, 34, 17, 0.05)" }}
      >
        <ul
          className="d-flex justify-content-around px-0 mb-0"
          style={{ listStyle: "none" }}
        >
          <li
            className="text-decoration-none"
            style={
              isSelected === 0 ? { ...defaultStyle, ...isActive } : defaultStyle
            }
            onClick={() => setIsSelected(0)}
          >
            Account
          </li>
          <li
            className="text-decoration-none"
            style={
              isSelected === 1 ? { ...defaultStyle, ...isActive } : defaultStyle
            }
            onClick={() => setIsSelected(1)}
          >
            Purchased History
          </li>
          <li
            className="text-decoration-none"
            style={
              isSelected === 2 ? { ...defaultStyle, ...isActive } : defaultStyle
            }
            onClick={() => setIsSelected(2)}
          >
            Payment Methods
          </li>
        </ul>
      </div>
      {isSelected === 0 ? (
        <Account />
      ) : isSelected === 1 ? (
        <PurchaseHistory />
      ) : (
        <PaymentMethod />
      )}
    </div>
  );
};
