import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
    (state: FilterReducerState) => state.filter.search
  );
  const selectedStatus = useSelector(
    (state: FilterReducerState) => state.filter.search
  );

  const onChangeGender = (event: SelectChangeEvent<string>) =>
    dispatch(setGender(event.target.value));
  const onChangeStatus = (event: SelectChangeEvent<string>) =>
    dispatch(setStatus(event.target.value));
  const onChangeSearch = debounce(
    (event: any) => dispatch(setSearch(event.target.value)),
    2000
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
      <Select value={selectedStatus} onChange={onChangeStatus}>
        <MenuItem value={EmptyStatus} className={styles.option}>
          Status
        </MenuItem>
        {Status.map((status) => (
          <MenuItem className={styles.option} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
      <Select value={selectedGender} onChange={onChangeGender}>
        <MenuItem className={styles.option} value={EmptyGender}>
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
