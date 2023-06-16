import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, isLoggedIn }: { children: React.ReactNode, isLoggedIn: boolean }) => {
 let navigate = useNavigate();
 useEffect(() => {
  if (!isLoggedIn) navigate('/login');
 }, [isLoggedIn, navigate]);

 return (
  isLoggedIn ? (<>{children}</>) : null
 )
}

export default PrivateRoute