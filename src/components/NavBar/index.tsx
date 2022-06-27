import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { showFilter, FilterReducerState } from '../../redux/filterReducer';

import Logo from '../../images/icons/ic_rick_and_morty.png';

import styles from './styles.module.scss';

function NavBar() {
  const visibleFilter = useSelector(
    (state: FilterReducerState) => state.filter.visibleFilter
  );
  const dispatch = useDispatch();
  const handleShowFilter = () => dispatch(showFilter(!visibleFilter));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={styles.navBar}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleShowFilter}
          >
            <MenuIcon />
          </IconButton>
          <img src={Logo} alt="Rick And Morty" className={styles.logo} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
