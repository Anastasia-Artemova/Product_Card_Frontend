import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductDetailWrapper = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) return <div>Invalid product ID</div>;
  
  return <ProductCard prodId={Number(id)} />;
};

export default ProductDetailWrapper;