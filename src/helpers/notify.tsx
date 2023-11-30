import IconButton from "@mui/material/IconButton";
import { closeSnackbar, enqueueSnackbar } from "notistack"
import CloseIcon from '@mui/icons-material/Close';

export type TypeError = "error" | "success" | "warning" | "info"

export const customNotify = (type: TypeError, message: string) => {
    enqueueSnackbar(message, { variant: type });
}

export const errorNotify = (message: string) => {
    
    enqueueSnackbar(message,
        {
            variant: "error",
            action: (key) => (
                <IconButton onClick={() => closeSnackbar(key)}>
                    <CloseIcon />
                </IconButton>
            ),
            autoHideDuration: 2500
        });
}

export const successNotify = (message: string) => {
    enqueueSnackbar(message, { variant: "success" });
}

export const warningNotify = (message: string) => {
    enqueueSnackbar(message, { variant: "warning" });
}

export const infoNotify = (message: string) => {
    enqueueSnackbar(message, { variant: "info" });
}

