import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';

export default function MyCardControls(props) {
  const { width, image, alt, title, description } = props;
  return (
    <Card
      sx={{ display: 'inline-flex', width: width || '100%', marginY: '5px' }}
    >
      <CardMedia
        component="img"
        sx={{ width: '20%', borderRadius: '1.5em' }}
        image={image}
        alt={alt}
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '80%' }}>
        <CardContent sx={{ flex: '1 0 auto', textAlign: 'left', width: '70%' }}>
          <Typography component="div" variant="h5" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {description}
          </Typography>
        </CardContent>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', mr: 2, width: '10%' }}
        >
          <ArrowDropUpIcon />
          <ArrowDropDownIcon />
        </Box>
        <CloseIcon sx={{ mr: 2, width: '20%' }} />
      </Box>
    </Card>
  );
}
