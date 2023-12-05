import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { DRAWER_WIDTH } from '../../constants/mainDrawer';
import { NavItem } from '../../interfaces/_common';
import NavListItem from './NavListItem';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    backgroundColor: '#434b53',
    '& .MuiDrawer-paper': {
        width: DRAWER_WIDTH,
        backgroundColor: '#434b53',
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
            // href: '/modulos/pagares/consulta',
            icon: <HomeRoundedIcon sx={{ color: "white" }} />,
            title: 'Inicio',
        },
        {
            // href: '/modulos/pagares/consulta',
            icon: <RequestPageOutlinedIcon sx={{ color: "white" }} />,
            title: 'Gestiones Pagarés',
            children: [
                {
                    href: '/moduloPagares/consulta',
                    title: 'Consultas de Pagarés',
                },
                {
                    href: '/moduloPagares/acusacion',
                    title: 'Acuses digitalizados',
                },
                {
                    href: '/moduloPagares/entrega',
                    title: 'Entrega de Pagarés',
                },
            ]
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

            <StyledDrawerContent sx={{ paddingTop: 2 }}>
                <List>
                    {navItems.map((item, index) => (<NavListItem key={index} item={item} />))}
                </List>
            </StyledDrawerContent>
        </StyledDrawer>
    );
};

export default MainDrawer;
