const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/reels",
  (req, res, next) => {
    console.log("STEP 1: Route reached");
    next();
  },
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

/* GET /api/food/ [protected] */
router.get(
  "/reels",
  authMiddleware.authUserMiddleware,
  foodController.getFoodItems,
);

router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood,
);

router.post(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.saveFood,
);

router.get(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.getSaveFood,
);

module.exports = router;
