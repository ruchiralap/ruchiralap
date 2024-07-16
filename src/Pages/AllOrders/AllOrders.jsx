import React, { useState } from "react";
import useOrders from "../../Hooks/useOrders";
import OrderDetailsModal from "./OrderDetailsModal"; // Adjust the path as needed
import Swal from "sweetalert2";

const AllOrders = () => {
  const [allOrders, refetch, loading] = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderDetailsClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const updateOrderStatus = async (orderId, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to mark this order as ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, mark as ${status}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://ruchir-alap-backend.vercel.app/updateDeliveryStatus/${orderId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status }),
            }
          );
          if (response.ok) {
            Swal.fire(
              `${status.charAt(0).toUpperCase() + status.slice(1)}!`,
              `The order has been marked as ${status}.`,
              "success"
            );
            refetch(); // Re-fetch orders to get updated data
          }
        } catch (error) {
          Swal.fire("Error", "Failed to update delivery status", "error");
        }
      }
    });
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffaf0] py-8">
        <div className="w-full max-w-6xl bg-white/30 backdrop-blur-lg p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">All Orders</h2>
          <div className="overflow-x-auto">
            <table className="table table-xs w-full text-center">
              <thead>
                <tr className="text-xl bg-white/40 backdrop-blur-md">
                  <th>Customer Name</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-b border-gray-200"
                  >
                    <td className="p-2">
                      <div className="flex justify-center items-center">
                        {order.name}
                      </div>
                    </td>
                    <td className="p-2 align-middle">{order.phone}</td>
                    <td className="p-2 align-middle">{order.deliveryStatus}</td>
                    <td className="flex justify-center items-center space-x-4 p-2 align-middle">
                      <button
                        onClick={() => handleOrderDetailsClick(order)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Order details
                      </button>
                      <button
                        onClick={() =>
                          updateOrderStatus(order._id, "in process")
                        }
                        className="bg-orange-500 text-white px-4 py-2 rounded"
                      >
                        Mark as In Process
                      </button>
                      <button
                        onClick={() =>
                          updateOrderStatus(order._id, "delivered")
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Mark as Delivered
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="text-xl bg-white/40 backdrop-blur-md">
                  <th>Customer Name</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default AllOrders;
