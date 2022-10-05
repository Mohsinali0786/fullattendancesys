import { Button } from "@mui/material";
import UserIcon from "../../Assets/Images/UserIcons.png";
import CompanyIcon from "../../Assets/Images/companyicon.png";
import { Link, Navigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useSelector, useDispatch } from "react-redux";
import { Sign_In } from "../../store/actions/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleTwoTone } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";
import { GET, AUTH } from "../../utils/api";

function SignInForm() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const [allCompanies, setAllCompanies] = useState();
  const [allUsers, setAllUsers] = useState();
  const [allAttendance, setAllAttendance] = useState();
  const [handleLoginForm, sethandleLoginForm] = useState();

  const mystate = useSelector((state) => state.AllUsers);
  // console.log('My state Login===>', mystate.LoginUser)
  let IsLoggedIn = mystate.LoginUser?.IsLoggedIn;
  // console.log('IsLoggedIn', IsLoggedIn)
  let UserloginInfo = {
    email,
    password,
    company,
    type: "user",
  };
  let CompanyloginInfo = {
    email,
    password,
    type: "company",
  };

  useEffect(() => {
    axios
      .get(GET?.GETCOMPANY)
      .then((res) => {
        // console.log(res.data?.status)
        // console.log(res.data.AllCompanies, "=res=")
        setAllCompanies(res.data.AllCompanies);
      })
      .catch((err) => {
        console.log("Error====>", err);
      });
    axios
      .get(GET?.GETUSERS)
      .then((res) => {
        setAllUsers(res.data.AllUsers);
      })
      .catch((err) => {
        console.log("Error====>", err);
      });

    if (IsLoggedIn) {
      handleLoginForm === "Company"
        ? // <></>
          Navigate("/home")
        : Navigate("/home");
    }
  }, [IsLoggedIn === true]);
  const signin = (mydata) => {
    console.log("signin running", mydata);
    let myapi = "";
    // console.log("handleLoginForm", handleLoginForm);
    if (handleLoginForm === "Company") {
      myapi = AUTH.COMPANYLOGIN;
      console.log("myapi", myapi);
    } else {
      // myapi = 'http://localhost:4000/api/authuser'
      myapi = AUTH.USERLOGIN;
    }

    console.log("myapi", myapi);
    axios
      .post(myapi, mydata)
      .then((res) => {
        let { data } = res;
        console.log("data===>", data);
        if (data?.status === "success") {
          Swal.fire({
            icon: res.data.status,
            text: res.data.message,
          });
          // Navigate('/home')
          let obj = {
            mydata,
            IsLoggedIn: true,
            allCompanies,
            allUsers,
            allAttendance,
          };
          dispatch(Sign_In(obj));
          // dispatch({
          //     Sign_In(mydata)
          //     type: "LOGIN",
          //     IsLoggedIn: true
          // })
        } else {
          Swal.fire({
            icon: res.data.status,
            text: res.data.message,
          });
          // dispatch({
          //     type: "LOGIN",
          //     IsLoggedIn: false
          // })
          console.log("else data", data);
        }
        // console.log(res, "=res=")
      })
      .catch((error) => {
        alert("Ohh Error Occured");

        console.log(error, "=error=");
      });
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="form-with-img">
      <div className="SignIn-Form">
        <form className="mainForm">
          <div className="User-Company-btn-div">
            <Button
              variant="outlined"
              className="UserLogin-btn"
              value="User"
              onClick={(e) => {
                sethandleLoginForm(e.target.value);
              }}
            >
              User
            </Button>
            <Button
              variant="outlined"
              className="CompanyLogin-btn"
              value="Company"
              onClick={(e) => {
                sethandleLoginForm(e.target.value);
              }}
            >
              Company
            </Button>
          </div>
          {handleLoginForm === "Company" ? (
            <h2>Company Login</h2>
          ) : (
            <h2>User Login</h2>
          )}

          <table className="tablestyling">
            {handleLoginForm === "Company" ? (
              <div className="UserIconDiv">
                <img src={CompanyIcon} id="usericon-img" />
              </div>
            ) : (
              <>
                <div className="UserIconDiv">
                  <img src={UserIcon} id="usericon-img" />
                </div>
                <tr>
                  <td className="iconswithinputs">
                    <EmailIcon className="icons" />
                    <input
                      type="company"
                      onChange={(e) => {
                        setCompany(e.target.value);
                      }}
                      placeholder="your Company"
                    />
                  </td>
                </tr>
              </>
            )}

            <tr>
              <td className="iconswithinputs">
                <EmailIcon className="icons" />
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                />
              </td>
            </tr>
            <tr>
              <td className="iconswithinputs">
                <LockOpenIcon className="icons" />
                <input
                  type={passwordShown ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Passoword"
                />
                <EyeInvisibleTwoTone
                  style={{ position: "relative", left: "-20px" }}
                  onClick={() => {
                    togglePassword();
                  }}
                  className="VisibleIcon"
                />
              </td>
            </tr>
            {handleLoginForm === "Company" ? (
              <tr>
                <td
                  colSpan={2}
                  style={{ textAlign: "center", padding: "30px 0px 20px 0px" }}
                >
                  <Button
                    variant="contained"
                    className="loginBtn"
                    onClick={() => signin(CompanyloginInfo)}
                  >
                    Login
                  </Button>
                </td>
              </tr>
            ) : (
              <tr>
                <td
                  colSpan={2}
                  style={{ textAlign: "center", padding: "30px 0px 20px 0px" }}
                >
                  <Button
                    variant="contained"
                    className="loginBtn"
                    onClick={() => signin(UserloginInfo)}
                  >
                    Login
                  </Button>
                </td>
              </tr>
            )}
            {handleLoginForm === "Company" ? (
              <tr id="signUp-mobile">
                <td colSpan={10}>
                  <p>
                    New Registration?{" "}
                    <Link to="/comapanysignup">
                      <b></b>Click Here
                    </Link>
                  </p>
                </td>
              </tr>
            ) : (
              ""
            )}
          </table>
        </form>
      </div>
      {handleLoginForm === "Company" ? (
        <div className="sideGradient">
          <h2>New Here?</h2>
          <p>Sign Up here if you have not any account?</p>
          <Link to="/comapanysignup">
            <Button> Sign Up</Button>
          </Link>
        </div>
      ) : (
        <div className="sideGradient">
          <h2>Welcome !!</h2>
          <p>
            Please Login if you are user or admin if Company then you can also
            SignUp{" "}
          </p>
        </div>
      )}
    </div>
  );
}
export default SignInForm;
