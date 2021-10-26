export interface SwitchProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    labelText?: string,
    checked: boolean,
    textcolor?: string
}