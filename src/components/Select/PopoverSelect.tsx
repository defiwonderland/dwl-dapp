import * as React from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import { StyledIconButton } from '../Button';
import ListItemButton from '@mui/material/ListItemButton';
import { PopoverSelectProps } from './types';

const PopoverSelect: React.FC<PopoverSelectProps> = ({ onClick, options, iconImg }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getListValue = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        handleClose()
        onClick(event)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <StyledIconButton aria-describedby={id} onClick={handleClick} bgcolor="#c241b4">
                {iconImg}
            </StyledIconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List>
                    {
                        options.map(option => (
                            <ListItemButton key={option.value} onClick={getListValue}>{option.label}</ListItemButton>
                        ))
                    }
                </List>
            </Popover>
        </div >
    );
}

export default PopoverSelect