import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.scss';
import {
  EmptyGender,
  EmptyStatus,
  FilterReducerState,
  setGender,
  setSearch,
  setStatus
} from '../../../redux/filterReducer';

const Genders = ['unknown', 'male', 'female'];
const Status = ['unknown', 'dead', 'alive'];

function FilterPanel() {
  const dispatch = useDispatch();
  const selectedGender = useSelector(
    (state: FilterReducerState) => state.filter.gender
  );
  const selectedStatus = useSelector(
    (state: FilterReducerState) => state.filter.status
  );

  const onChangeGender = (event: SelectChangeEvent<string>) =>
    dispatch(setGender(event.target.value));
  const onChangeStatus = (event: SelectChangeEvent<string>) =>
    dispatch(setStatus(event.target.value));
  const onChangeSearch = debounce(
    (event: any) => dispatch(setSearch(event.target.value)),
    1000
  );

  return (
    <form className={styles.container}>
      <TextField
        placeholder="Filter by name"
        className={styles.searchBar}
        onChange={onChangeSearch}
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
      <FormControl fullWidth>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          value={selectedStatus || EmptyStatus}
          onChange={onChangeStatus}
          className={styles.statusSelect}
          label="Status"
          labelId="status-label"
        >
          <MenuItem value={EmptyStatus} className={styles.option}>
            Status
          </MenuItem>
          {Status.map((status) => (
            <MenuItem key={status} className={styles.option} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          value={selectedGender || EmptyGender}
          onChange={onChangeGender}
          label="Status"
          labelId="status-label"
        >
          <MenuItem className={styles.option} value={EmptyGender}>
            Gender
          </MenuItem>
          {Genders.map((gender) => (
            <MenuItem key={gender} className={styles.option} value={gender}>
              {gender}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}

export default FilterPanel;
