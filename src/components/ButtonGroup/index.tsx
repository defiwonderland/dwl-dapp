import * as React from 'react';
import Box from '@mui/material/Box';
import { StyledButton } from './elements';
import { ButtonGroupProps } from './types';

const StyledButtonGroup: React.FC<ButtonGroupProps> = ({ groupArray, onClick, bgcolor, focuscolor, padding }) => {
    return (
        <Box sx={{
            width: "100%",
            display: 'flex',
            alignItems: "center",
            justifyContent: "space-between",
            margin: "10px 0"
        }}>
            {
                groupArray.map((item) => (
                    <StyledButton key={item} bgcolor={bgcolor} focuscolor={focuscolor} onClick={onClick} padding={padding}>{item.split(" ")[0]} <br /> {item.split(" ")[1]}</StyledButton>
                ))
            }
        </Box >
    );
}

export default StyledButtonGroup
