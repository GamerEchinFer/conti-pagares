import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress } from '@mui/material';

interface SearchButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children: React.ReactNode;
    disabled?: boolean;
    isLoading?: boolean;
}
const SearchButton = ({ onClick, children, disabled = false, isLoading = false }: SearchButtonProps) => {
    return (
        <Button variant={"outlined"} onClick={onClick} startIcon={!isLoading ? <SearchIcon /> : <CircularProgress size={20} />} disabled={disabled || isLoading}>{children}</Button>
    )
}

export default SearchButton