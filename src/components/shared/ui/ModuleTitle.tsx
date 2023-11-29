import Typography from '@mui/material/Typography'

interface ModuleTitleProps {
  title: string;
}
const ModuleTitle = ({ title }: ModuleTitleProps) => {
  return (
    <Typography variant="h3" fontWeight={"bold"}>{title}</Typography>
  )
}

export default ModuleTitle