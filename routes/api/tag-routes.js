const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tagData = await Tag.findAll({
    include: [{ model: Product }]
  })
  res.render("tag")
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  const tagData = await Tag.findOne({
    where: { id: req.params.id },
    include: [{ model: Product }]
  });
  res.render("tag", {

  })
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ where: { id: req.params.id } })
});

module.exports = router;
