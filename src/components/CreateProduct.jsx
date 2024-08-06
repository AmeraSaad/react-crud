import { useState,useEffect  } from "react";

const CreateProduct = ({addProduct, productToEdit, updateProduct }) => { 
  const [product, setProduct] = useState({
    name: "",
    cat: "",
    price: "",
    desc: "",
  });

   //Use useEffect to Pre-fill the Form: When productToEdit changes,
  // the form is pre-filled with the product's details.
  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (productToEdit) {
      updateProduct(product);
    } else {
      addProduct(product);
    }
    setProduct({
      name: "",
      cat: "",
      price: "",
      desc: "",
    });
  };

  const clearForm = (e) => {
    e.preventDefault();
    setProduct({
      name: "",
      cat: "",
      price: "",
      desc: "",
    });
  };

  return (
    <div>
      <div className="w-75 mx-auto py-5 px-3 rounded-3 shadow-lg mt-5">
        <h1>{productToEdit ? "Edit Product" : "CRUD System"}</h1>
        <form id="product-form" onSubmit={handelSubmit}>
          <div className="mb-3">
            <label htmlFor="product_name" className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="product_name"
              name="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="product_category" className="form-label">Product Category</label>
            <input
              type="text"
              className="form-control"
              id="product_category"
              name="cat"
              value={product.cat}
              onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="product_price" className="form-label">Product Price</label>
            <input
              type="text"
              className="form-control"
              id="product_price"
              name="price"
              value={product.price}
              onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="product_desc" className="form-label">Product Description</label>
            <textarea
              className="form-control"
              id="product_desc"
              rows={3}
              name="desc"
              value={product.desc}
              onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
            />
          </div>
          <button id="create-btn" className="btn btn-primary mx-1" onClick={handelSubmit}>{productToEdit ? "Update Product" : "Add Product"}</button>
          <button className="btn btn-primary" onClick={clearForm} >Clear</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
