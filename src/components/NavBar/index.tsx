import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { showFilter, FilterReducerState } from '../../redux/filterReducer';
import Logo from '../../images/icons/ic_rick_and_morty.png';
import styles from './styles.module.scss';

function NavBar() {
  const navigate = useNavigate();
  const visibleFilter = useSelector(
    (state: FilterReducerState) => state.filter.visibleFilter
  );
  const dispatch = useDispatch();
  const handleShowFilter = () => dispatch(showFilter(!visibleFilter));

  return (
    <Box sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
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
            <MenuIcon className={styles.menuIcon} />
          </IconButton>
          <button type="button" onClick={() => navigate('/')}>
            <img src={Logo} alt="Rick And Morty" className={styles.logo} />
          </button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
