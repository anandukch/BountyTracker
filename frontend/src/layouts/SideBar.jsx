import { Link, Outlet } from "react-router-dom";
import icon from "../assets/icon.svg";
import "./styles.scss";
import profile from "../assets/profile-img.svg"
import tasks from "../assets/tasks.svg"
import employees from "../assets/employees.svg"
import logout from "../assets/logout.svg"

const SideBar = () => {
   return (
      <div className="page">
         <div className="header">
            <div className="logo">
               Bounty APP Logo
            </div>
            <h1>Bounty Tracker</h1>
         </div>
         <aside className="SideBar">
            <div className="top">
            <Link className="links">
               <div className="details">
                  <div className="icon">
                     <img src={profile} alt="icon" className="imgicon" />
                  </div>
                  <label> Profile</label>
               </div>
            </Link>
            <Link className="links">
               <div className="details">
                  <div className="icon">
                     <img src={tasks} alt="icon" className="imgicon" />
                  </div>
                  <label>Tasks</label>
               </div>
            </Link>
            <Link className="links">
               <div className="details">
                  <div className="icon">
                     <img src={employees} alt="icon" className="imgicon" />
                  </div>
                  <label>Employees</label>
               </div>
            </Link>
            </div>
               <div className="details">
                  <div className="icon">
                     <img src={logout} alt="icon" className="imgicon" />
                  </div>
                  <label>Log-out</label>
               </div>
         </aside>

         <div className="content">
            <Outlet />
         </div>
      </div>
   );
};

export default SideBar;
