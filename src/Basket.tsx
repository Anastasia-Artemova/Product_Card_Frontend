import useShopStore from './useShopState';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Divider,
  Stack,
  Toolbar,
  Input,
  Button,
  Container,
} from '@mui/material';
import { yellow } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const Basket = () => {
  const productsInBasket = useShopStore((state) => state.productsInBasket);
  const products = useShopStore((state) => state.products);
  const increaseQuantity = useShopStore((state) => state.increaseQuantity);
  const decreaseQuantity = useShopStore((state) => state.decreaseQuantity);

  const totalItems = productsInBasket.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = productsInBasket.reduce((sum, item) => {
    const product = products.find((p: { id: number }) => p.id === item.productId);
    if (!product || product.price == null) return sum;
    return sum + product.price * item.quantity;
  }, 0);

  return (
    <>
      <Box sx={{ position: 'fixed', top: 20, left: 20, zIndex: 1200 }}>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          size="small"
          sx={{
            bgcolor: 'grey.900',
            color: yellow[100],
            borderRadius: 999,
            px: 2.5,
            py: 0.8,
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'grey.800',
            },
          }}
        >
          ← Return to shopping
        </Button>
      </Box>

      <Toolbar />

      <Box
        sx={(theme) => ({
          minHeight: '100vh',
          bgcolor: theme.palette.background.default,
          py: 4,
        })}
      >
        <Container maxWidth="md">
          <Stack spacing={3}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: 'background.paper',
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                Basket
              </Typography>

              {productsInBasket.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  Your basket is empty. Start adding some products!
                </Typography>
              ) : (
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Items in basket: <b>{totalItems}</b>
                  </Typography>

                  <Stack spacing={2} divider={<Divider />}>
                    {productsInBasket.map((basketItem) => {
                      const product = products.find(
                        (p: { id: number }) => p.id === basketItem.productId
                      );
                      if (!product) return null;

                      return (
                        <Box
                          key={basketItem.productId}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 2,
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 'bold' }}
                            >
                              {product.name}
                            </Typography>
                            {product.price !== undefined && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Price: ${product.price.toFixed(2)}
                              </Typography>
                            )}
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <IconButton
                              size="small"
                              sx={{
                                bgcolor: 'grey.100',
                                '&:hover': {
                                  bgcolor: 'grey.200',
                                },
                              }}
                              onClick={() =>
                                decreaseQuantity(basketItem.productId)
                              }
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>

                            <Typography
                              variant="body1"
                              sx={{ minWidth: 24, textAlign: 'center' }}
                            >
                              <b>{basketItem.quantity}</b>
                            </Typography>

                            <IconButton
                              size="small"
                              sx={{
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText',
                                '&:hover': {
                                  bgcolor: 'primary.dark',
                                },
                              }}
                              onClick={() =>
                                increaseQuantity(basketItem.productId)
                              }
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      );
                    })}
                  </Stack>
                </>
              )}
            </Paper>

            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: 'background.paper',
              }}
            >
              <Stack spacing={3}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: 999,
                      textTransform: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Claim discount
                  </Button>

                  <Input
                    placeholder="Promo code"
                    sx={(theme) => ({
                      backgroundColor: theme.palette.grey[100],
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      flexGrow: 1,
                      '& input': {
                        padding: '6px 10px',
                      },
                    })}
                  />
                </Box>

                <Divider />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1">Order total</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Shipping and taxes calculated at checkout.
                    </Typography>
                  </Box>
                  <Typography variant="h5" fontWeight={600}>
                    ${totalPrice.toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ textTransform: 'none', borderRadius: 999 }}
                  disabled={productsInBasket.length === 0}
                >
                  Go to checkout
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Basket;
