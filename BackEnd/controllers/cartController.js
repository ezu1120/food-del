import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Atomic increment using MongoDB's $inc operator
    await userModel.findByIdAndUpdate(
      userId,
      { $inc: { [`cartData.${itemId}`]: 1 } }, // Increment item count by 1
      { new: true, upsert: true } // Return updated document, create field if not existing
    );

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const user = await userModel.findById(userId);

    if (!user.cartData || !user.cartData[itemId]) {
      return res.json({
        success: false,
        message: "Item not found in cart or quantity already zero",
      });
    }

    // Atomic operation: Decrease quantity or remove item if quantity becomes zero
    const update =
      user.cartData[itemId] === 1
        ? { $unset: { [`cartData.${itemId}`]: "" } } // Remove item when quantity is 1
        : { $inc: { [`cartData.${itemId}`]: -1 } }; // Decrease quantity

    await userModel.findByIdAndUpdate(userId, update);

    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res
      .status(500)
      .json({ success: false, message: "Error removing from cart" });
  }
};


// Fetch user cart data
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching cart data" });
  }
};

export { addToCart, removeFromCart, getCart };
