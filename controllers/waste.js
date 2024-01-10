const Waste = require("../models").Waste;
const Company = require("../models").Company;
const Category = require("../models").Category;
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
  list(req, res) {
    return Waste.findAll({
      include: [],
      order: [["createdAt", "ASC"]],
    })
      .then((waste) => res.status(200).send(waste))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Waste.findByPk(req.params.id, {
      include: [
        {
          model: Company,
          as: "company",
        },
        {
          model: Category,
          as: "category",
        },
      ],
    })
      .then((waste) => {
        if (!waste) {
          return res.status(404).send({
            message: "Waste not found",
          });
        }
        return res.status(200).send(waste);
      })
      .catch((error) => {
        console.log(error)
      })
  },

  add(req, res) {
    const schema = {
      waste_name: "string",
      company_id: "number|nullable:false",
      category_id: "number|nullable: false",
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }

    return Company.findByPk(req.body.company_id)
      .then((company) => {
        if (!company) {
          return res.status(404).send({
            message: "Company not found",
          });
        }

        return Category.findByPk(req.body.category_id)
          .then((category) => {
            if (!category) {
              return res.status(404).send({
                message: "Category not found",
              });
            }
            return Waste.create({
              waste_name: req.body.waste_name,
              company_id: req.body.company_id,
              category_id: req.body.category_id,
            })
              .then((waste) => res.status(200).send(waste))
              .catch((error) => {
                res.status(400).send(error);
              });
          })
          .catch((error) => {
            res.status(400).send(error);
          });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  update(req, res) {
    const schema = {
      waste_name: "string|optional:true",
      company_id: "number|optional:true",
      category_id: "number|optional:true"
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }
    return Waste.findByPk(req.params.id)
      .then((waste) => {
        if (!waste) {
          return res.status(404).send({
            message: "Waste not found",
          });
        }
        return waste
          .update({
            waste_name: req.body.waste_name || waste.waste_name,
            company_id: req.body.company_id || waste.company_id,
            category_id: req.body.category_id || waste.category_id
          })
          .then(() => res.status(200).send(waste))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Waste.findByPk(req.params.id)
      .then((waste) => {
        if (!waste) {
          return res.status(404).send({
            message: "Waste not found",
          });
        }
        return waste
          .destroy()
          .then(() => res.status(200).send(waste))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
