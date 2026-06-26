const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  console.log("CREATE FOOD FUNCTION CALLED");
  try {
    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid(),
    );

    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id,
      price: req.body.price,
    });

    res.status(201).json({
      message: "food created successfully",
      food: foodItem,
    });
  } catch (err) {
    console.error("CREATE FOOD ERROR:");
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
}
async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel.find({}).populate("foodPartner", "name");

    // Get user's likes and saves
    const userLikes = await likeModel
      .find({ user: req.user._id })
      .select("food");
    const userSaves = await saveModel
      .find({ user: req.user._id })
      .select("food");

    // Convert to sets for faster lookup
    const likedFoodIds = new Set(userLikes.map((like) => like.food.toString()));
    const savedFoodIds = new Set(userSaves.map((save) => save.food.toString()));

    // Add isLiked and isSaved flags to each food item
    const foodItemsWithStates = foodItems.map((item) => ({
      ...item.toObject(),
      isLiked: likedFoodIds.has(item._id.toString()),
      isSaved: savedFoodIds.has(item._id.toString()),
    }));

    res.status(200).json({
      message: "Food items fetched successfully",
      foodItems: foodItemsWithStates,
    });
  } catch (error) {
    console.error("Error in getFoodItems:", error);
    res.status(500).json({
      message: "Error fetching food items",
      error: error.message,
    });
  }
}

async function likeFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadyLiked) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 },
    });

    return res.status(200).json({
      message: "Food unliked successfully",
    });
  }

  const like = await likeModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 },
  });

  res.status(201).json({
    message: "Food liked successfully",
    like,
  });
}

async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadySaved) {
    await saveModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { savesCount: -1 },
    });

    return res.status(200).json({
      message: "Food unsaved successfully",
    });
  }

  const save = await saveModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { savesCount: 1 },
  });

  res.status(201).json({
    message: "Food saved successfully",
    save,
  });
}

async function getSaveFood(req, res) {
  const user = req.user;

  const savedFoods = await saveModel.find({ user: user._id }).populate("food");

  if (!savedFoods || savedFoods.length === 0) {
    return res.status(404).json({ message: "No saved foods found" });
  }

  res.status(200).json({
    message: "Saved foods retrieved successfully",
    savedFoods,
  });
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSaveFood,
};
