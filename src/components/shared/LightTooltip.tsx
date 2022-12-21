import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#FFFFFF',
    //   maxWidth: 250,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[2],
      borderRadius: 5,
      borderColor: '#708090',
      fontSize: 14,
    },
  }));