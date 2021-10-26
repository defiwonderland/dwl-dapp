import { SelectChangeEvent } from '@mui/material/Select';

export type menuItems = {
    value: string,
    label: string
}

export interface SelectProps {
    onChange: (event: SelectChangeEvent<unknown>) => void
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    value: string
    options: menuItems[]
    startAdornment?: React.ReactNode
    iconImg: React.SVGProps<SVGSVGElement>
    bgcolor?: string
    textcolor?: string
    isPopover: boolean
}

export interface PopoverSelectProps {
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    options: menuItems[],
    iconImg: React.SVGProps<SVGSVGElement>
}