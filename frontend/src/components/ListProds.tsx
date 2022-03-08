import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ListProds.css";

const ListProds = () => {
  // for tracking all the prod changes in our db
  const [prods, setProds] = useState([]);

  // for deleting a particular prod using its id
  const deleteProd = async (id: Number) => {
    try {
      // sending a delete request to /inventories/:id
      const deletedProd = await fetch(
        `http://localhost:4000/inventories/${id}`,
        {
          method: "DELETE",
        }
      );
      // instantly filter out list of products by removing the recently deleted product
      setProds(prods.filter((prod) => prod["prod_id"] !== id));
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // for fetching & rendering all the products from our db
  const getProds = async () => {
    try {
      // sending a get request to /inventories
      const response = await fetch("http://localhost:4000/inventories");
      // parsing the body text as JSON
      const jsonData = await response.json();
      setProds(jsonData);
    } catch (err: any) {
      console.error(err.message);
    }
  };
  // load all prods from the db, only once, at the start of page load
  useEffect(() => {
    getProds();
  }, []);

  return (
    <>
      <div className="container mt-2">
        <div className="row">
          <h1 className="text-center ">Cavea Products</h1>
        </div>
        <div className="row">
          <div className="table-container bg-white py-4 mt-5 col-md-10">
            <div className="inline d-flex mb-2 p-2">
              <Link to="/add" className="btn btn-success ">
                ADD
              </Link>
            </div>
            {prods.length > 0 ? (
              <table className="table table-striped table-hover ">
                <thead id="thead">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price (₾)</th>
                    <th scope="col">Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {prods.map((product) => (
                    <tr key={product["prod_id"]}>
                      <td className="align-middle">{product["prod_name"]}</td>
                      <td className="align-middle">
                        {product["prod_location"]}
                      </td>
                      <td className="align-middle">{product["prod_price"]}</td>
                      <td className="align-middle">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProd(product["prod_id"])}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h2 className="text-center text-secondary">The List is empty</h2>
            )}
            <div className="inline d-flex justify-content-end mt-2 p-2">
              <Link to="/add" className="btn btn-success ">
                ADD
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProds;
