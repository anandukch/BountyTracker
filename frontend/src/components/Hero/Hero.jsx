import { Outlet } from "react-router-dom";
import "./styles.scss";
import logo from "../../assets/KoYns-Logo.png";
import text from "../../assets/KoYns-Text.png";
const Hero = () => {
   return (
    <div className="loginPage">
      <div className="hero">
         <div className="wrapper-hero">
            <div className="login-image">
               <img src={logo} alt="Login Image" className="logo-image" />
            </div>

            <img src={text} alt="Logo Text" className="logo-text" />
         </div>
      </div>
      <Outlet/>
      </div>
   );
};

export default Hero;
