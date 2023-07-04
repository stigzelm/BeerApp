import { useEffect, useState } from 'react';
import { Beer } from '../../types';
import { Box, Button, Container, Link, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


import { useNavigate } from 'react-router-dom';


import FavoriteButton from "../../components/FavoriteButton";
import { updateFavorites, isItemFavorite, getFavorites, removeAllFavorites } from "../../utils/favorites";

import bgImage from './homepage-image-1.jpg';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [favoriteList, setFavoriteList] = useState<Array<Beer>>([]);

  useEffect(() => {
    setFavoriteList(getFavorites());
  }, []);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <Box component="article" sx={{ flexGrow: 1 }}>
      <Box component="header" className={styles.header}>
        <Typography variant="h1" component="h1" color="#ffffff" sx={{ maxWidth: '1200px'}}>
          Welcome to BeerWiki
        </Typography>
        <img src={bgImage} alt="Beer under a tap" />
      </Box>
      <Container disableGutters sx={{
          marginTop: '96px',
          marginBottom: '196px'
        }}>
        <Box>
          <Box component="header" sx={{ 
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '48px',
              gap: 3
            }}>
            <Typography component="h2" variant="h2" color="#ffffff">
              Favorite breweries
            </Typography>
            {favoriteList.length > 0 && 
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  removeAllFavorites();
                  setFavoriteList([]);
                }}
              >
                Remove all
              </Button>
            }
          </Box>
          {favoriteList.length > 0 &&
             <List>
              {favoriteList.map((beer) => (
                <ListItemButton key={beer.id} disableGutters sx={{
                  paddingTop: '24px',
                  paddingBottom: '24px',
                  gap: 3
                }}>
                  <ListItemText primary={beer.name + ' - (' + beer.brewery_type + ')'} primaryTypographyProps={{ color: '#ffffff', variant: 'h4'}} onClick={onBeerClick.bind(this, beer.id)} />
                  <Box sx={{ flexShrink: 0 }}>
                    <FavoriteButton
                      onClick={() => {
                        updateFavorites(beer);
                        setFavoriteList(getFavorites());
                      }}
                      isActive={isItemFavorite(beer)}
                    />
                  </Box>
                </ListItemButton>
              ))}
            </List>
          }
          {favoriteList.length === 0 &&
            <Box sx={{
              padding: '48px 0 96px 0'
            }}>
              <Typography component="p" variant="h4" color="#ffffff">Start by choosing your favorite breweries <Link href="/beer" color="#ffffff" sx={{ textDecoration: 'underline' }}>here</Link></Typography>
            </Box>
          }
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
