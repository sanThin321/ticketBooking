import { useDispatch } from "react-redux";
import { logout } from "../../store/Slices/UserSlice";
import { useNavigate } from "react-router-dom";

export const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogOut;
