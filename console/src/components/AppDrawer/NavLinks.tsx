import { ListItemText } from "@mui/material"
import { ListItemIcon } from "@mui/material"
import { ListItemButton } from "@mui/material"
import { ListItem } from "@mui/material"
import { List } from "@mui/material"
import { Link } from "react-router"


type link = {
    title: string;
    icon: React.ReactNode;
    path: string;
}

type props = {
    links: link[]
}


export const NavLinks = ({links}:props) => {
    return (
        <List
        sx={{
            px: 2,
            py: 3,
            flex: 1,
        }}
        >
        {links.map((link) => (
            <ListItem
            key={link.path}
            disablePadding
            sx={{ 
                mb: 1,  
                '& a':{
                    width: '100%',
                    textDecoration: 'none',
                    color: 'text.secondary'
                }
            }}
            >
            <Link to={link.path}>
                <ListItemButton
                    sx={{
                    borderRadius: '12px',
                    '&:hover': {
                        bgcolor: 'rgba(194, 24, 91, 0.08)',
                        '& .MuiListItemIcon-root': {
                        color: 'primary.main',
                        },
                        '& .MuiListItemText-primary': {
                        color: 'primary.main',
                        fontWeight: 600,
                        },
                    },
                    '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        '&:hover': {
                        bgcolor: 'primary.dark',
                        },
                        '& .MuiListItemIcon-root': {
                        color: 'white',
                        },
                        '& .MuiListItemText-primary': {
                        color: 'white',
                        fontWeight: 600,
                        },
                    },
                    }}
                >
                    <ListItemIcon
                    sx={{
                        color: 'grey.600',
                        minWidth: 40,
                    }}
                    >
                    {link.icon}
                    </ListItemIcon>
                    <ListItemText
                    primary={link.title}
                    sx={{
                        
                        '& .MuiListItemText-primary': {
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        },
                    }}
                    />
                </ListItemButton>
            </Link>
            </ListItem>
        ))}
        </List>
    )
}