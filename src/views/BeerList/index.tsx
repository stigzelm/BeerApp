import { useEffect, useState } from 'react';
import { Beer } from '../../types';
import { fetchData } from './utils';
import { Container, Box, List, ListItemButton, ListItemText } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <Box component="article" sx={{marginBottom: '96px'}}>
      <Container disableGutters>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <List>
            {beerList.map((beer) => (
              <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)} disableGutters sx={{
                paddingTop: '48px',
                paddingBottom: '48px'
              }}>
                <ListItemText primary={beer.name} primaryTypographyProps={{ color: '#ffffff', variant: 'h2'}} secondary={beer.brewery_type} />
              </ListItemButton>
            ))}
          </List>
        </main>
      </Container>
    </Box>
  );
};

export default BeerList;
