import React from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Typography,
} from '@mui/material';
import {
  AccountCircleOutlined as PersonIcon,
  HomeWorkOutlined as HomeIcon,
  CardTravel as BookingIcon,
  ReviewsOutlined as ReviewIcon,
  ExitToApp as LogoutIcon,
  ChatBubbleOutline as ChatIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth, type AuthUser } from '../../hooks/useAuth';

interface UserMenuProps {
  user: AuthUser;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, anchorEl, open, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    onClose();
  };

  const handleMyBookings = () => {
    navigate('/my-bookings');
    onClose();
  };

  const handleGuestInbox = () => {
    navigate('/inbox');
    onClose();
  };

  const handleHostPanel = () => {
    navigate('/host/dashboard');
    onClose();
  };

  const isHost = user.roles.some((role) => role.toUpperCase() === 'HOST');
  const initials = `${user.name?.charAt(0) || ''}${user.surname?.charAt(0) || ''}`.trim() || 'U';

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{ disablePadding: true }}
      slotProps={{
        paper: {
          sx: {
            mt: 1.5,
            minWidth: 220,
            borderRadius: 2,
            boxShadow: 3,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem disabled sx={{ py: 1.5, opacity: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 40, height: 40 }}>{initials}</Avatar>
          <Box>
            <Typography variant="subtitle2">
              {user.name} {user.surname}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
      </MenuItem>

      {isHost && (
        <MenuItem onClick={handleHostPanel} sx={{ py: 1.1 }}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Host Panel" />
        </MenuItem>
      )}

      <MenuItem onClick={handleGuestInbox} sx={{ py: 1.1 }}>
        <ListItemIcon>
          <ChatIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Messages" />
      </MenuItem>

      <MenuItem onClick={onClose} sx={{ py: 1.1 }}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="User Profile" />
      </MenuItem>

      <MenuItem onClick={handleMyBookings} sx={{ py: 1.1 }}>
        <ListItemIcon>
          <BookingIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="My Reservations" />
      </MenuItem>

      <MenuItem onClick={onClose} sx={{ py: 1.1 }}>
        <ListItemIcon>
          <ReviewIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Reviews" />
      </MenuItem>

      <MenuItem onClick={onClose} sx={{ py: 1.1 }}>
        <ListItemIcon>
          <BookingIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Saved" />
      </MenuItem>

      <MenuItem onClick={handleLogout} sx={{ py: 1.1 }}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
