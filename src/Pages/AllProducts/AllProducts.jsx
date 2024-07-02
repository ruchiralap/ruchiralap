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

    console.log("from open function", product);
    setValue("product_name", product.product_name);
    setValue("category_name", product.category_name);
    setValue("price", product.price);
    setValue("product_id", product._id);
    // setValue("image url", product.product_image);
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
            console.log(data);
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

  ///handle edit
  const onSubmit = async (data) => {
    // const category_name = data.category_name;

    console.log("data", data);
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
            console.log(response.data);
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
          console.log(response.data);
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
                        className="w-16 h-16 object-cover rounded"
                        src={product.product_image}
                        alt={product.product_name}
                      />
                    </td>
                    <td className="p-2 align-middle">{product.product_name}</td>
                    <td className="p-2 align-middle">
                      {product.category_name}
                    </td>
                    <td className="p-2 align-middle">{product.price}</td>
                    <td className="flex justify-center items-center space-x-4 p-2 align-middle">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="mt-4 "
                      >
                        <Trash2 color="#ff0000" />
                      </button>
                      <button
                        onClick={() => openModal(product)}
                        className="mt-4 ms-4"
                      >
                        <Pencil color="#dfa70c" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="text-xl bg-white/40 backdrop-blur-md">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#fffaf0] rounded-lg shadow-lg p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <div className="lg:max-w-6xl mx-auto rounded-xl">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body border space-y-4"
              >
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black">
                        Product Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Product Name"
                      {...register("product_name", { required: true })}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black">
                        Category Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Category Name"
                      {...register("category_name", { required: true })}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black">Price</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Price"
                      {...register("price", { required: true })}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black">
                        Product Image
                      </span>
                    </label>
                    <input
                      {...register("productimage")}
                      type="file"
                      className="file-input w-full max-w-xs"
                    />

                    <input
                      type="text"
                      placeholder="Category id"
                      {...register("product_id", { required: true })}
                      required
                      className="input hidden input-bordered w-full"
                    />
                  </div>
                  <div className="form-control col-span-2">
                    <label className="label">
                      <span className="label-text text-black">Description</span>
                    </label>
                    <textarea
                      {...register("description", { required: true })}
                      className="textarea textarea-bordered h-24"
                      placeholder="Description"
                    ></textarea>
                  </div>
                  <div className="form-control col-span-2">
                    <label className="label">
                      <span className="label-text text-black">
                        Description Title
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Description Title"
                      {...register("description_title", { required: true })}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>

                  {["1", "2", "3", "4", "5"].map((num) => (
                    <div key={num} className="col-span-2 space-y-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black">{`Description Title ${num}`}</span>
                        </label>
                        <input
                          type="text"
                          placeholder={`Description Title ${num}`}
                          {...register(`description_title_${num}`, {
                            required: num !== "5",
                          })}
                          className="input input-bordered w-full"
                        />
                      </div>
                      <div className="grid lg:grid-cols-3 gap-4">
                        {[1, 2, 3].map((point) => (
                          <div key={point} className="form-control">
                            <label className="label">
                              <span className="label-text text-black">{`Description Point ${num}.${point}`}</span>
                            </label>
                            <input
                              type="text"
                              placeholder={`Description Point ${num}.${point}`}
                              {...register(
                                `description_point_${num}_${point}`,
                                {
                                  required: num !== "5",
                                }
                              )}
                              className="input input-bordered w-full"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <input
                  type="submit"
                  value="Save Changes"
                  className="btn btn-block text-white border-none bg-black"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
