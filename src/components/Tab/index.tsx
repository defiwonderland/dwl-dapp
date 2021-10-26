import * as React from 'react';
import Box from '@mui/material/Box';
import { StyledTabs, StyledTab } from './elements';
import { TabProps } from './types';

const CustomTab: React.FC<TabProps> = ({ onChange, value, labelText, smbgcolor, bgcolor, selectedcolor, fontSize, textcolor, border }) => {
    return (
        <Box sx={{
            width: "90%"
        }}>
            <StyledTabs
                onChange={onChange}
                value={value}
                variant="fullWidth"
                smbgcolor={smbgcolor}
                bgcolor={bgcolor}
                TabIndicatorProps={{
                    style: {
                        background: "none"
                    }
                }}
            >
                {
                    labelText.map((label) => (
                        <StyledTab
                            key={label}
                            label={label}
                            selectedcolor={selectedcolor}
                            fontSize={fontSize}
                            textcolor={textcolor}
                            border={border}
                        />
                    ))
                }
            </StyledTabs>
        </Box>
    );
}

export default CustomTab