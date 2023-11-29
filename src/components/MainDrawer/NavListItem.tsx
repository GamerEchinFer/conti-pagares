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

interface NavListItemProps {
    item: NavItem;
    isSubLevel?: boolean;
    deepLevel?: number;
}
const NavListItem = ({ item, isSubLevel, deepLevel = 0 }: NavListItemProps) => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(state => !state);
    }
    const deepPadding = deepLevel * 4;
    const childrenSx = isSubLevel && deepLevel !== 0 ? { pl: deepPadding } : {};
    return (
        <>
            <ListItemButton onClick={handleClick} sx={childrenSx}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
                {item.children && (open ? <ExpandLess /> : <ExpandMore />)}
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

        </>
    )
}

export default NavListItem