import { useEffect, useState } from 'react';
import { ApiParams, Beer, MetaData, SORT, TYPE } from '../../types';
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
  TextField,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import FavoriteButton from "../../components/FavoriteButton";
import { updateFavorites, isItemFavorite } from "../../utils/favorites";

const breweryTypes = [
  'all types',
  'micro',
  'nano',
  'regional',
  'brewpub',
  'large',
  'planning',
  'bar',
  'contract',
  'proprietor',
  'closed',
];

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [metaData, setMetaData] = useState<MetaData>();
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [sort, setSort] = useState<SORT>("name:asc");
  const [type, setType] = useState<TYPE>('all types');
  const [name, setName] = useState<string>('');

  // eslint-disable-next-line
  useEffect(() => {

    const params = {
      sort: sort,
      page: page,
      per_page: rowsPerPage
    } as ApiParams;

    if (type && type !== 'all types') {
      params.by_type = type;
    }

    if (name) {
      params.by_name = name;
    }

    fetchData(setBeerList, params, () => setLoading(false));
    fetchMetaData(setMetaData, params);
  }, [page, rowsPerPage, sort, type, name]);

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

  const handleSortChange = (event: SelectChangeEvent) => {
    setLoading(true);
    setSort(event.target.value as SORT);
    setPage(0);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setLoading(true);
    setType(event.target.value as TYPE);
    setPage(0);
  };

  const handleNameChange = (event: { target: { value: string } }) => {
    setLoading(true);
    setName(event.target.value);
    setPage(0);
  };

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const mouseDown = (e: any) => {
    e.stopPropagation ();
  };

  return (
    <Box component="article" sx={{
        marginBottom: '96px'
      }}>
      <Container disableGutters>
        <Typography variant="h3" component="h1" color="#ffffff" sx={{
          marginBottom: '96px'
        }}>Breweries</Typography>
        {metaData &&
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, borderBottom: '1px solid #ffffff', padding: '24px 0' }}>
            <FormControl>
              <TextField
                label="Name"
                variant="outlined"
                placeholder="Search by name"
                value={name}
                onChange={handleNameChange}
                InputLabelProps={{
                  color: 'secondary',
                  shrink: true,
                  sx: {
                    color: '#ffffff'
                  }
                }}
                inputProps={{
                  sx: {
                    color: '#ffffff'
                  }
                }}
                sx={{
                  color: '#ffffff',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white'
                  }
                }}
              >
              </TextField>
            </FormControl>
            <FormControl>
              <InputLabel id="type-select-label" color="secondary" shrink={true} sx={{color: '#ffffff'}}>Type</InputLabel>
              <Select
                labelId="type-select-label"
                id="type-select"
                value={type}
                label="Type"
                onChange={handleTypeChange}
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
                {breweryTypes.map((item) => (
                  <MenuItem key={item} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ marginLeft: 'auto'}}>
              <InputLabel id="sort-select-label" color="secondary" shrink={true} sx={{color: '#ffffff'}}>Sort by</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
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
          </Box>
        }
        <List sx={{
          opacity: loading ? 0.3 : 1,
          pointerEvents: loading ? 'none': 'auto'
        }}>
          {beerList.map((beer) => (
            <ListItemButton key={beer.id} disableGutters sx={{
              paddingTop: '48px',
              paddingBottom: '48px',
              gap: 3
            }}>
              <ListItemText primary={beer.name + ' - (' + beer.brewery_type + ')'} primaryTypographyProps={{ color: '#ffffff', variant: 'h3'}} onClick={onBeerClick.bind(this, beer.id)} />
              <Box sx={{ flexShrink: 0 }}>
                <FavoriteButton
                  onClick={() => {
                    updateFavorites(beer);
                  }}
                  isActive={isItemFavorite(beer)}
                />
              </Box>
            </ListItemButton>
          ))}
        </List>
        {metaData && metaData?.total == 0 && 
          <Box sx={{
            padding: '96px 0'
          }}>
            <Typography component="h2" variant="h2" color="#ffffff">No breweries found.</Typography>
            <Typography component="p" variant="h4" color="#ffffff">Please try to modify your filters.</Typography>
          </Box>
        }
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
                paddingLeft: 0,
                overflow: 'hidden'
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
