import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import styles from './styles.module.scss';

const Genders = ['unknown', 'male', 'female'];
const Status = ['unknown', 'dead', 'alive'];
const EmptyGender = 'gender';
const EmptyStatus = 'status';

function FilterPanel() {
  return (
    <form className={styles.container}>
      <TextField
        placeholder="Filter by name"
        className={styles.searchBar}
        InputProps={{
          classes: {
            root: styles.searchBar
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      <Select defaultValue={EmptyStatus}>
        <MenuItem className={styles.option}>Status</MenuItem>
        {Status.map((gender) => (
          <MenuItem className={styles.option} value={gender}>
            {gender}
          </MenuItem>
        ))}
      </Select>
      <Select>
        <MenuItem className={styles.option} defaultValue={EmptyGender}>
          Gender
        </MenuItem>
        {Genders.map((gender) => (
          <MenuItem className={styles.option} value={gender}>
            {gender}
          </MenuItem>
        ))}
      </Select>
    </form>
  );
}

export default FilterPanel;
