import styles from './Footer.module.css';

import {Box, Container, Link} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Container disableGutters>
      <Box component="footer" className={styles.footer}>
        <Box className={styles.copy}>BeerWiki &#169; 2023 </Box>
        <Box className={styles.links}>
          <Link component={RouterLink} to={`/privacy-policy`} color="inherit">
            Privacy policy
          </Link>
          <Link component={RouterLink} to={`/terms-of-service`} color="inherit">
            Terms of service
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;
