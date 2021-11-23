import * as React from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListSubheader } from '@mui/material';

export type componentElement = {
    id: string,
    content: JSX.Element
}

export interface PopoverListProps {
    anchorEl: HTMLButtonElement | null
    componentArray: componentElement[]
    onClose: () => void
    buttonComponent: JSX.Element
    header?: string
}

const PopoverList: React.FC<PopoverListProps> = ({ anchorEl, componentArray, onClose, buttonComponent, header }) => {
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            {buttonComponent}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List>
                    {header && <ListSubheader sx={{ fontWeight: 600, fontSize: "16px" }}>{header}</ListSubheader>}

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