import { useState,useEffect} from 'react';
import uniqueid from 'uniqueid';
import './App.css';
import CreateProduct from './components/CreateProduct';
import SearchBar from './components/SearchBar';
import ProductsTable from './components/ProductsTable';
import WarningMSG from './components/WarningMSG';

function App() {
  const createId = uniqueid("prefix");
  // states
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Load products from localStorage
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(savedProducts);
  }, []);

  //save data
  const saveProductsToLocalStorage = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
  };

  // funcs (handlers)
  const addProduct = (product) => {
    const newProduct = { ...product, id: createId};
    const newProducts = [...products, newProduct];
    setProducts(newProducts);
    saveProductsToLocalStorage(newProducts);
  };

  const removeProduct = (id) => {
    const newProducts = products.filter(product => product.id !== id);
    setProducts(newProducts);
    saveProductsToLocalStorage(newProducts);
  };

  const updateProduct = (updatedProduct) => {
    const newProducts = products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(newProducts);
    saveProductsToLocalStorage(newProducts);
    setProductToEdit(null);
  };

  const editProduct = (product) => {
    setProductToEdit(product);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery)
  );

  const searchFailed = searchQuery && filteredProducts.length === 0;

  return (
    <>
      <CreateProduct addProduct={addProduct} productToEdit={productToEdit} updateProduct={updateProduct} />
      <SearchBar handleSearch={handleSearch} />
      {filteredProducts.length > 0 ? (
        <ProductsTable products={filteredProducts} removeProduct={removeProduct} editProduct={editProduct} />
      ) : (
        <WarningMSG searchFailed={searchFailed} />
      )}
    </>
  );
}

export default App;
