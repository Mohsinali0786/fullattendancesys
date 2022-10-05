import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import BasicSelect from './basicMenu'
import { deleteData, editData } from '../store/actions/index'
import LottieControl from '../Componenet/lottie'
import axios from 'axios';
import Swal from 'sweetalert2';
import { GET, AUTH } from '../utils/api'

export default function MyDataGrid() {
    const [deleteBtnClicked, setDeleteBtnClicked] = useState(false)
    const [editBtnClicked, setEditBtnClicked] = useState(false)
    const [role, setRole] = useState('')
    const dispatch = useDispatch()
    const wholestate = useSelector((state) => state.AllUsers)

    const mystate = useSelector((state) => state.AllUsers.Users)
    console.log('wholestate in datagrid', mystate)
    const currLoginUser = wholestate.LoginUser?.LoginUser
    // console.log('wholestate in datagrid', currLoginUser)


    let filteruser;
    let filterCompany
    let CompanyName;
    if (currLoginUser?.type !== 'company') {
        // console.log('iffffffffffffffffff')
        filteruser = wholestate.Users?.find((v) => v.email === currLoginUser?.email)
        CompanyName = filteruser?.CompanyName
        filterCompany = wholestate.Company?.find((v) => v.CompanyName === CompanyName)
    }
    else {
        filterCompany = wholestate?.Company?.find((v) => v.email === currLoginUser.email)
        // console.log('filterCompany in datagrid', filterCompany)
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 100,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 100,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'email',
            width: 170,
            editable: true,
        },
        {
            field: "role",
            width: 120,
            headerName: 'Role',
            type: 'role',
            editable: true,
            // flex: 1,

            renderCell: (cellValues) => {
                // mystate.find((v) => console.log('{}', v.email === cellValues.row.email))
                console.log('cellValues', filterCompany?.companyName)


                const filter = mystate.find((v) => v.email === cellValues.row.email && v.companyName === filterCompany?.companyName)
                // console.log('filter for user', filter)
                // console.log('filter for role', filter.userRole)

                return (
                    <BasicSelect option={filter?.userRole} role={role} changeRole={setRole} />
                );
            }
        },
        {
            field: "Edit",
            width: 120,
            // flex: 1,
            editable: true,

            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        className='EditDelBtn'
                        onClick={(event) => {
                            // dispatch(editData(cellValues, role));
                            editUser(cellValues, role)
                            // console.log('cellValues in Edit',cellValues)
                        }}
                    >Edit
                    </Button>
                );
            }
        },
        {
            field: "actions",
            width: 120,
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        className='EditDelBtn'
                        onClick={(event) => {
                            // dispatch(deleteData(cellValues, role));
                            deleteUser(cellValues, role)
                        }}
                    >
                        Delete
                    </Button >
                );
            }
        }


    ];

    useEffect(() => {
        axios.get(GET?.GETUSERS)
            .then((res) => {
                // console.log(res.data?.status)
                console.log(res.data.AllUsers, "=res=")
                // setAllUsers(res.data.AllUsers)
                dispatch({
                    type: "DELETE",
                    payload: res.data.AllUsers
                })

            }).catch((err) => {
                console.log('Error====>', err)
            })


        setDeleteBtnClicked(false)


    }, [deleteBtnClicked === true])

    let rows = [];

    mystate.map((user, id) => {
        // console.log('userEmail', user.Email)
        // console.log('currLoginUser.Email', filterCompany?.companyName)
        if (user.type !== 'company') {
            if (user.companyName === filterCompany?.companyName) {
                console.log('hello', user)
                if (!user?.isDeleted) {
                    rows.push(
                        { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, key: id, userRole: user.userRole }

                    )
                }
            }

        }
    })
    // const deleteData = (v) => {
    // setDeleteBtnClicked(true)


    // let filtered = mystate.filter((user, id) => user.id !== v.id)
    // console.log(filtered)



    // mystate.filter((user, id) => {

    //     console.log('user====>', user.id)
    //     console.log('Clicked Id====>', v.id)


    //     if (user.id === v.id) {
    //         // mystate.splice(user.id, 1)
    //         // console.log('If running')
    //     }
    // })

    // console.log('Updated State ', mystate)
    // }
    // const editData = (e, v) => {
    //     setEditBtnClicked(true)

    //     mystate.filter((user, id) => {

    //         if (user.id === v.id)
    //             mystate
    //         console.log('If running')
    //     })

    //     console.log('Updated State ', mystate)
    // }

    // console.log('Role====>', role)

    const editUser = (cellValues, role) => {

        // console.log('cell values', role)
        setEditBtnClicked(true)
        // dispatch(deleteData(cellValues, role));

        axios.post(`${AUTH?.CHANGE_ROLE}/${cellValues.id}`, { userRole: role }).then((res) => {
            console.log('Edit Res===>', res.data)
            if (res.data.status === 'success') {
                dispatch({
                    type: "EDIT",
                    payload: res.data.AllUsers
                })
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


    const deleteUser = (cellValues, role) => {
        setDeleteBtnClicked(true)

        // dispatch(deleteData(cellValues, role));

        axios.post(`${AUTH?.DELETEUSER}/${cellValues.id}`).then((res) => {
            console.log('Delete Res===>', res)
            if (res.data.status === 'success') {
                dispatch({
                    type: "DELETE",
                    payload: res.data.AllUsers
                })
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
    const handleGetRowId = (e) => {
        console.log('handleGetRowId===>', e)
        return e.id
    }
    return (
        // <></>

        <Box sx={{ height: 400, width: '100%' }}>
            {
                rows.length !== 0 ?
                    <DataGrid
                        rows={rows}
                        getRowId={handleGetRowId}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    /> :
                    <LottieControl />
            }
        </Box>
    );
}

