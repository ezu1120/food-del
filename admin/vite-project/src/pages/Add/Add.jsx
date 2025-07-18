// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from 'axios'
import { toast } from "react-toastify";
// eslint-disable-next-line react/prop-types
const Add = ({url}) => {

  const [image, setImage] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`,formData)
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false)
      toast.success(response.data.message)
    }
    else {
      toast.error(response.data.message)
    }

    // Clear the error messages initially
    let newErrorMessages = {};

    // Validate each field
    if (!data.name) {
      newErrorMessages.name = "Please fill out this field";
    }
    if (!data.description) {
      newErrorMessages.description = "Please fill out this field";
    }
    if (!data.price) {
      newErrorMessages.price = "Please fill out this field";
    }
    if (!image) {
      newErrorMessages.image = "Please upload an image";
    }

    // If there are errors, set the error messages and do not proceed
    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }

    // Clear error messages and submit the form
    setErrorMessages({});
    console.log("Form submitted", data);
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
          {errorMessages.image && (
            <p style={{ color: "red" }}>{errorMessages.image}</p>
          )}
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
          {errorMessages.name && (
            <p style={{ color: "red" }}>{errorMessages.name}</p>
          )}
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
          {errorMessages.description && (
            <p style={{ color: "red" }}>{errorMessages.description}</p>
          )}
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category" required>
              <option value="salad">Salad</option>
              <option value="rolls">Rolls</option>
              <option value="deserts">Deserts</option>
              <option value="sandwich">Sandwich</option>
              <option value="cake">Cake</option>
              <option value="pure_veg">Pure Veg</option>
              <option value="pasta">Pasta</option>
              <option value="noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              required
            />
            {errorMessages.price && (
              <p style={{ color: "red" }}>{errorMessages.price}</p>
            )}
          </div>
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
