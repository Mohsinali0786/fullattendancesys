import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import formimg from "../../Assets/Images/draw1.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Sign_Up } from "../../store/actions/index";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { EyeInvisibleTwoTone } from "@ant-design/icons";
import axios from "axios";
import { GET, AUTH } from "../../utils/api";

function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const Navigate = useNavigate();
  const mystate = useSelector((state) => state.AllUsers.Users);
  let filterdata = useSelector((state) => state.AllUsers);
  console.log(
    "filtereddata Signup form ",
    filterdata.LoginUser.LoginUser.email
  );
  // const currLoginUser = useSelector((state) => filterdata.LoginUser)
  filterdata = filterdata.Company.find(
    (v) => v.email === filterdata?.LoginUser?.LoginUser?.email
  );
  console.log("filtereddata Signup form after ", filterdata);

  const dispatch = useDispatch();
  // let mylength = mystate.length
  let data = {
    id: Math.round(Math.random() * 1000),
    firstName,
    lastName,
    email,
    password,
    companyName: filterdata?.companyName,
    currentLoginCompany: filterdata,
    userRole: "user",
    type: "user",
    isDeleted: false,
  };

  const checkEmailIsValid = () => {
    // if (localStorage.getItem('Users') !== null) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mailformat.test(email)) {
      axios
        .post(AUTH?.USERSIGNUP, data)
        .then((res) => {
          console.log("res.data?.status", res.data);
          if (res.data?.status === "success") {
            Swal.fire({
              icon: res.data.status,
              text: res.data.message,
            });
          } else {
            Swal.fire({
              icon: res.data.status,
              text: res.data.message,
            });
          }

          console.log(res, "=res=");
          // alert('sign up successfully')

          // Navigate('/')
        })
        .catch((error) => {
          alert("Ohh Error Occured");

          console.log(error, "=error=");
        });

      // let IsEmailExist = IsEmailPresent()
      // console.log('IsEmailExist', IsEmailExist)
      // if (IsEmailExist) {
      //     // console.log('currLoginUser.CompanyName', filterdata)
      //     const findCompanyExist = mystate.find((data) => data.CompanyName === IsEmailExist.CompanyName && data.Email === IsEmailExist)
      //     // console.log('findCompanyExist', findCompanyExist)
      //     if (findCompanyExist) {

      //         if (IsEmailExist.isDeleted) {
      //             dispatch(Sign_Up(data))
      //             Navigate('/home')
      //         }
      //         else {
      //             Swal.fire({
      //                 icon: 'error',
      //                 title: 'Oops...',
      //                 text: 'This Email address is already Register Try different email ',
      //             })
      //         }
      //     }
      //     else {
      //         dispatch(Sign_Up(data))
      //         Navigate('/home')
      //     }

      // }
      // else {
      //     dispatch(Sign_Up(data))
      //     Navigate('/home')

      // }
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      filterdata = filterdata?.Company?.find(
        (v) => v.email === filterdata?.LoginUser?.LoginUser?.email
      );
    }
    // }
    // else {

    //     dispatch(Sign_Up(data))
    //     Navigate('/home')
    // }
  };
  // function IsEmailPresent() {
  //     if (localStorage.getItem('Users') !== null) {

  //         let UserFromLS = JSON.parse(localStorage.getItem('Users'))
  //         let MyUserFromLS = UserFromLS.AllUsers.Users

  //         let IsEmailExist = MyUserFromLS.find((email) => email.Email === Email)
  //         return IsEmailExist

  //         // console.log(IsEmailExist.Email)
  //     }
  // }
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div>
      <div>
        <h1
          style={{
            textAlign: "center",
            backgroundColor: "rgb(131 181 166)",
            color: "white",
          }}
        >
          Attendance Management System
        </h1>
      </div>
      <div
        style={{ textAlign: "center", display: "flex", flexDirection: "row" }}
      >
        <div className="SignUpForm-MainDiv">
          <h3>SignUp</h3>
          <p>Please fill form to create account</p>
          <form className="signUpForm">
            <div className="UserIconDiv"></div>
            <table className="tablestyling">
              <tr>
                <td className="iconswithinputs">
                  <PersonIcon className="icons" />
                  <input
                    name="firstName"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                </td>
              </tr>
              <tr>
                <td className="iconswithinputs">
                  <PersonIcon className="icons" />
                  <input
                    name="lastName"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                </td>
              </tr>
              <tr>
                <td className="iconswithinputs">
                  <EmailIcon className="icons" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </td>
              </tr>
              <tr>
                <td className="iconswithinputs">
                  <LockOpenIcon className="icons" />
                  <input
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      e.target.value.length > 5
                        ? setPassword(e.target.value)
                        : setPassword(null);
                    }}
                    placeholder="Passoword"
                    required
                  />
                  <EyeInvisibleTwoTone
                    style={{ position: "relative", left: "-20px" }}
                    onClick={() => {
                      togglePassword();
                    }}
                    className="VisibleIcon"
                  />
                </td>
                <p style={{ fontSize: "12px" }}>
                  (Password should be greater then 5 digit)
                </p>

                {/* <td className='iconswithinputs'><LockOpenIcon className='icons' /><input name='Password' type='password' value={Password} onChange={(e) => setPassword(e.target.value)} placeholder='Passowrd' /></td> */}
              </tr>

              <tr>
                <td
                  colSpan={2}
                  style={{ textAlign: "center", padding: "30px 0px 20px 0px" }}
                >
                  <Button
                    disabled={password === null ? true : false}
                    variant="contained"
                    className="loginBtn"
                    onClick={() => checkEmailIsValid()}
                  >
                    SignUp
                  </Button>
                </td>
              </tr>
              <tr>
                <td colSpan={10}>
                  <p>
                    Already Have Account For Log-In ?{" "}
                    <Link to="/home">
                      <b>Go To Home</b>
                    </Link>
                  </p>
                </td>
              </tr>
            </table>
          </form>
        </div>
        <img src={formimg} className="img-in-signup" />
      </div>
    </div>
  );
}
export default SignUpForm;
