const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  const productData = await Product.findAll({
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    include: [
      {
        model: Category,
        attributes: ['category_name']
      },
      {
        model: Tag,
        through: ProductTag,
        attributes: ['tag_name']
      }
    ]
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product
router.get('/:id', async (req, res) => {
  const productData = await Product.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    include: [
      {
        model: Category,
        attributes: ['category_name']
      },
      {
        model: Tag,
        through: ProductTag,
        attributes: ['tag_name'],
      }
    ]
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'No Product found with that id' })
        return;
      } res.json(data)
    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new product
router.post('/', async (req, res) => {
  const productData = await Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    tagIds: req.body.tagIds
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});



// update product
router.put('/:id', async (req, res) => {
  const productData = await Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      const deleteTags = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);
      return Promise.all([
        ProductTag.destroy({ where: { id: deleteTags } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((tagData) => res.json(tagData))
    .catch((err) => {
      res.status(400).json(err);
    });
});

// delete product
router.delete('/:id', async (req, res) => {
  const productData = await Product.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'No Product found with that id' })
        return;
      } res.json(data)
    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
