import * as React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Grid, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from '../assets/img/generales/logo-continental-blanco.svg';
import { useSelector } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';
import { RootState, useAppDispatch } from '../redux/store';
import { useMount } from 'ahooks';
import { postAutenticarServicio } from '../api/keycloakApi';
import { keycloakHeaders } from '../constants/constants';
import { getProductosAction } from '../redux/thunks/producto.thunks';
import { getClienteDatosAction } from '../redux/thunks/clienteDatos.thunks';

const ResponsiveAppBar = () => {

	const { usuarioKeycloack } = useSelector((state:RootState)=>state.auth);
	const router = useRouter();
    // const { keycloak } = useKeycloak();

	const handleOpenUserMenu = () => {
		//  keycloak.logout({redirectUri: process.env.NEXT_PUBLIC_HOST_VALIDO})
	};

	const imageRedirect = () => {
		if (router.pathname !== '/' && router.pathname !== '/tipoBusqueda'){
				postAutenticarServicio(keycloakHeaders).then((value) => {            
				localStorage.setItem("gdi-auth", JSON.stringify(value));
				console.log(value);
				dispatch(getClienteDatosAction())      
			}).finally(() => {
	
			})

		}
	}

	const dispatch = useAppDispatch();
	
	return (
		<AppBar style={{ background: '#1D428A' }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters style={{ marginRight: 70, marginLeft: 70 }}>
					<Grid container>
						<Grid item sx={{ ml: 1, cursor:'pointer' }} onClick={()=>imageRedirect()}>
							<Image
								src={logo}
								alt="Logo"
								width={150}
							/>
						</Grid>
					</Grid>
					<Box sx={{ flexGrow: 0,display:'contents' }}>
							<Typography style={{paddingRight:8}}>
								{usuarioKeycloack}
							</Typography>
							<Tooltip title="Cerrar sesión">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<LogoutIcon sx={{ display: { md: 'flex' }, mr: 1, color: 'white' }} />
							</IconButton>
						</Tooltip>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;