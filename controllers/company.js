const Company = require("../models").Company;
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
  list(req, res) {
    return Company.findAll({
      include: [],
      order: [["createdAt", "ASC"]],
    })
      .then((company) => res.status(200).send(company))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Company.findByPk(req.params.id, {
      include: [],
    })
      .then((company) => {
        if (!company) {
          return res.status(404).send({
            message: "Company not found",
          });
        }
        return res.status(200).send(company);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  add(req, res) {
    const schema = {
      company_name: "string",
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }
    return Company.create({
      company_name: req.body.company_name,
    })
      .then((company) => res.status(200).send(company))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  update(req, res) {
    const schema = {
      company_name: "string",
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }
    return Company.findByPk(req.params.id)
      .then((company) => {
        if (!company) {
          return res.status(404).send({
            message: "Company not found",
          });
        }
        return company
          .update({
            company_name: req.body.company_name || company.company_name,
          })
          .then(() => res.status(200).send(company))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Company.findByPk(req.params.id)
      .then((company) => {
        if (!company) {
          return res.status(404).send({
            message: "Company not found",
          });
        }
        return company
          .destroy()
          .then(() => res.status(200).send(company))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};