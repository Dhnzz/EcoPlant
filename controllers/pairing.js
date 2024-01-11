const Pairing = require("../models").Pairing;
const Company = require("../models").Company;
const Waste = require("../models").Waste;
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
  list(req, res) {
    return Pairing.findAll({
      include: [],
      order: [["createdAt", "ASC"]],
    })
      .then((pairing) => res.status(200).send(pairing))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Pairing.findByPk(req.params.id, {
      include: [
        {
          model: Company,
          as: "pair"
        }
      ],
    })
      .then((pairing) => {
        if (!pairing) {
          return res.status(404).send({
            message: "Pairing Not Found",
          });
        }
        return res.status(200).send(pairing);
      })
      .catch((error) => console.log(error));
  },

  add(req, res) {
    const schema = {
      buyer_id: "number|nullable:false",
      waste_id: "number|nullable: false",
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }

    return Company.findByPk(req.body.buyer_id)
      .then((company) => {
        if (!company) {
          return res.status(404).send({
            message: "Company not found",
          });
        }

        return Waste.findByPk(req.body.waste_id)
          .then((category) => {
            if (!category) {
              return res.status(404).send({
                message: "Waste not found",
              });
            }
            return Pairing.create({
              buyer_id: req.body.buyer_id,
              waste_id: req.body.waste_id,
            })
              .then((pairing) => res.status(200).send(pairing))
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
      pairing_name: "string|optional:true",
      company_id: "number|optional:true",
      category_id: "number|optional:true",
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }
    return Pairing.findByPk(req.params.id)
      .then((pairing) => {
        if (!pairing) {
          return res.status(404).send({
            message: "Pairing not found",
          });
        }
        return pairing
          .update({
            pairing_name: req.body.pairing_name || pairing.pairing_name,
            company_id: req.body.company_id || pairing.company_id,
            category_id: req.body.category_id || pairing.category_id,
          })
          .then(() => res.status(200).send(pairing))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Pairing.findByPk(req.params.id)
      .then((pairing) => {
        if (!pairing) {
          return res.status(404).send({
            message: "Pairing not found",
          });
        }
        return pairing
          .destroy()
          .then(() => res.status(200).send(pairing))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
