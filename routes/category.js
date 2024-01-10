var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { Category } = require("../models");

const v = new Validator();

// Get All Data
router.get("/", async (req, res) => {
    const category = await Category.findAll();
    return res.json(category);
});

// Get Specific Data
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    return res.json(category || {});
});

// Insert Data
router.post("/", async (req, res) => {
  const schema = {
    category_name: "string",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }
  const category = await Category.create(req.body);

  res.json(category);
});

// Update Data
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  let category = await Category.findByPk(id);

  if (!category) {
    return res.json({ message: "Category Not Found" });
  }

  const schema = {
    category_name: "string|optional",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }
  
  category = await category.update(req.body);
  res.json(category);
});

// Delete Data
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const category = await Category.findByPk(id);

    if(!category){
        return res.json({message: "Data tidak ditemukan"})
    }

    await category.destroy();

    res.json({message: "Data berhasil dihapus"})
});

module.exports = router;
