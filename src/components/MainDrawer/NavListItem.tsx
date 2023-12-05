import StarBorder from '@mui/icons-material/StarBorder'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import React, { useState } from 'react'
import { NavItem } from '../../interfaces/_common'
import { SxProps, Theme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'

interface NavListItemProps {
    item: NavItem;
    isSubLevel?: boolean;
    deepLevel?: number;
}
const NavListItem = ({ item, isSubLevel, deepLevel = 0 }: NavListItemProps) => {
    const router = useRouter();
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        //enviar a link
        if (item.href) {
            router.push(item.href);
            return;
        }


        setOpen(state => !state);
    }
    const deepPadding = deepLevel * 2;
    const rootSx: SxProps<Theme> = {
        borderBottom: "1px solid white",
        marginLeft: 1,
    };
    const childrenSx: SxProps<Theme> = isSubLevel && deepLevel !== 0
        ? {
            ...rootSx,
            pl: deepPadding,
            backgroundColor: "#2C3135",
            "& :hover": {
                backgroundColor: "#2C3135"
            },
        }
        : rootSx;
    return (
        <Box
            sx={{
                backgroundColor: deepLevel === 0 ? "#434b53 !important" : "#2C3135 !important",
                "& :hover": {
                    backgroundColor: deepLevel === 0 ? "#434b53" : "#2C3135 !important"
                },
                marginRight: 1 - deepLevel,
            }}  
        >
            <ListItemButton onClick={handleClick} sx={childrenSx}>
                <ListItemIcon sx={{ minWidth: "32px" }}>{deepLevel === 0 ? item.icon : null}</ListItemIcon>
                <ListItemText
                    primary={item.title}
                    sx={{
                        '& .MuiTypography-body1': {
                            fontSize: "13px",
                            fontFamily: "ContiSans-Light"
                        },
                    }}
                />
                {item.children && (open ? <ExpandLess fontSize={"small"} /> : <ExpandMore fontSize={"small"} />)}
            </ListItemButton>
            {
                item.children && (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {
                                item.children.map((subItem, index) => (
                                    <NavListItem key={index} item={subItem} deepLevel={deepLevel + 1} isSubLevel />
                                ))
                            }
                        </List>
                    </Collapse>
                )

            }

        </Box>
    )
}

export default NavListItem