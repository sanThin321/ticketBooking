import Herobanner from "../assets/Herobanner.jpg";
import Dochula from "../assets/Dochula.jpg";
import PunakhaDzong from "../assets/PunakhaDzong.jpg";
import Cham from "../assets/Cham.jpg";
import TigerNest from "../assets/TigerNest.jpg";
import Highway from "../assets/Highway.jpg";

export const Home = () => {
  return (
    <main>
      <div className="mb-4">
        <img
          src={Herobanner}
          alt="Hero Banner"
          style={{
            width: "100%",
            height: "85vh",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <div className="container my-5 pb-5">
        <div>
          <h1>Fall into travel</h1>
          <p>
            Going somewhere to celebrate this season? Whether you’re going home
            or somewhere to roam, we’ve got the travel tools to get you to your
            destination.
          </p>
        </div>

        <div className="row mb- py-4">
          <div className="col-4">
            <img
              className="rounded-3"
              src={Cham}
              alt="Hero Banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            </div>
          <div className="col-4">

          <img
              className="rounded-3"
              src={TigerNest}
              alt="Hero Banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          <div className="col-4">
          <img
              className="rounded-3"
              src={Highway}
              alt="Hero Banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-7">
            <img
              className="rounded-3"
              src={Dochula}
              alt="Hero Banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          <div className="col-5">
            <img
            className="rounded-3"
              src={PunakhaDzong}
              alt="Hero Banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
