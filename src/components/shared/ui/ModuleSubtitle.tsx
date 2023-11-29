import Typography from '@mui/material/Typography'

interface ModuleSubtitleProps {
    subtitle: string;
}
const ModuleSubtitle = ({ subtitle }: ModuleSubtitleProps) => {
    return (
        <Typography variant="h6">{subtitle}</Typography>
    )
}

export default ModuleSubtitle