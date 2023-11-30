import { Box, Breakpoint, IconButton, SxProps, Theme } from "@mui/material"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import CloseIcon from '@mui/icons-material/Close';

interface ModaProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    renderTitle?: () => JSX.Element;
    content: JSX.Element;
    actions?: JSX.Element;
    maxWidth?: Breakpoint;
    fullWidth?: boolean;
    scroll?: "paper" | "body";
    fullScreen?: boolean;
    dialogTitleSxProps?: SxProps<Theme>;
    disableBackdropClick?: boolean;
    disableEscapeKeyDown?: boolean;
}
const CustomModal = ({
    open,
    onClose,
    title,
    content,
    actions,
    maxWidth = "md",
    fullWidth = false,
    renderTitle,
    scroll = "paper",
    fullScreen = false,
    dialogTitleSxProps,
    disableBackdropClick = false,
    disableEscapeKeyDown = false,
}: ModaProps) => {
    const renderTitle_ = renderTitle !== undefined ? renderTitle : () => <>{title}</>;
    return (
        <Dialog
            open={open}
            onClose={(e, reason) => {
                if (reason === "backdropClick" && disableBackdropClick === true){
                    return;
                }
                if (reason === "escapeKeyDown" && disableEscapeKeyDown === true){
                    return;
                }

                onClose();
            }}
            maxWidth={maxWidth}
            scroll={scroll}
            fullWidth={fullWidth}
            fullScreen={fullScreen}
        >
            <DialogTitle
                sx={{
                    fontSize: 30,
                    fontWeight: "bold",
                    pt: 5,
                    mb: 1,
                    ...dialogTitleSxProps,                    
                }}
            >
                {renderTitle_()}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent
                sx={{
                    p: 3
                }}
            >
                {content}
            </DialogContent>
            <DialogActions sx={{
                pb: 3,
                pr: 3,
                pL: 3,
            }}>
                {actions}
            </DialogActions>
        </Dialog>
    )
}

export default CustomModal