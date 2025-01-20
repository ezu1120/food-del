/* eslint-disable react/prop-types */
import  { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext); // Access the food list from context

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (
            category.toLowerCase() === "all" ||
            category.toLowerCase() === item.category.toLowerCase()
          ) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null; // Don't render if the category doesn't match
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
