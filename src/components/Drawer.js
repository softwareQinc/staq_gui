import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, Divider, IconButton, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import HomeIcon from '@mui/icons-material/Home';
import MuiDrawer from '@mui/material/Drawer';
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function DrawerComponent(props) {
    const open = false;
    const navigate = useNavigate();
    const routes = [
        {
            label: 'Home',
            icon: <HomeIcon />,
            onClick: () => navigate('/'),
            path: '/'
        },
        {
            label: 'Tool',
            icon: <TerminalIcon />,
            onClick: () => navigate('/staqtool'),
            path: '/staqtool'
        }
    ]
    const { pathname } = useLocation();
    return (
        <Drawer variant="permanent" open={open}>
            {/*<DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>*/}
            <Toolbar />
            <List>
                {routes.map((route, index) => (
                    //<Link to={route.path} key={index}>
                    <ListItem selected={route.path == pathname} disablePadding={true} key={index} button={true} sx={{ display: 'block' }}
                        component={Link} onClick={route.onClick}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {route.icon}
                            </ListItemIcon>
                            <ListItemText primary={route.label} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    //</Link>
                ))}
            </List>
            <Divider />
        </Drawer>
    );
}

export default DrawerComponent;