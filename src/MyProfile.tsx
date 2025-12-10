import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Stack,
  Avatar,
  IconButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { yellow } from '@mui/material/colors';
import useShopState from './useShopState';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';

type ProfileFieldProps = {
  label: string;
  value: string;
  onChange: (newValue: string ) => void;
};

const ProfileField = ({ label, value, onChange }: ProfileFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const startEditing = () => {
    setDraft(value);
    setIsEditing(true);
  };

  const save = () => {
    onChange(draft);
    setIsEditing(false);
  };

  const cancel = () => {
    setDraft(value);
    setIsEditing(false);
  };

  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>

        {isEditing ? (
          <TextField
            size="small"
            fullWidth
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
        ) : (
          <Typography variant="body1">
            {value || <span style={{ color: '#888' }}>Not set</span>}
          </Typography>
        )}
      </Box>

      {isEditing ? (
        <Stack direction="row" spacing={0.5}>
          <IconButton size="small" onClick={save}>
            <CheckIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={cancel}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      ) : (
        <IconButton size="small" onClick={startEditing}>
          <EditIcon fontSize="small" />
        </IconButton>
      )}
    </Stack>
  );
};

const MyProfile = () => {
  const addProduct = useShopState((state) => state.addProduct);
  const [name, setName] = useState("John");
  const [email, setEmail] = useState("john123@gmail.com");
  const [phone, setPhone] = useState("12345667890");

  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodCategory, setProdCategory] = useState('');
  const [prodQuantity, setProdQuantity] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [errors, setErrors] = useState({
    name: '',
    desc: '',
    price: '',
    category: '',
    quantity: '',
    images: '',
    });

  const addImageField = () => setImageUrls([...imageUrls, '']);

  const updateImage = (index: number, value: string) => {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
  };

  const removeImageField = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const validateNewProduct = () => {
    let valid = true;
    const newErrors: any = {};

    if(!prodName.trim()){
        newErrors.name = "Name is required";
        valid = false;
    }

    if (!prodDesc.trim()) {
        newErrors.desc = 'Description is required.';
        valid = false;
    }

    if (!prodPrice || isNaN(Number(prodPrice)) || Number(prodPrice) <= 0) {
        newErrors.price = 'Enter a valid price.';
        valid = false;
    }

    if (!prodCategory.trim()) {
        newErrors.category = 'Category is required.';
        valid = false;
    }

    if (
        !prodQuantity ||
        isNaN(Number(prodQuantity)) ||
        Number(prodQuantity) < 0
    ) {
        newErrors.quantity = 'Enter a valid quantity.';
        valid = false;
    }

    if(imageUrls.length == 0){
        newErrors.images = 'Please, add images';
        valid = false;
    }

    setErrors(newErrors);
    return valid;

  }

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

      <Box
        sx={(theme) => ({
          minHeight: '100vh',
          bgcolor: theme.palette.background.default,
          py: 6,
        })}
      >
        <Container maxWidth="lg">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
            }}
          >
            <Grid container spacing={4}>
            <Grid size = {{xs: 12, md: 6}}>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={(theme) => ({
                        bgcolor: theme.palette.primary.main,
                        width: 56,
                        height: 56,
                      })}
                    >
                      <PersonIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" fontWeight="bold">
                        Personal Info
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Update your account details
                      </Typography>
                    </Box>
                  </Stack>

                  <Box  sx={{
                        border: 1,
                        borderColor: "grey.300",
                        borderRadius: 2,
                        p: 2,
                        pb: 1.5,
                        backgroundColor: "grey.50",
                        '&:hover': {
                        borderColor: "primary.main",
                        },
                    }}>
                  <ProfileField
                    label="Name"
                    value={name}
                    onChange={setName}
                  />
                  </Box>

                  <Box  sx={{
                        border: 1,
                        borderColor: "grey.300",
                        borderRadius: 2,
                        p: 2,
                        pb: 1.5,
                        backgroundColor: "grey.50",
                        '&:hover': {
                        borderColor: "primary.main",
                        },
                    }}>
                  <ProfileField
                    label="Email"
                    value={email}
                    onChange={setEmail}
                  />
                  </Box>

                  <Box  sx={{
                        border: 1,
                        borderColor: "grey.300",
                        borderRadius: 2,
                        p: 2,
                        pb: 1.5,
                        backgroundColor: "grey.50",
                        '&:hover': {
                        borderColor: "primary.main",
                        },
                    }}>
                  <ProfileField
                    label="Phone"
                    value={phone}
                    onChange={setPhone}
                  />
                  </Box>

                  <Box>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: 999,
                        textTransform: 'none',
                      }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Stack>
            </Grid>

              <Grid size = {{xs:12, md: 6}}>
                <Stack spacing={3}>
                  <Typography variant="h5" fontWeight="bold">
                    Add Your Product
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quickly add a new product to your shop
                  </Typography>

                  <Stack spacing={2}>
                    <TextField
                      label="Product name"
                      placeholder="Awesome hoodie"
                      fullWidth
                      size="small"
                      value = {prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      error={Boolean(errors.name)}
                      helperText = {errors.name}
                    />
                    <TextField
                      label="Description"
                      placeholder="Short product description..."
                      fullWidth
                      multiline
                      minRows={3}
                      size="small"
                      value = {prodDesc}
                      onChange={(e) => setProdDesc(e.target.value)}
                      error={Boolean(errors.desc)}
                      helperText = {errors.desc}
                    />
                    <TextField
                      label="Price"
                      placeholder="99.99"
                      fullWidth
                      size="small"
                      type="number"
                      value = {prodPrice}
                      onChange={(e) => setProdPrice(e.target.value)}
                      error={Boolean(errors.price)}
                      helperText = {errors.price}
                    />
                    <TextField
                      label="Category"
                      placeholder="Clothes, Electronics..."
                      fullWidth
                      size="small"
                      value = {prodCategory}
                      onChange={(e) => setProdCategory(e.target.value)}
                      error={Boolean(errors.category)}
                      helperText = {errors.category}
                    />
                    <TextField
                      label="Quantity"
                      placeholder="10"
                      fullWidth
                      size="small"
                      type="number"
                      value = {prodQuantity}
                      onChange={(e) => setProdQuantity(e.target.value)}
                      error={Boolean(errors.quantity)}
                      helperText = {errors.quantity}
                    />

                    <Stack spacing={2}>
                    <Typography variant="subtitle1">Product Images</Typography>

                    {imageUrls.map((url, index) => (
                        <Stack direction="row" spacing={1} key={index}>
                        <TextField
                            label={`Image URL ${index + 1}`}
                            placeholder="https://example.com/image.jpg"
                            fullWidth
                            size="small"
                            value={url}
                            onChange={(e) => updateImage(index, e.target.value)}
                        />

                        <IconButton color="error" onClick={() => removeImageField(index)}>
                            <RemoveIcon />
                        </IconButton>
                        </Stack>
                    ))}

                    <Button
                        variant="outlined"
                        onClick={addImageField}
                        sx={{ borderRadius: 999, textTransform: "none" }}
                    >
                        Add Image URL
                    </Button>
                    </Stack>


                    <Box>
                      <Button
                        variant="contained"
                        sx={{
                          borderRadius: 999,
                          textTransform: 'none',
                        }}
                        onClick={async() => {
                            if(!validateNewProduct()) return;
                            try {
                                await addProduct({
                                    name: prodName,
                                    description: prodDesc,
                                    price: Number(prodPrice),
                                    quantity: Number(prodQuantity),
                                    images: imageUrls.filter(url => url.trim() !== ''),
                                    category: prodCategory
                                });
                                
                                setProdName('');
                                setProdDesc('');
                                setProdPrice('');
                                setProdCategory('');
                                setProdQuantity('');
                                setImageUrls(['']);
                                setErrors({
                                    name: '',
                                    desc: '',
                                    price: '',
                                    category: '',
                                    quantity: '',
                                    images: '',
                                });
                                alert('Product added successfully!');
                            } catch (error) {
                                console.error('Failed to add product:', error);
                                alert('Failed to add product. Please try again.');
                            }
                        }} 
                      >
                        Add Product
                      </Button>
                    </Box>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default MyProfile;
