import React from "react";

export default function VerticalItemsComponent({ item }) {
  return (
    <div className="d-flex border my-3">
      <div>
        <img src={item.image} />
      </div>
      <div>
        <p>{item.name}</p>
        <p>{item.price}</p>
      </div>
    </div>
  );
}
