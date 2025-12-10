import './App.css';
import ProductList from './ProductList';
import SearchBar from './SearchBar';
import { Box, Container } from '@mui/material';

function App() {

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 2,
      }}
    >
      <Container maxWidth="lg">
        <SearchBar />
        <Box sx={{ mt: 3 }}>
          <ProductList />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
