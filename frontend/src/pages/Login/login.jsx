import logo from "../../assets/KoYns-Logo.png";
import text from "../../assets/KoYns-Text.png";
import "./styles.scss";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";

const Login = () => {
   return (
         <div className="login">
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

            <span>New to KoYns..? Register</span>
         </div> 
   );
};
export default Login;
