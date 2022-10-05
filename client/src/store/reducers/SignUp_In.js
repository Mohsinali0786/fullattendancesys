import { REGISTER, REGISTERCOMPANY, LOGININ, LOGOUT, DELETE, EDIT, ADDDATE } from '../type'

const initialState = {

    Users: [

    ],
    Company: [],
    LoginUser: {},
    IsLoggedIn: null,
    Attendance: []

}
const AllUsers = (state = initialState, action) => {
    switch (action.type) {
        // case "REGISTER":
        //     console.log('Action .payload====>', action.payload)

        //     return {
        //         ...state,
        //         Users: [...state.Users, action.payload],
        //     }
        case REGISTERCOMPANY:

            console.log('REGISTERCOMPANY')
            return {
                ...state,
                Company: [...state.Company, action.payload],

            }
        // }

        case LOGININ:
            // var filtereddata = ''
            const data = action.payload
            console.log('data====>', data)
            let myLoginUser = {
                LoginUser: data.mydata,
                IsLoggedIn: data.IsLoggedIn,
            }
            return {
                ...state,
                LoginUser: myLoginUser,
                Company: data.allCompanies,
                Users: data.allUsers,
                Attendance: data.allAttendance
                // IsLoggedIn: true
            }


        case LOGOUT: {
            // console.log('state.AllUsers Reducer LogOut', state.Users)

            return {
                ...state,
                // IsLoggedIn: false,
                LoginUser: action.payload
            }
        }

        case DELETE:
            console.log('action.payload Delete', action.payload)
            return {
                ...state,
                Users: action.payload,
            }

        // {
        //     let updatedArr = []
        //     let filteredData = state.Users.find((user) => user.id === action.payload.id)
        //     state.Users.map((v) => {
        //         if (v.id === action.payload.id) {
        //             // console.log('action.payload.userRole', action.payload.userRole)
        //             if (v.userRole === 'admin') {
        //                 Swal.fire({
        //                     icon: 'error',
        //                     title: 'Oops...',
        //                     text: 'Admins are not deletable !',
        //                 })
        //                 v.id = v.id;
        //                 v.FirstName = filteredData.FirstName;
        //                 v.LastName = filteredData.LastName;
        //                 v.Email = filteredData.Email;
        //                 v.Password = filteredData.Password;
        //                 v.isDeleted = false

        //             }
        //             else {
        //                 v.userRole = action.payload.userRole;
        //                 v.id = v.id;
        //                 v.FirstName = filteredData.FirstName;
        //                 v.LastName = filteredData.LastName;
        //                 v.Email = filteredData.Email;
        //                 v.Password = filteredData.Password;
        //                 v.isDeleted = action.payload.isDeleted
        //             }


        //         }
        //         updatedArr.push(v)
        //     })

        //     return {
        //         ...state,
        //         Users: updatedArr
        //     }
        // }

        case EDIT:
            {
                let updatedArr = []
                // console.log('Edit in Reducer')
                // console.log(action.payload)
                let filteredData = state.Users.find((user) => user.id === action.payload.id)
                // state.Users.map((v) => {
                //     if (v.id === action.payload.id) {

                //         v.userRole = action.payload.userRole;
                //         v.id = v.id;
                //         v.firstName = filteredData.firstName;
                //         v.lastName = filteredData.lastName;
                //         v.email = action.payload.email;
                //         v.password = filteredData.password;

                //     }
                //     updatedArr.push(v)
                // })

                return {
                    ...state,
                    Users: [...state.Users, action.payload]
                }

            }


        case "EDITCOMPANY":
            {
                let updatedArr = []
                console.log('action.payload', action.payload)
                // let filteredData = state.Users.find((user) => user.id === action.payload.id)
                state.Company.map((v) => {
                    if (v.id === action.payload.id) {

                        console.log('Edit in Reducer')
                        v.userRole = action.payload.userRole;
                        v.CompanyName = action.payload.CompanyName;
                        v.id = v.id;
                        v.Email = action.payload.Email;
                        v.ContactNo = action.payload.ContactNo;
                        v.Address = action.payload.Address;
                        v.Password = action.payload.Password;

                    }
                    updatedArr.push(v)
                })

                return {
                    ...state,
                    Company: updatedArr
                }

            }

        case "EDITUSER":
            {
                let updatedArr = []
                console.log('action.payload', action.payload)
                let filteredData = state.Users.find((user) => user.id === action.payload.id)
                state.Users.map((v) => {
                    if (v.id === action.payload.id) {

                        // console.log('Edit in Reducer')
                        v.userRole = action.payload.userRole;
                        v.FirstName = action.payload.FirstName;
                        v.LastName = action.payload.LastName;
                        v.id = v.id;
                        v.Email = action.payload.Email;
                        v.Password = action.payload.Password;

                    }
                    updatedArr.push(v)
                })

                return {
                    ...state,
                    Users: updatedArr
                }

            }





        case ADDDATE: {
            console.log('action.payload in ADDDATE', action.payload)
            return {
                ...state,
                Attendance: action.payload
            }
        }


        // case "ResetLogin": {
        //     return {
        //         ...state,
        //         message: '',
        //         // IsLoggedIn: null,
        //     }

        // }

        default: return state

    }
}

export default AllUsers

