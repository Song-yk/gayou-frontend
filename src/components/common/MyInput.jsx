import * as React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

export default function MyInput(props) {
  return (
    <Controller
      isVaild={props.valid}
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <FormControl sx={{ width: props.width || '100%' }} variant="standard">
          <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
          <Input
            onChange={onChange}
            value={value}
            label={props.label}
            id={props.id}
            type={props.type || 'text'}
            placeholder={props.label}
          />
          <FormHelperText error={!!error}>
            {error ? error.message : props.validText || ' '}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
