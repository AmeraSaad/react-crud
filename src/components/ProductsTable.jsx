import Swal from 'sweetalert2';

function ProductsTable({ products, removeProduct, editProduct }) {
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        removeProduct(id);
        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        );
      }
    });
  };

  return (
    <div id="product-table-container" className="w-75 mx-auto my-5">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.cat}</td>
              <td>{product.price}</td>
              <td>{product.desc}</td>
              <td>
                <button className="btn btn-outline-success" onClick={() => editProduct(product)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </td>
              <td>
                <button className="btn btn-outline-danger" onClick={() => handleDelete(product.id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;