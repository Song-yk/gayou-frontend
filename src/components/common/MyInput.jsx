import OutlinedInput from '@mui/material/OutlinedInput';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { styled } from '@mui/material/styles';

function maxLengthCheck(event) {
  event.target.value = event.target.value.replaceAll(/[\D]/gi, '');
}

export default function MyInput(props) {
  const RoundedInput = styled(OutlinedInput)(({ theme }) => ({
    borderRadius: '10px', // 둥근 테두리
    border: props.border || '1px solid #ccc', // 테두리 색상
    padding: '0px', // 내부 여백
    '& fieldset': {
      border: 'none', // 기본 아웃라인 제거
    },
  }));
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      defaultValue={props.defaultValue || ''}
      render={({ field: { onChange, value = props.defaultValue }, fieldState: { error } }) => (
        <FormControl
          sx={{
            width: props.width || '100%',
            display: props.type === 'radio' ? '-webkit-inline-box !important' : undefined,
          }}
          variant="outlined"
        >
          {props.type === 'radio' ? (
            <label htmlFor={props.id} style={{ cursor: 'pointer', marginRight: '1em' }}>
              {props.label}
            </label>
          ) : (
            props.label && (
              <span style={{ textAlign: props.labelTextAlign || 'left', paddingLeft: '5px' }}>
                {props.rules.required && '* '}
                {props.label}
              </span>
            )
          )}
          <RoundedInput
            id={props.id}
            name={props.tagName}
            className={props.className}
            onChange={onChange}
            onClick={props.onClick}
            value={value}
            type={props.type === 'number' ? 'text' : props.type || 'text'}
            placeholder={props.place || props.label}
            inputProps={{
              maxLength: props.maxLength,
              ...(props.type === 'number' && {
                inputMode: 'numeric',
                onInput: maxLengthCheck,
              }),
              ...(props.type === 'radio' && {
                checked: props.checked,
              }),
            }}
            disabled={props.disabled}
            sx={{ verticalAlign: props.type === 'radio' ? 'sub' : undefined }}
          />
          {props.type != 'radio' && (
            <FormHelperText error={!!error}>{error ? error.message : props.validText || ' '}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
