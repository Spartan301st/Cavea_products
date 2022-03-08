import express from "express";
const router = express.Router();
import Product from "../models/Product.js";

// READ all prods (get) \\
router.get("/", async (req, res) => {
  try {
    const allProds = await Product.findAll();
    const returnRes = allProds.map((product) => product["dataValues"]);
    res.status(200).json(returnRes);
  } catch (err) {
    console.error(err);
  }
});

// CREATE a prod (post)\\
router.post("/", async (req, res) => {
  try {
    // destructure all the necessary data from the submitted form
    const { prod_location, prod_name, prod_price } = req.body;
    // field validation
    let errors = {};
    // patterns to check the input valideness
    const fieldPatterns = {
      // prodLocationPattern: /^[a-zA-Z ]+$/,
      prodLocationPattern:
        /^Main office|Cavea Galleria|Cavea Tbilisi Mall|Cavea East Point|Cavea City Mall$/,
      prodNamePattern: /^[A-Za-z0-9 ]{1,64}$/,
      prodPricePattern: /^\d+(\.\d+)?$/,
    };

    if (
      !prod_location ||
      !fieldPatterns.prodLocationPattern.test(prod_location)
    )
      errors.prod_location_err = "Select one of the valid locations.";
    if (!prod_name || !fieldPatterns.prodNamePattern.test(prod_name))
      errors.prod_name_err =
        "Plz enter a valid product name (1-64 chars long, no spec chars except space)";
    if (!prod_price || !fieldPatterns.prodPricePattern.test(prod_price))
      errors.prod_price_err =
        "Plz enter a valid product price (greater than 0)";
    // creating process
    // if (errors.length > 0) {
    if (Object.keys(errors).length > 0) {
      res.status(400).json(errors);
    } else {
      const newProd = await Product.create({
        prod_name,
        prod_location,
        prod_price,
      });
      res.status(200).json(newProd);
    }
  } catch (err) {
    console.error(err.message);
  }
});

// // DELETE a particular prod (delete) \\
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const prodToBeDel = await Product.destroy({
      where: {
        prod_id: id,
      },
    });
    res.send(`Entry with an id ${id} was successfully deleted`);
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
