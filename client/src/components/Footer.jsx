import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#8DD3BB" }}
    >
      <div className="container">
        <div className="d-flex flex-column gap-5 flex-lg-row flex-md-row flex-sm-row align-items-center align-items-lg-start align-items-md-start align-items-sm-start justify-content-center justify-content-lg-between justify-content-md-between justify-content-sm-between">
          <div classname="">
            <img
              src="Footer-logo.png"
              className="img-fluid mb-5"
              alt="Logo"
              width={210}
            />

            <div className="d-flex gap-4">
              <Facebook size={30}/>
              <Instagram size={30}/>
              <Twitter size={30}/>
              <Youtube size={35}/>
            </div>
          </div>

          <div className="">
            <h2>Contact Us</h2>
            <ul className="p-0 m-0" style={{ listStyle: "none" }}>
              <li>Chamjekha, Thimphu, Bhutan</li>
              <li>
                Phone Number: <a href="tel:77615421">77615421</a>
              </li>
              <li>
                Email:{" "}
                <a href="mailto:pelrizhabtho@gmail.com">
                  pelrizhabtho@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="d-none d-lg-block d-md-block">
            <h2>Links</h2>
            <ul className="p-0 m-0" style={{ listStyle: "none" }}>
              <li><Link to="/" style={{textDecoration: "none", color: "#000"}}>Book Ticket</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
