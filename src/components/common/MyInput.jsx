import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { styled } from '@mui/material/styles';

const RoundedInput = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: '10px', // 둥근 테두리
  border: '1px solid #ccc', // 테두리 색상
  padding: '0px', // 내부 여백
  '& fieldset': {
    border: 'none', // 기본 아웃라인 제거
  },
}));

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
        <FormControl sx={{ width: props.width || '100%' }} variant="outlined">
          {props.label && (
            <span style={{ textAlign: 'left', paddingLeft: '5px' }}>
              {props.rules.required && '* '}
              {props.label}
            </span>
          )}
          <RoundedInput
            id={props.id}
            name={props.tagName}
            className={props.className}
            onChange={onChange}
            value={value}
            type={props.type || 'text'}
            placeholder={props.place || props.label}
          />
          <FormHelperText error={!!error}>
            {error ? error.message : props.validText || ' '}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
