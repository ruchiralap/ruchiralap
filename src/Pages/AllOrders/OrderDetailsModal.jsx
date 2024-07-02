import React from "react";

const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-11/12 max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        <div>
          <p>
            <strong>Customer Name:</strong> {order.name}
          </p>
          <p>
            <strong>Phone Number:</strong> {order.phone}
          </p>
          <p>
            <strong>Address:</strong> {order.address}
          </p>
          <p>
            <strong>Delivery Option:</strong> {order.deliveryOption}
          </p>
          <p>
            <strong>Coupon Code:</strong> {order.couponCode}
          </p>
          <p>
            <strong>Order Note:</strong> {order.orderNote}
          </p>
          <p>
            <strong>Subtotal:</strong> {order.subtotal}
          </p>
          <p>
            <strong>Total:</strong> {order.total}
          </p>
          <p>
            <strong>Delivery Fee:</strong> {order.deliveryFee}
          </p>
          <div>
            <h3 className="font-bold">Products:</h3>
            <ul>
              {order.products.map((product) => (
                <li key={product.id}>
                  {product.name} - {product.price} x {product.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
