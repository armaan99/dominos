import React, { useEffect } from "react";
import "./orderHistory.css";
import { useSelector } from "react-redux";

export default function OrderHistory() {
  const orders = useSelector((state) => state.auth.user.orders);
  const menu = useSelector((state) => state.menu.menu);

  useEffect(() => {
    if (menu.length === 1) {
      window.location.href = "/";
    }
  }, []);

  return orders.length === 0 ? (
    <div className="order-history">You have not ordered anything</div>
  ) : (
    <div className="order-history">
      <h2 className="order-history-title">Your Past Orders</h2>
      <div className="orders-list">
        {orders.map((item, index) => {
          const t = Date(item.createdAt).split(" ");
          const date = t[0] + " " + t[1] + " " + t[2] + " " + t[3];
          return (
            <div className="order-card" key={index}>
              <div className="order-card-head">
                <div>Delivery</div>
                <div className="order-status">{item.status}</div>
              </div>
              <div className="order-date">{date}</div>
              <div className="order-items">
                {item.order_details.map((order, index) => {
                  const curItem = menu.filter(
                    (x) => x._id === order.item_id
                  )[0];
                  return (
                    <div className="order-item" key={index}>
                      <div className="order-veg-nonveg">
                        {curItem?.is_veg ? (
                          <img
                            className="order-item-veg"
                            src="https://pizzaonline.dominos.co.in/static/assets/icons/veg.svg"
                            alt="Veg"
                          />
                        ) : (
                          <img
                            className="order-item-nonveg"
                            src="https://pizzaonline.dominos.co.in/static/assets/icons/non_veg.svg"
                            alt="Non-Veg"
                          />
                        )}
                        <div className="order-item-name">{curItem?.name}</div>
                      </div>
                      {order.qty}
                    </div>
                  );
                })}
              </div>
              <div className="order-amount">₹ {item.amount}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
