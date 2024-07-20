import "./styles.scss";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const Login = () => {
   return (
      <div className="login">
         <h1>Login</h1>
         <form action="/" method="post">
            {/* <img src={} alt="Logo" className="logo" /> */}
            <TextField
               label="Username"
               //   value={userName}
               //   ref={unameRef}
               type="text"
               className=""
               //   error={err}
               //   onChange={setUserName}
            />
            <TextField label="Password" type="password" className="" />
            <Button text="Login" className="" />
         </form>

         <span>
            New to KoYns..? <Link className="registerLink" to="register"> <span>Register</span></Link>
         </span>
      </div>
   );
};
export default Login;
