// eslint-disable-next-line no-unused-vars
import React, { useContext, useState }  from "react";
import "./FoodItem.css";
import { assets } from "../assets/assets"; 
import { StoreContext } from "../Context/StoreContext";


// eslint-disable-next-line react/prop-types
const FoodItem = ({ id, name, price, description, image }) => {
  // const [itemCount, setItemCount] = useState(0)
  const {addToCart,removefromCart,cartItems,url} = useContext(StoreContext)
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={url+"/images/"+image} alt="" className="food-item-image" />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
           onClick={()=>removefromCart(id)}
              src={assets.remove_icon_red}
            />
              <p>{cartItems[id]}</p>
            <img onClick={()=>addToCart(id)}  src={assets.add_icon_green} />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
}
export default FoodItem;
