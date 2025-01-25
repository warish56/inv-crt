import { Box, IconButton, Menu, MenuItem } from "@mui/material"


import MoreVertIcon from '@mui/icons-material/MoreVert';
// import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import { useSnackbar } from "@hooks/useSnackbar";
import { useState } from "react";
import { useAppNavigation } from "@hooks/useAppNavigation";

type props = {
    invoiceId: string;
    handleDelete: () => void;
}
export const ExtraOptions = ({invoiceId, handleDelete:onDelete}:props) => {
    const {showSnackbar} = useSnackbar();
    const {navigate} = useAppNavigation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
      handleMenuClose();
      onDelete();
  }

//   const handlePrint = () => {
//       handleMenuClose();
//   }

  const handleEdit = () => {
        navigate(`/invoices/create/business?inv_id=${invoiceId}`)
      handleMenuClose();
  }

  const open = Boolean(anchorEl);


  const handleSendEmail = () => {
      // Implement email sending logic
      showSnackbar({message: 'Send invoice email not implemented', type: 'info'});
      handleMenuClose();
  }
  
    return (
        <Box>
            <IconButton 
                onClick={handleMenuOpen}
                sx={{ 
                    color: 'text.secondary'
                }}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                sx={{
                    '& .MuiMenu-paper': {
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }
                }}
            >
                <MenuItem onClick={handleEdit} sx={{ gap: 1.5 }}>
                    <EditIcon fontSize="small" /> Edit
                </MenuItem>
                {/* <MenuItem onClick={handlePrint} sx={{ gap: 1.5 }}>
                    <PrintIcon fontSize="small" /> Print
                </MenuItem> */}
                <MenuItem onClick={handleSendEmail} sx={{ gap: 1.5 }}>
                    <EmailIcon fontSize="small" /> Send Email
                </MenuItem>
                <MenuItem 
                    onClick={handleDelete} 
                    sx={{ 
                        gap: 1.5, 
                        color: 'error.main',
                        '&:hover': {
                            backgroundColor: 'error.light',
                            color: 'background.default'
                        }
                    }}
                >
                    <DeleteIcon fontSize="small" /> Delete
                </MenuItem>
            </Menu>
        </Box>
    )
}