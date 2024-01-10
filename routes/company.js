var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { Company } = require("../models");

const v = new Validator();

router.get("/", async (req, res) => {
    const company = await Company.findAll();
    return res.json(company);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const company = await Company.findByPk(id);
    return res.json(company || {});
});

router.post("/", async (req, res) => {
  const schema = {
    company_name: "string",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }
  const company = await Company.create(req.body);

  res.json(company);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  let company = await Company.findByPk(id);

  if (!company) {
    return res.json({ message: "Company Not Found" });
  }

  const schema = {
    company_name: "string|optional",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }
  
  company = await company.update(req.body);
  res.json(company);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const company = await Company.findByPk(id);

    if(!company){
        return res.json({message: "Data tidak ditemukan"})
    }

    await company.destroy();

    res.json({message: "Data berhasil dihapus"})
});

module.exports = router;
