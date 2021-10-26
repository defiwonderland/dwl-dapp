export interface TabProps {
    onChange: (event: React.SyntheticEvent, newValue: number) => void
    labelText: string[],
    value: number,
    smbgcolor?: string,
    bgcolor?: string,
    selectedcolor?: string,
    fontSize?: string,
    textcolor?: string,
    border?: string
}