const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const categoryData = await Category.findAll({
    include: {
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      model: Product
    }
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', async (req, res) => {
  const categoryData = await Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      model: Product
    }
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'No category found with that id' })
        return;
      } res.json(data)
    }).catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// create a new category
router.post('/', async (req, res) => {
  const categoryData = await Category.create({
    category_name: req.body.category_name
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', async (req, res) => {
  const categoryData = await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then((data) => {
      if (!data[0]) {
        res.status(404).json({ message: 'No category found with that id' })
        return;
      } res.json(data)
    }).catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'No category found with that id' })
        return;
      } res.json(data)
    }).catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
