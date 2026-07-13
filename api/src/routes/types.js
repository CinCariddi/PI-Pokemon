const { Router } = require('express');
const { getTypes } = require('../services/pokemon');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const types = await getTypes();
    return res.json(types);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
