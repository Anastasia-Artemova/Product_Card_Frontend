import { Grid, Typography, Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import useShopState from './useShopState';
import ProductCard from './ProductCard';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductList = () => {
  const products = useShopState((state) => state.filteredProducts);
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);


  const fetchProducts = useShopState((state) => state.fetchProducts);
    
  const category = searchParams.get('category') || '';
  const fetchCategories = useShopState((state) => state.fetchCategories);

  useEffect(() => {
    const load = async () => {
      const result = await fetchCategories();  
      setCategories(result);
      setLoadingCategories(false);
      fetchProducts(category || undefined);
    };

  load();
  }, [category, fetchProducts]);

  const handleCategoryChange = (newCategory: string) => {
    if (newCategory && newCategory !== "All") {
      setSearchParams({ category: newCategory });
    } else {
      setSearchParams({});
    }
  };

  if (products.length === 0) {
    return (
      <Box
        sx={{
          mt: 6,
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        <Typography variant="h6" gutterBottom>
          No products found
        </Typography>
        <Typography variant="body2">
          Try changing your search or filters.
        </Typography>
      </Box>
    );
  }

  if(products.length === 1){
    return (
    <Box sx={{ mt: 1, minHeight: '60vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>

            {loadingCategories ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : (
              categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </Box>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="flex-start"
      >
        <ProductCard prodId={products[0].id} />
      </Grid>
    </Box>
  );
  }

  return (
    <Box sx={{ mt: 1, minHeight: '60vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>

            {loadingCategories ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : (
              categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </Box>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="flex-start"
      >
        {products.map((product) => (
          <Grid
            key={product.id}
            size = {{xs:12, sm:6, md:4, lg:4}}
          >
            <ProductCard prodId={product.id} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
