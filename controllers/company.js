const Company = require("../models").Company;
const Waste = require("../models").Waste;
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
      include: [
        {
          model: Waste,
          as: 'pair',
          include: [{
            model: Company,
            as: 'company'
          }]
        }
      ],
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
        console.log(error);
      });
  },

  add(req, res) {
    const schema = {
      company_name: "string",
      role: {
        type: "string",
        // enum: ["0", "1"],
      },
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }
    return Company.findOrCreate({
      where: {
        company_name: req.body.company_name,
        // role: req.body.role,
      },
      default:{
        company_name: req.body.company_name,
        // role: req.body.role,
      }
    })
      .then((company) => res.status(200).send(company))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  update(req, res) {
    const schema = {
      company_name: "string",
      // role: {
      //   type: "string",
      //   enum: ["0", "1"],
      //   optional: true
      // },
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
            // role: company.role
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
