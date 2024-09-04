import * as React from 'react';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    rosePink: {
      main: '#f7527a', // 주요 색상: 밝은 장미 핑크
      light: '#ffa0a6', // 밝은 색상: 연한 장미 핑크
      dark: '#b5204b', // 어두운 색상: 진한 장미 핑크
      contrastText: '#ffffff', // 대비 텍스트 색상: 흰색
    },
    sunsetOrange: {
      main: '#f6854f', // 주요 색상: 일몰 오렌지
      light: '#ffb280', // 밝은 색상: 연한 오렌지
      dark: '#b24d2c', // 어두운 색상: 진한 오렌지
      contrastText: '#ffffff', // 대비 텍스트 색상: 흰색
    },
  },
});

export default function MyButtonField(props) {
  const { width, color, name, control, value, onClick } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <ThemeProvider theme={theme}>
          <Button
            sx={{
              width: { width },
              margin: '1em 0 0 1em',
              borderRadius: '13px',
              border: 'solid 1px',
              borderColor: '#000',
              //   borderColor: '#a6a6a6',
            }}
            color={color}
            variant="contained"
            onClick={onClick}
          >
            {value}
          </Button>
        </ThemeProvider>
      )}
    />
  );
}
