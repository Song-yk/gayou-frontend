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
      contrastText: '#fff', // 대비 텍스트 색상: 흰색
    },
    rosePinkSelected: {
      main: '#bf004b', // 선택된 상태의 주요 색상: 훨씬 더 진한 장미 핑크
      light: '#ff6080', // 선택된 상태의 밝은 색상: 더욱 밝고 선명한 핑크
      dark: '#7a0033', // 선택된 상태의 어두운 색상: 매우 어두운 버건디 핑크
      contrastText: '#fff', // 선택된 상태의 대비 텍스트 색상: 흰색
    },

    roseBlush: {
      main: '#ffcccc', // 주요 색상: 장미 블러쉬
      light: '#ffe6e6', // 밝은 색상: 연한 장미 블러쉬
      dark: '#cc9999', // 어두운 색상: 진한 장미 블러쉬
      contrastText: '#fff', // 대비 텍스트 색상: 검정색
    },
    roseBlushSelected: {
      main: '#ff9999', // 선택된 상태의 주요 색상: 좀 더 진한 장미 블러쉬
      light: '#ffd6d6', // 선택된 상태의 밝은 색상: 더욱 연한 장미 블러쉬
      dark: '#b26666', // 선택된 상태의 어두운 색상: 진한 핑크 브라운
      contrastText: '#fff', // 선택된 상태의 대비 텍스트 색상: 검정색
    },

    sunsetOrange: {
      main: '#f6854f', // 주요 색상: 일몰 오렌지
      light: '#ffb280', // 밝은 색상: 연한 오렌지
      dark: '#b24d2c', // 어두운 색상: 진한 오렌지
      contrastText: '#fff', // 대비 텍스트 색상: 흰색
    },
    sunsetOrangeSelected: {
      main: '#cc3d14', // 선택된 상태의 주요 색상: 훨씬 더 진한 오렌지 레드
      light: '#ff7043', // 선택된 상태의 밝은 색상: 더욱 밝고 선명한 오렌지
      dark: '#8a1f00', // 선택된 상태의 어두운 색상: 매우 어두운 브라운 레드
      contrastText: '#fff', // 선택된 상태의 대비 텍스트 색상: 흰색
    },
  },
});

export default function MyButton(props) {
  // const { width, color, name, control, value, onClick } = props;
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={() => (
        <ThemeProvider theme={theme}>
          <Button
            type={props.type}
            id={props.id}
            name={props.tagName}
            className={props.className}
            sx={{
              width: props.width || '10%',
              margin: props.margin || '1em 0 0 1em',
              borderRadius: props.borderRadius || '13px',
              border: props.border || 'solid 1px',
              borderColor: props.borderColor || '#000',
            }}
            color={props.color}
            variant="contained"
            onClick={props.onClick}
            selected
          >
            <div style={{ fontSize: props.fontSize || '' }}>{props.value}</div>
          </Button>
        </ThemeProvider>
      )}
    />
  );
}
