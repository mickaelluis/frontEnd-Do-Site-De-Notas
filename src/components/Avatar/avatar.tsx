import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Box,
  Stack,
} from '@chakra-ui/react';

const UserAvatar: React.FC = () => {

    const Name = localStorage.getItem('name');

    const handleLogout = () => {
    localStorage.removeItem('token')
     window.location.reload();
  };

  return (
    <Box>
      <Menu>
        <MenuButton>
        <Stack direction='row'>
        <Avatar name={Name || ''} src='https://bit.ly/broken-link' />
        </Stack>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleLogout}>Deslogar</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default UserAvatar;