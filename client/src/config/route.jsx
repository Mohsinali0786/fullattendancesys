import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, CompanySignup, UserSignup, Admin, Home, CompanyProfile, UserProfile, Students } from '../Screen'
import allPaths from './paths'


function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path={allPaths?.LOGIN} element={<Login/>} />
                <Route path={allPaths?.USERSIGNUP} element={<UserSignup/>} />
                <Route path={allPaths?.COMPANYSIGNUP} element={<CompanySignup/>} />
                <Route path={allPaths?.ADMINPAGE} element={<Admin/>} />
                <Route path={allPaths?.HOME} element={<Home/>} />
                <Route path={allPaths?.STUDENT} element={<Students/>} />
                <Route path={allPaths?.COMPANYPROFILE} element={<CompanyProfile/>} />
                <Route path={allPaths?.USERPROFILE} element={<UserProfile/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter