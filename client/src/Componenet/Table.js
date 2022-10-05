import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from 'react';
import LottieControl from '../Componenet/lottie'



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function CustomizedTables(props) {
    // console.log(props?.UserEmail, "=======-----------==>")

    // const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // const Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    console.log(props?.AllStudents, "All Students=======-----------==>")
    // const mydate = new Date()

    const mystate = useSelector((state) => state)

    const AllAttendance = mystate.AllUsers.Attendance
    console.log('My Datataaaa AllAttendance', AllAttendance)

    const filteredData = props.AllStudents?.filter(data => data.email === props.UserEmail)
    // console.log('My Datataaaa', filteredData)

    const currLoginUser = mystate?.AllUsers?.LoginUser?.LoginUser
    // console.log('currLoginUser=====>', currLoginUser)
    let filteruser;
    let filterCompany
    let CompanyName;
    if (currLoginUser?.type === 'company') {
        filterCompany = mystate.AllUsers.Company?.find((v) => v.email === currLoginUser.email)
        CompanyName = filterCompany?.companyName
        // console.log('CompanyNAme===>', CompanyName)
        filteruser = mystate.AllUsers.Users?.find((v) => v.companyName === CompanyName)
        console.log('filteruser in table', filteruser)

    }
    else {
        filteruser = mystate.AllUsers?.Users?.find((v) => v.email === currLoginUser?.email)
        console.log('filteruser in Table Component', filteruser)
        console.log('currLoginUser?.Type', currLoginUser)



    }
    return (
        // <></>
        <>
            {

                currLoginUser?.type === 'company' ?
                    < TableContainer component={Paper}>
                        {
                            AllAttendance !== null && AllAttendance?.find((v) => v.companyName === CompanyName) ?
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell >User Id</StyledTableCell>

                                            <StyledTableCell >Company</StyledTableCell>
                                            <StyledTableCell>Email</StyledTableCell>
                                            <StyledTableCell >Current Date</StyledTableCell>
                                            <StyledTableCell >Current Time</StyledTableCell>
                                            <StyledTableCell >Current Day</StyledTableCell>
                                            <StyledTableCell >Status</StyledTableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {AllAttendance?.map((row, index) => {
                                            if (CompanyName === row.companyName) {
                                                return (
                                                    <StyledTableRow key={index}>
                                                        <StyledTableCell >{row._id}</StyledTableCell>

                                                        <StyledTableCell >{row.companyName}</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row">
                                                            {row.email}
                                                        </StyledTableCell>
                                                        <StyledTableCell >{row.currDate}</StyledTableCell>
                                                        <StyledTableCell >{row.currTime}</StyledTableCell>
                                                        <StyledTableCell >{row.currDay}</StyledTableCell>
                                                        <StyledTableCell >{row.status}</StyledTableCell>
                                                    </StyledTableRow>
                                                )
                                            }

                                        })}
                                    </TableBody>
                                </Table> :
                                <>

                                    <LottieControl />
                                </>
                        }
                    </TableContainer>
                    :
                    props.AllStudents && !props.UserEmail ?
                        <TableContainer component={Paper}>
                            {
                                props.AllStudents !== null && props.AllStudents.find((v) => v.companyName === currLoginUser?.company) ?

                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell >User Id</StyledTableCell>

                                                <StyledTableCell >Company</StyledTableCell>
                                                <StyledTableCell>Email</StyledTableCell>
                                                <StyledTableCell >Current Date</StyledTableCell>
                                                <StyledTableCell >Current Time</StyledTableCell>
                                                <StyledTableCell >Current Day</StyledTableCell>
                                                <StyledTableCell >Status</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {props.AllStudents?.map((row, index) => {
                                                // if(row.CurrDate!==CurrDate)
                                                // {

                                                // }
                                                if (currLoginUser.company === row?.companyName) {
                                                    return (
                                                        <StyledTableRow key={index}>
                                                            <StyledTableCell >{row._id}</StyledTableCell>

                                                            <StyledTableCell >{row.companyName}</StyledTableCell>
                                                            <StyledTableCell component="th" scope="row">{row.email}</StyledTableCell>
                                                            <StyledTableCell >{row.currDate}</StyledTableCell>
                                                            <StyledTableCell >{row.currTime}</StyledTableCell>
                                                            <StyledTableCell >{row.currDay}</StyledTableCell>
                                                            <StyledTableCell >{row.status}</StyledTableCell>
                                                        </StyledTableRow>
                                                    )
                                                }

                                            })}
                                        </TableBody>
                                    </Table> :
                                    // ""
                                    <LottieControl />
                            }
                        </TableContainer>
                        :
                        props.AllStudents && props.UserEmail ?
                            < TableContainer component={Paper}>
                                {
                                    filteredData.length !== 0 && filteredData.find((v) => v.companyName === currLoginUser?.company) ?
                                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell >User Id</StyledTableCell>

                                                    <StyledTableCell >Company</StyledTableCell>
                                                    <StyledTableCell>Email</StyledTableCell>
                                                    <StyledTableCell >Current Date</StyledTableCell>
                                                    <StyledTableCell >Current Time</StyledTableCell>
                                                    <StyledTableCell >Current Day</StyledTableCell>
                                                    <StyledTableCell >Status</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    filteredData?.map((row, index) => {
                                                        console.log('row====>', row)
                                                        if (row.companyName === currLoginUser.company) {
                                                            return (
                                                                <StyledTableRow key={index}>
                                                                    <StyledTableCell >{row._id}</StyledTableCell>

                                                                    <StyledTableCell >{row.companyName}</StyledTableCell>
                                                                    <StyledTableCell component="th" scope="row">
                                                                        {row.email}
                                                                    </StyledTableCell>
                                                                    <StyledTableCell >{row.currDate}</StyledTableCell>
                                                                    <StyledTableCell >{row.currTime}</StyledTableCell>
                                                                    <StyledTableCell >{row.currDay}</StyledTableCell>
                                                                    <StyledTableCell >{row.status}</StyledTableCell>
                                                                </StyledTableRow>
                                                            )
                                                        }

                                                    })
                                                }
                                            </TableBody>
                                        </Table> :

                                        <LottieControl />
                                }
                            </TableContainer>
                            :

                            <LottieControl />
            }
        </>
    );
}
