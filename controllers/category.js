const Category = require("../models").Category;
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
  list(req, res) {
    return Category.findAll({
      include: [],
      order: [["createdAt", "ASC"]],
    })
      .then((category) => res.status(200).send(category))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Category.findByPk(req.params.id, {
      include: [],
    })
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: "Category not found",
          });
        }
        return res.status(200).send(category);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  add(req, res) {
    const schema = {
      category_name: "string",
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }
    return Category.create({
      category_name: req.body.category_name,
    })
      .then((category) => res.status(200).send(category))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  update(req, res) {
    const schema = {
      category_name: "string",
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }
    return Category.findByPk(req.params.id)
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: "Category not found",
          });
        }
        return category
          .update({
            category_name: req.body.category_name || category.category_name,
          })
          .then(() => res.status(200).send(category))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Category.findByPk(req.params.id)
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: "Category not found",
          });
        }
        return category
          .destroy()
          .then(() => res.status(200).send(category))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
