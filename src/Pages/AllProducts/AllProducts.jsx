import React, { useState } from "react";
import PrivateAxios from "../../Hooks/PrivateAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axios from "axios";

const AllProducts = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [defaultImageUrl, setDefaultImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const image_hosting_key = "7b7cc2939f38dd7f29e0801393262933";
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const openModal = (product) => {
    setSelectedProduct(product);

    setValue("product_name", product.product_name);
    setValue("category_name", product.category_name);
    setValue("price", product.price);
    setValue("product_id", product._id);
    setValue("weight", product.weight);
    setDefaultImageUrl(product.product_image);
    setValue("description", product.description);
    setValue("description_title", product.description_title);
    for (let i = 1; i <= 5; i++) {
      setValue(`description_title_${i}`, product[`description_title_${i}`]);
      for (let j = 1; j <= 3; j++) {
        setValue(
          `description_point_${i}_${j}`,
          product[`description_point_${i}_${j}`]
        );
      }
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
    reset();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://ruchir-alap-backend.vercel.app/deleteProduct/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Category has been deleted.", "success");
              refetch();
            }
          });
      }
    });
  };

  const {
    data: products = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await PrivateAxios.get(`/products`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    if (data.productimage[0]) {
      const imageFile = { image: data.productimage[0] };
      const res = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        const ProductInfoToUpdate = {
          product_name: data.product_name,
          category_name: data.category_name,
          price: data.price,
          product_image: res.data.data.display_url,
          weight: data.weight,
          description: data.description,
          description_title: data.description_title,
          description_title_1: data.description_title_1,
          description_point_1_1: data.description_point_1_1,
          description_point_1_2: data.description_point_1_2,
          description_point_1_3: data.description_point_1_3,
          description_title_2: data.description_title_2,
          description_point_2_1: data.description_point_2_1,
          description_point_2_2: data.description_point_2_2,
          description_point_2_3: data.description_point_2_3,
          description_title_3: data.description_title_3,
          description_point_3_1: data.description_point_3_1,
          description_point_3_2: data.description_point_3_2,
          description_point_3_3: data.description_point_3_3,
          description_title_4: data.description_title_4,
          description_point_4_1: data.description_point_4_1,
          description_point_4_2: data.description_point_4_2,
          description_point_4_3: data.description_point_4_3,
          description_title_5: data.description_title_5,
          description_point_5_1: data.description_point_5_1,
          description_point_5_2: data.description_point_5_2,
          description_point_5_3: data.description_point_5_3,
        };

        PrivateAxios.put(
          `/updateProduct/${data.product_id}`,
          ProductInfoToUpdate,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            if (response.data.modifiedCount > 0) {
              Swal.fire({
                title: "Success!",
                text: "Product Updated Successfully",
                icon: "success",
                confirmButtonText: "Cool",
              });
              refetch();
              closeModal();
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } else {
      const ProductInfoToUpdate = {
        product_name: data.product_name,
        category_name: data.category_name,
        price: data.price,
        product_image: defaultImageUrl,
        weight: data.weight,
        description: data.description,
        description_title: data.description_title,
        description_title_1: data.description_title_1,
        description_point_1_1: data.description_point_1_1,
        description_point_1_2: data.description_point_1_2,
        description_point_1_3: data.description_point_1_3,
        description_title_2: data.description_title_2,
        description_point_2_1: data.description_point_2_1,
        description_point_2_2: data.description_point_2_2,
        description_point_2_3: data.description_point_2_3,
        description_title_3: data.description_title_3,
        description_point_3_1: data.description_point_3_1,
        description_point_3_2: data.description_point_3_2,
        description_point_3_3: data.description_point_3_3,
        description_title_4: data.description_title_4,
        description_point_4_1: data.description_point_4_1,
        description_point_4_2: data.description_point_4_2,
        description_point_4_3: data.description_point_4_3,
        description_title_5: data.description_title_5,
        description_point_5_1: data.description_point_5_1,
        description_point_5_2: data.description_point_5_2,
        description_point_5_3: data.description_point_5_3,
      };
      PrivateAxios.put(
        `/updateProduct/${data.product_id}`,
        ProductInfoToUpdate,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: "Product Updated Successfully",
              icon: "success",
              confirmButtonText: "Cool",
            });
            closeModal();
            refetch();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffaf0] py-8">
      <div className="w-full max-w-4xl bg-white/30 backdrop-blur-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">All Products</h2>
        {loading ? (
          <div className="w-full flex justify-center">
            <span className="loading loading-spinner loading-xl"></span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-xs w-full text-center">
              <thead>
                <tr className="text-xl bg-white/40 backdrop-blur-md">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-b border-gray-200"
                  >
                    <td className="p-2">
                      <img
                        className="w-20 h-20 object-cover"
                        src={product.product_image}
                        alt={product.product_name}
                      />
                    </td>
                    <td className="p-2">{product.product_name}</td>
                    <td className="p-2">{product.category_name}</td>
                    <td className="p-2">{product.price}</td>
                    <td className="p-2">
                      <button
                        onClick={() => openModal(product)}
                        className="btn btn-ghost btn-xs mr-2"
                      >
                        <Pencil />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-ghost btn-xs"
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-start justify-center z-50">
          <div className="modal-box">
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" {...register("product_id")} />
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  {...register("product_name")}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  {...register("category_name")}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Price</label>
                <input
                  type="number"
                  {...register("price")}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Weight</label>
                <input
                  type="text"
                  {...register("weight")}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Product Image
                </label>
                <input
                  type="file"
                  {...register("productimage")}
                  className="file-input file-input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="textarea textarea-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Description Title
                </label>
                <input
                  type="text"
                  {...register("description_title")}
                  className="input input-bordered w-full"
                />
              </div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="mb-4">
                  <label className="block text-sm font-bold mb-2">
                    Description Title {i}
                  </label>
                  <input
                    type="text"
                    {...register(`description_title_${i}`)}
                    className="input input-bordered w-full"
                  />
                  {[1, 2, 3].map((j) => (
                    <div key={j}>
                      <label className="block text-sm font-bold mb-2">
                        Description Point {i}-{j}
                      </label>
                      <input
                        type="text"
                        {...register(`description_point_${i}_${j}`)}
                        className="input input-bordered w-full"
                      />
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex justify-end">
                <button type="submit" className="btn bg-black btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
