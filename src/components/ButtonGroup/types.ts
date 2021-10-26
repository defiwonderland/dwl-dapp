export interface ButtonGroupProps {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
    groupArray: string[],
    bgcolor: string,
    focuscolor: string,
    padding?: string,
}