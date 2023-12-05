import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, SxProps, Theme } from '@mui/material';

interface SearchButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children: React.ReactNode;
    disabled?: boolean;
    isLoading?: boolean;
    sx?: SxProps<Theme>
}
const SearchButton = ({ onClick, children, disabled = false, isLoading = false, sx }: SearchButtonProps) => {
    return (
        <Button
            variant={"outlined"}
            onClick={onClick}
            sx={sx}
            startIcon={!isLoading ? <SearchIcon /> : <CircularProgress size={20} />}
            disabled={disabled || isLoading}
        >
            {children}
        </Button>
    )
}

export default SearchButton