import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Typography from '@mui/material/Typography';
import useShopState, { type Product } from './useShopState';
import { Link } from 'react-router-dom';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: (theme.shape.borderRadius as number) * 2,
  backgroundColor: alpha(theme.palette.common.white, 0.12),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  marginLeft: 0,
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const filterProducts = (query: string, products: Product[]) => {
  if (!query || query.trim() === '') {
    return products;
  }
  return products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
};

const SearchBar = () => {
  const basketItems = useShopState((state) => state.productsInBasket);
  const products = useShopState((state) => state.products);

  const basketCount = basketItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="primary"
        elevation={3}
        sx={(theme) => ({
          borderRadius: { xs: 0, md: (theme.shape.borderRadius as number) * 2 },
          mt: { xs: 0, md: 1 },
          px: 2,
          py: 0.5,
        })}
      >
        <Toolbar disableGutters sx={{ gap: 2, flexWrap: { xs: 'wrap', sm: 'nowrap' },  }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mr: { xs: 1, md: 2 },
            }}
          >
            <LocalMallIcon sx={{ fontSize: 28 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 600 }}
            >
              MyShop
            </Typography>
          </Box>

          <Search sx={{ flexGrow: 1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => {
                const query = e.target.value;
                const filtered = filterProducts(query, products);
                useShopState.setState({ filteredProducts: filtered });
              }}
              placeholder="Search for products…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
            <IconButton
              size="large"
              aria-label="notifications"
              color="inherit"
              sx={{ display: { xs: 'none', md: 'inline-flex' } }}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Link to="/account" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                color="inherit"
                sx={{ display: { xs: 'none', md: 'inline-flex' } }}
              >
                <AccountCircle />
              </IconButton>
            </Link>

            <Link
              to="/basket"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <IconButton
                size="large"
                aria-label="show shopping cart"
                color="inherit"
              >
                <Badge badgeContent={basketCount} color="error">
                  <LocalMallIcon />
                </Badge>
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchBar;
