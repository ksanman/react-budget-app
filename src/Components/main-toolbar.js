import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function MainToolbar(props) {
    const {title, showExpand, onExpandClicked} = props;

    const handleExpandClicked = () => {
        onExpandClicked();
    };
    const expand = showExpand ? (
        <IconButton
        color='inherit'
        aria-label='open menu'
        edge='start'
        onClick={handleExpandClicked}
        sx={{mr: 2, display: {sm: 'none'}}}
    >
        <MenuIcon />
    </IconButton>
    ) : '';

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                {expand}
                <Typography variant="h6" noWrap component="div">
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
