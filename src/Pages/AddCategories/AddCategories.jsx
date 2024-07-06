import React from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import PrivateAxios from "../../Hooks/PrivateAxios";
import axios, { Axios } from "axios";
const AddCategories = () => {
  const { register, handleSubmit, reset } = useForm();
  const image_hosting_key = "7b7cc2939f38dd7f29e0801393262933";
  console.log("image key", image_hosting_key);
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const onSubmit = async (data) => {
    const imageFile = { image: data.category_image[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image url

      console.log("imageurl from imagebb", res.data.data.display_url);

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
          console.log(response.data);
          if (response.data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "Category Added Successfully",
              icon: "success",
              confirmButtonText: "Cool",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors if any
        });
    }
  };
  return (
    <div>
      {" "}
      <div>
        <div>
          <h1 className="text-center font-bold my-4">Add A Category</h1>
          <div className="min-h-screen px-5">
            <div className="lg:max-w-6xl   mx-auto  rounded-xl shadow-xl">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body border "
              >
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
                      {...register("category_name", { required: true })}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-black">Image</span>
                    </label>

                    <input
                      {...register("category_image", { required: true })}
                      type="file"
                      className="file-input w-full max-w-xs"
                    />
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
    </div>
  );
};

export default AddCategories;
