import React from 'react'
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio } from '@mui/material';

export default function RadioGroup(props) {

    const { name, label, value, onChange, items } = props;

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row
                name={name}
                value={value}
                onChange={onChange}>
                {
                    items.map(
                        item => (
                            <FormControlLabel key={item.Id} value={item.Id} control={<Radio />} label={item.name} />
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    )
}
