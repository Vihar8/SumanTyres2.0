import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import JWTContext from "../contexts/JWTContext";

const GuestGuard = ({ children }) => {
  const { isLoggedIn, user } = useContext(JWTContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (isLoggedIn && user) {
        switch (user?.role) {
            case 0:
            case 1:
            case 2:    
                navigate('/dashboard', {
                    state: { from: '' },
                    replace: true
                });
                break;
            default:
                navigate("/", {
                    state: { from: '' },
                    replace: true
                });
        }
    }
  },[isLoggedIn, navigate, location.pathname, user])

  return children;
};

export default GuestGuard;
