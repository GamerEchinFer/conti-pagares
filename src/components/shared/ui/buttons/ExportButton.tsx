import Button from '@mui/material/Button'

interface ExportButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children: React.ReactNode;
    disabled?: boolean;
}
const ExportButton = ({ onClick, children, disabled = false, ...props }: ExportButtonProps) => {
    return (
        <Button variant={"contained"} onClick={onClick} disabled={disabled} {...props}>{children}</Button>
    )
}

export default ExportButton