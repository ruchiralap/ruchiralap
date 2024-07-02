import React, { useState } from "react";
import useCategory from "../../Hooks/useCategory";
import { useForm } from "react-hook-form";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import PrivateAxios from "../../Hooks/PrivateAxios";
import Swal from "sweetalert2";

const AllCategories = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [allCategory, refetch, loading] = useCategory();
  const image_hosting_key = "7b7cc2939f38dd7f29e0801393262933";
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (category) => {
    setSelectedCategory(category);
    setValue("category_name", category.category_name);
    setValue("image_url", category.category_image);
    setValue("category_id", category._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(false);
    reset();
  };
  ///handle edit
  const onSubmit = async (data) => {
    const category_name = data.category_name;
    if (data.category_image[0]) {
      const imageFile = { image: data.category_image[0] };
      const res = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        const categoryInfoToUpdate = {
          category_name: data.category_name,
          category_image: res.data.data.display_url,
        };

        PrivateAxios.put(
          `/updateCategory/${data.category_id}`,
          categoryInfoToUpdate,
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
                text: "Category Updated Successfully",
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
      const categoryInfoToUpdate = {
        category_name: data.category_name,
        category_image: data.image_url,
      };
      PrivateAxios.put(
        `/updateCategory/${data.category_id}`,
        categoryInfoToUpdate,
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
              text: "Category Updated Successfully",
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
  ///handle delete
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
        fetch(`https://ruchir-alap-backend.vercel.app/deleteCategory/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Category has been deleted.", "success");
              // const remaining = jobs.filter(job => job._id !== id);
              // setJobs(remaining);

              refetch();
            }
          });
      }
    });
  };
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffaf0] py-8">
        <div className="w-full max-w-4xl bg-white/30 backdrop-blur-lg p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">
            All Categories
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-xs w-full text-center">
              <thead>
                <tr className="text-xl bg-white/40 backdrop-blur-md">
                  <th>Category Image</th>
                  <th>Category Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allCategory.map((category) => (
                  <tr
                    key={category._id}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-b border-gray-200"
                  >
                    <td className="p-2">
                      <div className="flex justify-center items-center">
                        <img
                          className="w-16 h-16 object-cover rounded"
                          src={category.category_image}
                          alt={category.category_name}
                        />
                      </div>
                    </td>
                    <td className="p-2 align-middle">
                      {category.category_name}
                    </td>
                    <td className="flex justify-center items-center space-x-4 p-2 align-middle">
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="mt-4"
                      >
                        <Trash2 color="#ff0000" />
                      </button>
                      <button
                        onClick={() => openModal(category)}
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
                  <th>Category Image</th>
                  <th>Category Name</th>
                  <th>Action</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#fffaf0] rounded-lg shadow-lg p-8 relative">
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <div className="lg:max-w-6xl mx-auto rounded-xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black">
                        Category Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Category Name"
                      defaultValue={selectedCategory.category_name}
                      {...register("category_name", { required: true })}
                      required
                      className="input input-bordered w-full"
                    />
                    <input
                      type="text"
                      placeholder="image url"
                      defaultValue={selectedCategory.category_image}
                      {...register("image_url", { required: true })}
                      required
                      className="input hidden input-bordered w-full"
                    />
                    <input
                      type="text"
                      placeholder="Category id"
                      value={selectedCategory._id}
                      {...register("category_id", { required: true })}
                      required
                      className="input hidden input-bordered w-full"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black">Image</span>
                    </label>
                    <input
                      {...register("category_image")}
                      type="file"
                      className="file-input w-full max-w-xs"
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  value="Update Category"
                  className="btn btn-block mt-5 text-white border-none bg-black"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCategories;
