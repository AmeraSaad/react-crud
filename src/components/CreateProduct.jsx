import { useState, useEffect } from "react";
import Joi from "joi";

const CreateProduct = ({ addProduct, productToEdit, updateProduct }) => {
  const [product, setProduct] = useState({
    name: "",
    cat: "",
    price: "",
    desc: "",
  });

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    name: Joi.string().min(3).required().label("Product Name"),
    cat: Joi.string().required().label("Product Category"),
    price: Joi.number().positive().required().label("Product Price"),
    desc: Joi.string().allow("").optional().label("Product Description"),
  });

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  const validate = () => {
    const { error } = schema.validate(product, { abortEarly: false });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

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
    setErrors({});
  };

  return (
    <div>
      <div className="w-75 mx-auto py-5 px-3 rounded-3 shadow-lg mt-5">
        <h1>{productToEdit ? "Edit Product" : "CRUD System"}</h1>
        <form id="product-form" onSubmit={handleSubmit}>
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
            {errors.name && <div className="alert alert-danger">{errors.name}</div>}
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
            {errors.cat && <div className="alert alert-danger">{errors.cat}</div>}
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
            {errors.price && <div className="alert alert-danger">{errors.price}</div>}
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
            {errors.desc && <div className="alert alert-danger">{errors.desc}</div>}
          </div>
          <button id="create-btn" className="btn btn-primary mx-1">
            {productToEdit ? "Update Product" : "Add Product"}
          </button>
          <button className="btn btn-primary" onClick={clearForm}>
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
