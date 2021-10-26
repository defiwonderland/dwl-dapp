import * as React from 'react';
import SwitchUnstyled from '@mui/core/SwitchUnstyled';
import { Root, StyledSwitchText } from './elements';
import { Box } from '@mui/system';
import { SwitchProps } from './types';

const CustomSwitch: React.FC<SwitchProps> = ({ onChange, labelText, checked, textcolor }) => {
    const label = { componentsProps: { input: { 'aria-label': 'Demo switch' } } };

    return (
        <Box sx={{
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
            minWidth: "250px"
        }
        }>
            <SwitchUnstyled
                component={Root}
                {...label}
                onChange={onChange}
                checked={checked}

            />
            {labelText && <StyledSwitchText textcolor={textcolor}>{labelText}</StyledSwitchText>}
        </Box>
    );
}

export default CustomSwitch