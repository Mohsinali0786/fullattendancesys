import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Sign_Up, editUserData } from '../../store/actions/index'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { EyeInvisibleTwoTone } from '@ant-design/icons'
import axios from 'axios';
import { GET, AUTH } from "../../utils/api";
function UserProfile() {

    // let dataFromLS = JSON.parse(localStorage.getItem('Users'))
    // dataFromLS = dataFromLS.AllUsers.Company
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordShown, setPasswordShown] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const Navigate = useNavigate()
    const mystate = useSelector((state) => state)
    const currLoginUser = mystate?.AllUsers.LoginUser?.LoginUser?.email
    console.log('currLoginUser in UserProf===>', currLoginUser)
    const filterdata = mystate?.AllUsers?.Users.find((v) => v.email === currLoginUser)
    console.log('filterdata in UserProf===>', filterdata._id)

    const dispatch = useDispatch()
    let data = {
        id: filterdata?._id,
        firstName,
        lastName,
        address,
        email,
        password,
        type: 'user',
        userRole: filterdata?.userRole,
        isDeleted: false

    }

    const EditBtn = () => {
        setIsEdit(true)
    }
    const UpdateBtn = () => {
        setIsEdit(false)
        setIsUpdate(true)
        checkEmailIsValid()
    }

    const checkEmailIsValid = () => {
        console.log('updated running', email)


        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log('updated running', mailformat.test(email))
        if (mailformat.test(email)) {
            axios.post(`${AUTH?.UPDATEUSER}/${filterdata._id}`, data).then((res) => {
                console.log('Edit Res===>', res)
                if (res.data.status === 'success') {
                    // dispatch({
                    //     type: "EDIT",
                    //     payload: res.data.AllUsers
                    // })
                    Swal.fire({
                        icon: res.data.status,
                        text: res.data.message,
                    })
                }
                else {
                    Swal.fire({
                        icon: res.data.status,
                        text: res.data.message,
                    })
                }
            }).catch((err) => {
                console.log('err', err)
            })



        }

        // dispatch(editUserData(data))

    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }
    return (
        <div>
            <div >
                <div>
                    <h1 style={{ textAlign: 'center', backgroundColor: 'rgb(131 181 166)', color: 'white' }}>Attendance Management System</h1>
                </div>
                <h2 className='UserProfile'>User Profile</h2>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
                    <div className='Editform-company-prof'>
                        <form className='signUpForm'>
                            <div className='UserIconDiv'>
                            </div>
                            <table className='tablestyling'>
                                <tr >
                                    <p style={{ textAlign: 'left' }}>First Name</p>
                                    <td className='iconswithinputs'>
                                        <PersonIcon className='icons' />
                                        {
                                            !isEdit && isUpdate ?
                                                <>
                                                    <input name='firstName' required value={firstName} placeholder='FirstName' />
                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='firstName' required value={filterdata?.firstName} placeholder='FirstName' />
                                                    </> :
                                                    <>
                                                        <input name='firstName' required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='FirstName' />
                                                    </>
                                        }
                                    </td>

                                </tr>
                                <tr>
                                    <p style={{ textAlign: 'left' }}>LastName</p>
                                    <td className='iconswithinputs'>
                                        <PersonIcon className='icons' />
                                        {
                                            !isEdit && isUpdate ?
                                                <>
                                                    <input name='lastName' required value={lastName} placeholder='LastName' />
                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='lastName' required value={filterdata?.lastName} placeholder='LastName' />
                                                    </> :
                                                    <>
                                                        <input name='lastName' required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='LastName' />
                                                    </>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <p style={{ textAlign: 'left' }}>Email</p>

                                    <td className='iconswithinputs'>
                                        <EmailIcon className='icons' />
                                        {
                                            !isEdit && isUpdate ?
                                                <>
                                                    <input name='email' required value={email} placeholder='Email' />
                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='email' required value={filterdata?.email} placeholder='Email' />
                                                    </> :
                                                    <>
                                                        <input name='email' required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                                                    </>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <p style={{ textAlign: 'left' }}>Password</p>

                                    <td className='iconswithinputs'><LockOpenIcon className='icons' />

                                        {
                                            !isEdit && isUpdate ?
                                                <>
                                                    <input name='password' type={passwordShown ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Passoword' required />
                                                    <EyeInvisibleTwoTone style={{ position: 'relative', left: '-20px' }} onClick={() => { togglePassword() }} className='VisibleIcon' />

                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='password' type={passwordShown ? "text" : "password"} required value={filterdata?.password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' />
                                                        <EyeInvisibleTwoTone style={{ position: 'relative', left: '-20px' }} onClick={() => { togglePassword() }} className='VisibleIcon' />
                                                    </> :
                                                    <>
                                                        <input name='password' required value={password} type={passwordShown ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                                                        <EyeInvisibleTwoTone style={{ position: 'relative', left: '-20px' }} onClick={() => { togglePassword() }} className='VisibleIcon' />
                                                    </>
                                        }

                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={2} style={{ textAlign: 'center', padding: '30px 0px 20px 0px' }}>
                                        {
                                            !isEdit && isUpdate ?
                                                <Button variant='contained' className='loginBtn' onClick={() => EditBtn()}>Edit</Button>
                                                :
                                                !isEdit ?
                                                    <Button variant='contained' className='loginBtn' onClick={() => EditBtn()}>Edit</Button> :

                                                    < Button variant='contained' className='loginBtn' onClick={() => UpdateBtn()}> Update</Button>
                                        }
                                    </td>
                                </tr>

                            </table>
                        </form >
                    </div>
                </div>
            </div >

        </div >

    )
}
export default UserProfile