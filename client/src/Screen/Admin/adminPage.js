import { signOut } from '../../store/actions'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@mui/material'
import MyDataGrid from '../../Componenet/dataGrid'
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SideDrawer from '../../Componenet/sideDrawer'

function AdminPage() {
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const mystate = useSelector((state) => state.AllUsers)
    // console.log('Mystate in admin', mystate.LoginUser)
    // const findUser = mystate.Users.find((v) => v?.Email === mystate.LoginUser?.Email)
    let filteruser;
    // let CompanyName;
    let UserName;
    console.log(mystate.LoginUser?.LoginUser?.type === 'company', 'Admin page')
    if (mystate.LoginUser?.LoginUser?.type === 'company') {

        filteruser = mystate.Company.find((v) => v.email === mystate.LoginUser?.LoginUser?.email)
        UserName = filteruser.companyName
        // console.log('Admin Com Name', filteruser)
    }
    else {
        filteruser = mystate?.Users?.find((v) => v?.email === mystate.LoginUser?.LoginUser?.email)
        // caches.log('filterusers======>', filteruser)
        UserName = filteruser?.firstName + " " + filteruser?.lastName
    }
    let IsLoggedIn = mystate.LoginUser?.IsLoggedIn
    useEffect(() => {
        if (!IsLoggedIn) {
            Navigate('/')
        }
    }, [IsLoggedIn === false])
    const signout = () => {
        let logoutInfo = {
            IsLoggedIn: false,
        }
        dispatch(signOut(logoutInfo))
    }

    return (
        <div>
            <div className='admin-header'>
                <SideDrawer UserName={UserName} filteruser={filteruser} />
                <div>
                    <h1 className='Header-heading' >Attendance Management System</h1>
                </div>
                <div style={{ textAlign: 'center' }}>
                    {/* <Button variant='outlined' className='signout-btn' onClick={() => dispatch(signOut())}>
                    </Button> */}
                    <LogoutIcon style={{ cursor: 'pointer', color: 'white', fontSize: '25px', marginRight: '20px' }} onClick={() => signout()} />
                </div>
            </div>
            <div>
                <div className='HomePageBtn-div'>
                    {
                        filteruser?.type !== 'company' ?

                            <Button onClick={() => { Navigate('/Student') }}>Your Attendance</Button>
                            :
                            ""
                    }
                    <Button onClick={() => { Navigate('/Home') }}>Go to Home</Button>
                    <Button onClick={() => { Navigate('/SignUpForm') }}>Add User</Button>
                </div>
                {/* <h2>{CompanyName}</h2> */}
                <h3>Administrator Dashboard</h3>

                <MyDataGrid />
            </div>


        </div >

    )
}
export default AdminPage;