import PropTypes from 'prop-types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';

export default function MyDatePickerField(props) {
  const { control, label, width, name } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        sx={{ width: { width } }}
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            label={label}
            sx={{ width: { width } }}
            onChange={onChange}
            value={value}
          />
        )}
      />
    </LocalizationProvider>
  );
}
