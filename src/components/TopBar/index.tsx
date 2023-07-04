import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

interface Props {
  drawerWidth: number;
  handleDrawerToggle: () => void;
  children: React.ReactNode;
}

const TopBar = (props: Props) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        paddingLeft: 3,
        paddingRight: 3
      }}
    >
      <Container disableGutters>
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div">
            BW
          </Typography>
          {props.children}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={props.handleDrawerToggle}
            sx={{ ml: 'auto', display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
    );
  }

export default TopBar;
