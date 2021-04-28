const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/recipes` endpoint

// ------------get all recipes-------------------

router.get('/', (req, res) => {
  Recipe.findAll()
  .then ((recipes)=> res.json(recipes))
  .catch((err)=> res.status(500).json
  (err));
  
});

// /-------------get one recipe----------------------
router.get("/:id", (req, res) => {
  Recipe.findByPk(req.params.id, {  
  })
    .then((recipeData) => res.json(recipeData))
    .catch((err) => res.status(500).json(err));
});


router.post('/', withAuth, async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
