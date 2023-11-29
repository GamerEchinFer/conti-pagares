import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import StarBorder from '@mui/icons-material/StarBorder';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { DRAWER_WIDTH } from '../../constants/mainDrawer';
import { NavItem } from '../../interfaces/_common';
import Collapse from '@mui/material/Collapse';
import NavListItem from './NavListItem';

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         root: {
//             display: 'flex',
//         },
//         appBar: {
//             zIndex: theme.zIndex.drawer + 1,
//         },
//         menuButton: {
//             marginRight: theme.spacing(2),
//         },
//         drawer: {
//             width: DRAWER_WIDTH,
//             flexShrink: 0,
//         },
//         drawerPaper: {
//             width: DRAWER_WIDTH,
//         },
//         drawerContainer: {
//             overflow: 'auto',
//         },
//         content: {
//             flexGrow: 1,
//             padding: theme.spacing(3),
//         },
//     }),
// );

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    backgroundColor: '#1D428A',
    '& .MuiDrawer-paper': {
        width: DRAWER_WIDTH,
        backgroundColor: '#1D428A',
        color: 'white',
        // boxSizing: 'border-box',
    },
}));

const StyledDrawerContent = styled('div')(({ theme }) => ({
    overflow: 'auto',
}))

const MainDrawer = () => {
    const [open, setOpen] = useState(false);

    const navItems: NavItem[] = [
        {
            href: '/app/dashboard',
            icon: <InboxIcon sx={{ color: "white" }} />,
            title: 'Dashboard',
            children: [
                {
                    href: '/app/dashboard',
                    icon: <StarBorder sx={{ color: "white" }} />,
                    title: 'Starred',
                    children: [
                        {
                            href: '/app/dashboard',
                            icon: <StarBorder sx={{ color: "white" }} />,
                            title: 'Starred',
                        },
                        {
                            href: '/app/dashboard',
                            icon: <StarBorder sx={{ color: "white" }} />,
                            title: 'Starred',
                        },
                        {
                            href: '/app/dashboard',
                            icon: <StarBorder sx={{ color: "white" }} />,
                            title: 'Starred',
                        },
                    ]
                },
                {
                    href: '/app/dashboard',
                    icon: <StarBorder sx={{ color: "white" }} />,
                    title: 'Starred',
                },
                {
                    href: '/app/dashboard',
                    icon: <StarBorder sx={{ color: "white" }} />,
                    title: 'Starred',
                },
            ]
        },
        {
            href: '/app/dashboard',
            icon: <InboxIcon sx={{ color: "white" }} />,
            title: 'Dashboard',
        },
        {
            href: '/app/dashboard',
            icon: <InboxIcon sx={{ color: "white" }} />,
            title: 'Dashboard',
        },
        {
            href: '/app/dashboard',
            icon: <InboxIcon sx={{ color: "white" }} />,
            title: 'Dashboard',
        },
    ];

    return (
        <StyledDrawer
            variant="permanent"
            anchor="left"
            open={open}
        >

            {/* Esto es para evitar que el contenido quede oculto detrás del APP BAR.*/}
            {/* https://mui.com/material-ui/react-drawer/#clipped-under-the-app-bar */}
            <Toolbar />

            <StyledDrawerContent>
                <List>
                    {navItems.map((item, index) => (<NavListItem key={index} item={item} />))}
                </List>
            </StyledDrawerContent>
        </StyledDrawer>
    );
};

export default MainDrawer;
