import { 
  Box,
  Container,
  Typography
} from '@mui/material';

const NotFound = () => {
  return (
    <Box component="article" sx={{ flexGrow: 1 }}>
        <Container disableGutters sx={{
          margin: '96px 0',
        }}>
          <Box component="header">
            <Typography component="h1" variant="h1" color="#ffffff">Page not found</Typography>
            <Typography color="#ffffff">We haven't found what you've been looking for</Typography>
          </Box>
        </Container>
    </Box>
  );
};

export default NotFound;
