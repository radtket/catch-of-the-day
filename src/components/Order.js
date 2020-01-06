import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { formatPrice } from "../utils/helpers";

const Order = ({ fishes, order, removeFromOrder }) => {
  const total = Object.entries(order).reduce((prevTotal, [key, count]) => {
    const fish = fishes[key];

    if (fish && fish.status === "available") {
      return prevTotal + count * fish.price;
    }
    return prevTotal;
  }, 0);

  return (
    <div className="order-wrap">
      <h2>Order</h2>
      <TransitionGroup className="order" component="ul">
        {Object.entries(order).map(([key, count]) => {
          const fish = fishes[key];
          const transitionOptions = {
            classNames: "order",
            key,
            timeout: { enter: 500, exit: 500 },
          };

          // Make sure the fish is loaded before we continue!
          if (!fish) {
            return null;
          }

          if (!fish && fish.status === "available") {
            return (
              <CSSTransition {...transitionOptions}>
                <li key={key}>
                  Sorry {fish ? fish.name : "fish"} is no longer available
                </li>
              </CSSTransition>
            );
          }

          return (
            <CSSTransition {...transitionOptions}>
              <li key={key}>
                <span>
                  <TransitionGroup className="count" component="span">
                    <CSSTransition
                      key={count}
                      classNames="count"
                      timeout={{ enter: 500, exit: 500 }}
                    >
                      <span>{count}</span>
                    </CSSTransition>
                  </TransitionGroup>
                  lbs {fish.name}
                  {formatPrice(count * fish.price)}
                  <button onClick={() => removeFromOrder(key)} type="button">
                    &times;
                  </button>
                </span>
              </li>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
      <div className="total">
        Total:
        <strong>{formatPrice(total)}</strong>
      </div>
    </div>
  );
};

Order.propTypes = {
  fishes: PropTypes.object,
  order: PropTypes.object,
  removeFromOrder: PropTypes.func,
};

export default Order;
