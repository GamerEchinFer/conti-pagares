import { Button, ButtonBaseProps, ButtonProps, styled } from '@mui/material';

    interface StyledButtonProps extends ButtonBaseProps {
        borderRadius?: string;
    }   
    
export const ButtonCustom = styled(Button)
<StyledButtonProps>((
{ 
    borderRadius=8,
}) =>({
borderRadius: borderRadius,
'&.MuiButton-root:active':{
    boxShadow:'none'
},
'&.MuiButton-root:hover':{
    boxShadow:'none'
}
}));