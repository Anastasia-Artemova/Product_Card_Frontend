import useShopState from './useShopState';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Chip,
  Box,
  Grid,
} from '@mui/material';
import { useState } from 'react';
import { ShoppingCart } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';

type ProductCardProps = {
  prodId: number;
};

const ProductCard = ({ prodId }: ProductCardProps) => {
  const products = useShopState((state) => state.products);
  const product = products.find((p) => p.id === prodId);
  const [selectedImage, setSelectedImage] = useState(product?.images[0]);
  const addToBasket = useShopState((state) => state.addToBasket);

  if (!product) return null;

  return (
    <Card
      elevation={3}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size ={{ xs:12, lg:7}}>
            <Box
              sx={{
                position: 'relative',
                mb: 2,
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={selectedImage}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: { xs: 220, md: 260 },
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              <IconButton
                onClick={() => addToBasket(product.id)}
                sx={(theme) => ({
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  bgcolor: theme.palette.background.paper,
                  boxShadow: 2,
                  '&:hover': {
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  },
                })}
              >
                <ShoppingCart />
              </IconButton>

              <IconButton
                sx={(theme) => ({
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  bgcolor: theme.palette.background.paper,
                  boxShadow: 2,
                  '&:hover': {
                    bgcolor: theme.palette.error.main,
                    color: theme.palette.error.contrastText,
                  },
                })}
              >
                <FavoriteIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: 'center',
              }}
            >
              {product.images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={product.name}
                  onClick={() => setSelectedImage(image)}
                  sx={{
                    width: 64,
                    height: 64,
                    objectFit: 'cover',
                    borderRadius: 1.5,
                    cursor: 'pointer',
                    border:
                      image === selectedImage
                        ? '2px solid #1976d2'
                        : '1px solid rgba(0,0,0,0.12)',
                    transition: 'border 0.15s ease',
                  }}
                />
              ))}
            </Box>
          </Grid>

          <Grid size={{xs:12, lg:5}}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              <Typography component="h2" variant="h6" fontWeight={600}>
                {product.name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" color="primary">
                  ${product.price?.toFixed(2)}
                </Typography>
                <Chip
                  label={
                    product.quantity > 0 ? 'In stock' : 'Out of stock'
                  }
                  color={product.quantity > 0 ? 'success' : 'error'}
                  size="small"
                  variant="outlined"
                />
              </Box>

              <Box sx={{ mt: 'auto' }}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={!product.quantity}
                  onClick={() => addToBasket(product.id)}
                >
                  {product.quantity > 0 ? 'Add to Basket' : 'Out of Stock'}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
