import { useEffect, useState } from 'react';
import { Beer, MetaData } from '../../types';
import { fetchData, fetchMetaData } from './utils';
import { Container, Box, List, ListItemButton, ListItemText, TablePagination, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [metaData, setMetaData] = useState<MetaData>();
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);

  // eslint-disable-next-line
  useEffect(() => {
    const params = {
      page: page,
      per_page: rowsPerPage
    };
    fetchData(setBeerList, params, () => setLoading(false));
    fetchMetaData(setMetaData, params);
  }, [page, rowsPerPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setLoading(true);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLoading(true);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <Box component="article" sx={{
        marginBottom: '96px'
      }}>
      <Container disableGutters>
        <Typography variant="h3" component="h1" color="#ffffff" sx={{
          marginBottom: '24px'
        }}>BeerList page</Typography>
        <List sx={{
          opacity: loading ? 0.3 : 1,
          pointerEvents: loading ? 'none': 'auto'
        }}>
          {beerList.map((beer) => (
            <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)} disableGutters sx={{
              paddingTop: '48px',
              paddingBottom: '48px'
            }}>
              <ListItemText primary={beer.name} primaryTypographyProps={{ color: '#ffffff', variant: 'h2'}} secondary={beer.brewery_type} />
            </ListItemButton>
          ))}
        </List>
        {metaData && 
          <TablePagination
            component="div"
            count={Number(metaData?.total)}
            page={Number(metaData?.page)}
            onPageChange={handleChangePage}
            rowsPerPage={Number(metaData.per_page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              color: '#ffffff',
              marginBottom: '48px',
              borderTop: '1px solid #ffffff',
              '.MuiTablePagination-spacer': {
                display: 'none'
              },
              '.MuiTablePagination-toolbar': {
                paddingLeft: 0
              },
              '.MuiTablePagination-displayedRows': {
                marginLeft: 'auto'
              },
              '.MuiTablePagination-actions': {
                marginRight: '-15px'
              }
            }}
          />
        }
      </Container>
    </Box>
  );
};

export default BeerList;
