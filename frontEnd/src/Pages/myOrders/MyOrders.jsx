import React, { useContext, useEffect, useState } from "react";
import "./myOrders.css";
import { StoreContext } from "../../components/Context/StoreContext";
import axios from "axios";
import { assets } from "../../components/assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token, url]);

  return (
    <div className="my-orders">
          <h2>My Orders</h2>
          <div className="container">
              {data.map((orders, index) => {
                  return (
                      <div key={index} className="my-orders-order">
                          <img src={assets.parcel_icon} alt="" />  
                          <p>{orders.items.map((item,index) => {
                              if (index == orders.items.length - 1) {
                                return item.name + " x " + item.quantity
                              } else {
                                                                return item.name + " x " + item.quantity+" , "

                              }
                          })}</p>
                          <p>${orders.amount}.00</p>
                          <p>Items:{orders.items.length}</p>
                          <p><span>&#x25cf;</span><b>{orders.status}</b></p>
                          <button onClick={fetchOrders}>Track Order</button>
                      </div>
                  )
              })}
          </div>
    </div>
  );
};

export default MyOrders;
