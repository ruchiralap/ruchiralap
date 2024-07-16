import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import PrivateAxios from "../../Hooks/PrivateAxios";
import axios from "axios";

const AddCategories = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const image_hosting_key = "7b7cc2939f38dd7f29e0801393262933";
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    const imageFile = { image: data.category_image[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const categoryinfo = {
        category_name: data.category_name,
        category_image: res.data.data.display_url,
      };

      PrivateAxios.post("addCategory", categoryinfo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "Category Added Successfully",
              icon: "success",
              confirmButtonText: "Cool",
            });
            reset();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center font-bold my-4">Add A Category</h1>
        <div className="min-h-screen px-5">
          <div className="lg:max-w-6xl mx-auto rounded-xl shadow-xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body border"
            >
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">
                      Category Name <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Category Name"
                    {...register("category_name", {
                      required: "Category Name is required",
                    })}
                    className="input input-bordered w-full"
                  />
                  {errors.category_name && (
                    <span className="text-red-500">
                      {errors.category_name.message}
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">
                      Image <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    {...register("category_image", {
                      required: "Category Image is required",
                    })}
                    type="file"
                    className="file-input w-full max-w-xs"
                  />
                  {errors.category_image && (
                    <span className="text-red-500">
                      {errors.category_image.message}
                    </span>
                  )}
                </div>
              </div>
              <input
                type="submit"
                value="Add Category"
                className="btn btn-block text-white border-none bg-black"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategories;
