import { useEffect, useState } from 'react';
import { Beer, MetaData, SORT } from '../../types';
import { fetchData, fetchMetaData } from './utils';
import { 
  Box,
  Container,
  FormControl,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TablePagination,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [metaData, setMetaData] = useState<MetaData>();
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [sort, setSort] = useState<SORT>("name:asc");

  // eslint-disable-next-line
  useEffect(() => {
    const params = {
      sort: sort,
      page: page,
      per_page: rowsPerPage
    };
    fetchData(setBeerList, params, () => setLoading(false));
    fetchMetaData(setMetaData, params);
  }, [page, rowsPerPage, sort]);

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

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setLoading(true);
    switch (event.target?.value) {
      case "name:desc":
        setSort("name:desc");
        break;
      default:
        setSort("name:asc");
    }
  }

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <Box component="article" sx={{
        marginBottom: '96px'
      }}>
      <Container disableGutters>
        <Typography variant="h3" component="h1" color="#ffffff" sx={{
          marginBottom: '24px'
        }}>BeerList page</Typography>
        {metaData &&
          <FormControl>
            <InputLabel id="demo-simple-select-label" color="secondary" sx={{color: '#ffffff'}}>Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              label="Sort by"
              onChange={handleSortChange}
              autoWidth
              sx={{
                color: '#ffffff',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white'
                },
                '.MuiSvgIcon-root': {
                  color: 'white'
                }
              }}
              >
              <MenuItem value="name:asc">Name - Ascending</MenuItem>
              <MenuItem value="name:desc">Name - Descending</MenuItem>
            </Select>
          </FormControl>
        }
        <List sx={{
          opacity: loading ? 0.3 : 1,
          pointerEvents: loading ? 'none': 'auto'
        }}>
          {beerList.map((beer) => (
            <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)} disableGutters sx={{
              paddingTop: '48px',
              paddingBottom: '48px'
            }}>
              <ListItemText primary={beer.name + ' - (' + beer.brewery_type + ')'} primaryTypographyProps={{ color: '#ffffff', variant: 'h2'}} />
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
