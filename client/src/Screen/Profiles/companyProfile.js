import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Sign_Up, editCompanyData } from '../../store/actions/index'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios';
import { EyeInvisibleTwoTone } from '@ant-design/icons'
function CompanyProfile() {

    // let dataFromLS = JSON.parse(localStorage.getItem('Users'))
    // dataFromLS = dataFromLS.AllUsers.Company
    // console.log('dataFromLS Company Profile', dataFromLS)
    const [companyName, setCompanyName] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordShown, setPasswordShown] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const mystate = useSelector((state) => state)
    const currLoginUser = mystate?.AllUsers.LoginUser?.LoginUser?.email
    console.log('currLoginUser in CompanyProf===>', currLoginUser)
    const filterdata = mystate?.AllUsers?.Company.find((v) => v.email === currLoginUser)
    console.log('filterdata in CompanyProf===>', filterdata)


    const dispatch = useDispatch()
    let data = {
        id: filterdata?.id,
        companyName,
        contactNo,
        address,
        email,
        password,
        type: 'company',
        userRole: 'admin',
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
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2, 3})+$/;
        if (mailformat.test(email)) {

            // dispatch(editCompanyData(data))

        }

        // dispatch(editCompanyData(data))
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
                                    <p style={{ textAlign: 'left' }}>Company Name</p>
                                    <td className='iconswithinputs'>
                                        <PersonIcon className='icons' />
                                        {
                                            !isEdit && isUpdate ?
                                                <>
                                                    <input name='companyName' required value={companyName} placeholder='CompanyName' />
                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='companyName' required value={filterdata?.companyName} placeholder='CompanyName' />
                                                    </> :
                                                    <>
                                                        <input name='companyName' required value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder='CompanyName' />
                                                    </>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <p style={{ textAlign: 'left' }}>Conatact Number</p>
                                    <td className='iconswithinputs'>
                                        <PersonIcon className='icons' />
                                        {
                                            !isEdit && isUpdate ?
                                                <>
                                                    <input name='contactNo' required value={contactNo} placeholder='ContactNo' />
                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='contactNo' required value={filterdata?.contactNo} placeholder='ContactNo' />
                                                    </> :
                                                    <>
                                                        <input name='contactNo' required value={contactNo} onChange={(e) => setContactNo(e.target.value)} placeholder='ContactNo' />
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
                                    <p style={{ textAlign: 'left' }}>Address</p>
                                    <td className='iconswithinputs'>
                                        <EmailIcon className='icons' />
                                        {
                                            !isEdit && isUpdate ?
                                                <>
                                                    <input name='address' required value={address} placeholder='Address' />
                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='address' required value={filterdata?.address} placeholder='Address' />
                                                    </> :
                                                    <>
                                                        <input name='Address' required value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' />
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
                                                        <input name='password' type={passwordShown ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Address' />
                                                        <EyeInvisibleTwoTone style={{ position: 'relative', left: '-20px' }} onClick={() => { togglePassword() }} className='VisibleIcon' />
                                                    </>
                                        }

                                    </td>
                                </tr>

                                <tr>
                                    {/* <td colSpan={2} style={{ textAlign: 'center', padding: '30px 0px 20px 0px' }}>
                                        {
                                            !isEdit && isUpdate ?
                                                <Button variant='contained' className='loginBtn' onClick={() => EditBtn()}>Edit</Button>
                                                :
                                                !isEdit ?
                                                    <Button variant='contained' className='loginBtn' onClick={() => EditBtn()}>Edit</Button> :

                                                    < Button variant='contained' className='loginBtn' onClick={() => UpdateBtn()}> Update</Button>
                                        }
                                    </td> */}
                                </tr>

                            </table>
                        </form >
                    </div>
                </div>
            </div >

        </div >

    )
}
export default CompanyProfile