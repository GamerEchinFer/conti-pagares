import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2';
import ModuleTitle from './ModuleTitle';
import ModuleSubtitle from './ModuleSubtitle';

interface ModuleContentWrapper {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}
const ModuleContentWrapper = ({ title, subtitle, children }: ModuleContentWrapper) => {
    return (
        <Box sx={{
            // padding: 5,
        }}>
            <Grid container spacing={2} >
                <Grid xs={12}>
                    <ModuleTitle title={title} />
                </Grid>
                <Grid xs={12}>
                    <ModuleSubtitle subtitle={subtitle} />
                </Grid>
                {children}
            </Grid>
        </Box>
    )
}

export default ModuleContentWrapper