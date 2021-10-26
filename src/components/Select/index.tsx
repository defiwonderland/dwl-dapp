import React from "react"
import { StyledSelect, StyledBox } from "./elements"
import MenuItem from '@mui/material/MenuItem';
import { SelectProps } from "./types";
import PopoverSelect from "./PopoverSelect";
import { useWindowWidth } from "../../hooks/useWindowWidth";

const CustomSelect: React.FC<SelectProps> = ({ value, onChange, startAdornment, options, onClick, iconImg, bgcolor, isPopover, textcolor }) => {
    const windowWidth = useWindowWidth(600)

    let comp;

    if (windowWidth) {
        comp = <StyledSelect
            bgcolor={bgcolor}
            textcolor={textcolor}
            value={value}
            onChange={onChange}
            startAdornment={startAdornment}
            MenuProps={{
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center"
                }
            }}
        >
            {
                options.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))
            }
        </StyledSelect>

    } else {
        if (isPopover) {
            comp = <PopoverSelect
                onClick={onClick}
                iconImg={iconImg}
                options={options}
            />
        } else {
            comp = <StyledSelect
                bgcolor={bgcolor}
                textcolor={textcolor}
                value={value}
                onChange={onChange}
                startAdornment={startAdornment}
                MenuProps={{
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center"
                    }
                }}
            >
                {
                    options.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))
                }
            </StyledSelect>
        }
    }

    return (
        <StyledBox>
            {comp}
        </StyledBox >

    )
}

export default CustomSelect
