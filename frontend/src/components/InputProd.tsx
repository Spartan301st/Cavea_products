import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./InputProd.css";

// our component
const InputProd = () => {
  // for navigating back to homepage
  let navigate = useNavigate();
  // our states
  // initial form input values
  const [values, setValues] = useState({
    prod_location: "",
    prod_name: "",
    prod_price: "",
  });

  // for tracking if the field was focused to start showing any errors
  const [fieldWasFocused, setFieldWasFocused] = useState({
    prod_location: false,
    prod_name: false,
    prod_price: false,
  });

  // error messages for each corresponding field
  const errorMessages = {
    selectErrorMsg: "Select one of the valid locations.",
    nameErrorMsg:
      "Plz enter a valid product name (1-64 chars long, no spec chars except space)",
    priceErrorMsg: "Plz enter a valid product price (greater than 0)",
  };

  // patterns to check form field values against
  const fieldPatterns = {
    prodLocationPattern:
      /^Main office|Cavea Galleria|Cavea Tbilisi Mall|Cavea East Point|Cavea City Mall$/,
    prodNamePattern: /^[A-Za-z0-9 ]{1,64}$/,
    prodPricePattern: /^\d+(\.\d+)?$/,
  };

  // function for handling the changes in our inputs
  const handleInputChange = (e: any) => {
    // destructure key val pairs from our input fields and select
    const { name, value } = e.target;
    // update only the field that was changed
    setValues({
      ...values,
      [name]: value,
    });
  };

  // initially our fields aren't focused.
  // We don't want to display the error message unless user first focuses on the field and doesn't type anything/types wrong stuff
  const handleFocus = (e: any) => {
    // destructure key val pairs from our input fields and select
    const { name } = e.target;
    setFieldWasFocused({ ...fieldWasFocused, [name]: true });
  };

  // submition handling function
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const body = values;
    const response = await fetch("http://localhost:4000/inventories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // below line might be used to retrieve error messages from the backend
    // const jsonData = await response.json();
    // if any error don't proceed on otherwise redirect to homepage
    if (response.status === 200) {
      navigate(`/`);
    }
    try {
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <>
      <div className="container mt-2">
        <div className="row">
          <h1 className="text-center mt-2">Add a new product</h1>
        </div>
        <div className="row">
          <div className="form_container">
            <form
              className="mt-5 p-5 bg-white col-md-8"
              onSubmit={handleSubmit}
              noValidate={true}
            >
              <div className=" mb-3">
                <select
                  id="dropdown"
                  name="prod_location"
                  className="form-control"
                  value={values.prod_location}
                  onChange={handleInputChange}
                  required
                  onBlur={handleFocus}
                >
                  <option className="dropdown-opt" hidden>
                    Select a location
                  </option>
                  <option className="dropdown-opt" value="Main office">
                    Main office
                  </option>
                  <option className="dropdown-opt" value="Cavea Galleria">
                    Cavea Galleria
                  </option>
                  <option className="dropdown-opt" value="Cavea Tbilisi Mall">
                    Cavea Tbilisi Mall
                  </option>
                  <option className="dropdown-opt" value="Cavea East Point">
                    Cavea East Point
                  </option>
                  <option className="dropdown-opt" value="Cavea City Mall">
                    Cavea City Mall
                  </option>
                </select>
                <span className="text-danger mt-1 error-message">
                  {fieldWasFocused.prod_location &&
                  !fieldPatterns.prodLocationPattern.test(values.prod_location)
                    ? errorMessages.selectErrorMsg
                    : ""}
                </span>
              </div>
              <div className="mb-3 row">
                <label htmlFor="name" className="col-sm-3 col-form-label">
                  Name
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="prod_name"
                    value={values.prod_name}
                    onChange={handleInputChange}
                    required
                    onBlur={handleFocus}
                  />
                </div>
                <span className="text-danger mt-1 error-message">
                  {fieldWasFocused.prod_name &&
                  !fieldPatterns.prodNamePattern.test(values.prod_name)
                    ? errorMessages.nameErrorMsg
                    : ""}
                </span>
              </div>
              <div className="mb-3 row">
                <label htmlFor="price" className="col-sm-3 col-form-label">
                  Price(₾)
                </label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="form-control"
                    id="price"
                    name="prod_price"
                    value={values.prod_price}
                    onChange={handleInputChange}
                    required
                    onBlur={handleFocus}
                  />
                </div>
                <span className="text-danger mt-1 error-message">
                  {fieldWasFocused.prod_price &&
                  !fieldPatterns.prodPricePattern.test(values.prod_price)
                    ? errorMessages.priceErrorMsg
                    : ""}
                </span>
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputProd;
