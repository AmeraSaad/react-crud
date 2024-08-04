import {useState} from 'react';
import uniqueid from 'uniqueid';
import './App.css';
import CreateProduct from './components/CreateProduct';
import SearchBar from './components/SearchBar';
import ProductsTable from './components/ProductsTable';
import WarningMSG from './components/WarningMSG';

function App() {
  //states
  const [products,setProducts]= useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  //effects
  
  //funcs (handlers)
  const addProduct = (product)=>{
    const newProduct = { ...product, id: uniqueid() };
    setProducts([...products, newProduct]);
    // const newProducts= [...products];
    // newProducts.push(product);
    // setProducts(newProducts);
  }

  const removeProduct = (id) => {
    const newProducts = products.filter(product => product.id !== id);
    setProducts(newProducts);
  };

  const updateProduct = (updatedProduct) => {
    const newProducts = products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(newProducts);
    setProductToEdit(null);
  };

  const editProduct = (product) => {
    setProductToEdit(product);
  };

  return (
    <>
      <CreateProduct addProduct={addProduct} productToEdit={productToEdit} updateProduct={updateProduct}/>
      <SearchBar/>
      {products.length > 0 ? (
        <ProductsTable products={products} removeProduct={removeProduct} editProduct={editProduct} />
      ) : (
        <WarningMSG />
      )}
    </>
  );
}

export default App;
