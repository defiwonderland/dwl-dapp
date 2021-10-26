import * as React from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import { IconButton } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { BsThreeDotsVertical } from "react-icons/bs"

export type componentElement = {
    id: string,
    content: JSX.Element
}

export interface PopoverListProps {
    componentArray: componentElement[]
}

const PopoverList: React.FC<PopoverListProps> = ({ componentArray }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <IconButton aria-describedby={id} onClick={handleClick}>
                <BsThreeDotsVertical width="18px" height="18px" />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <List>
                    {
                        componentArray.map(component => (
                            <ListItem key={component.id}>
                                {component.content}
                            </ListItem>
                        ))
                    }
                </List>
            </Popover>
        </div >
    );
}

export default PopoverList