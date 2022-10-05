const authApi = "/api/auth";
const getApi = "/api/get";

const AUTH = {
  USERLOGIN: `${authApi}/loginuser`,
  COMPANYLOGIN: `${authApi}/logincompany`,
  USERSIGNUP: `${authApi}/registeruser`,
  COMPANYSIGNUP: `${authApi}/sigup`,
  DELETEUSER: `${authApi}/deleteuser`,
  UPDATEUSER: `${authApi}/updateuser`,
  CHANGE_ROLE: `${authApi}/change-role`,
  ADDATTENDANCE: `${authApi}/addattendance`,
};
const GET = {
  GETUSERS: `${getApi}/getusers`,
  GETCOMPANY: `${getApi}/getcompany`,
  GETATTENDANCE: `${getApi}/getattendance`,
};
export { AUTH, GET };
