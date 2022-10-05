import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useSelector } from 'react-redux';
export default function NativeSelectDemo({ role, changeRole, option }) {

    console.log('Options', option)
    const mystate = useSelector((state) => state.AllUsers)
    const handleInputChange = (event) => {
        console.log('event===>')
        changeRole(event.target.value)
    }
    return (
        <Box sx={{ minWidth: 20 }}>
            <FormControl >
                <NativeSelect
                    defaultValue={role}
                    inputProps={{
                        name: 'role',
                        id: 'uncontrolled-native',
                    }}
                    onChange={handleInputChange}
                >
                    <option value={option}>{option}</option>
                    {
                        option !== 'admin' ?
                            <option value='admin'>admin</option>
                            :
                            <option value='user'>user</option>
                    }
                </NativeSelect>
            </FormControl>
        </Box>
    );
}
