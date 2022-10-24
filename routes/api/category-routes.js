const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const categoryData = await Category.findAll({
    include: [{ model: Product }]
  })
  res.render("category")
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  const categoryData = await Category.findOne({
    where: { id: req.params.id },
    include: [{ model: Product }]
  });
  res.render("category", {

  })
  // find one category by its `id` value
  // be sure to include its associated Products
});

// create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({ where: { id: req.params.id } })
});

module.exports = router;
