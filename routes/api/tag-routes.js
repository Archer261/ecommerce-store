const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tagData = await Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'products'
      }
    ]
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', async (req, res) => {
  const tagData = await Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'products'
      }
    ]
  }).then((data) => {
    if (!data) {
      res.status(404).json({ message: 'No Tag found with that id' })
      return;
    } res.json(data)
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then((data) => {
    if (!data) {
      res.status(404).json({ message: 'No Tag found with that id' })
      return;
    } res.json(data)
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then((data) => {
    if (!data) {
      res.status(404).json({ message: 'No Tag found with that id' })
      return;
    } res.json(data)
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
