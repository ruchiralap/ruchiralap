import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import PrivateAxios from "../../Hooks/PrivateAxios";
import useCategory from "../../Hooks/useCategory";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [allCategory, refetch, loading] = useCategory();

  const image_hosting_key = "7b7cc2939f38dd7f29e0801393262933";
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    const imageFile = { image: data.productimage[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const productInfo = {
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

      PrivateAxios.post("addProduct", productInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "Product Added Successfully",
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
        <h1 className="text-center font-bold my-4">Add A Product</h1>
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
                      Product Name <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Product Name"
                    {...register("product_name", {
                      required: "Product Name is required",
                    })}
                    className="input input-bordered w-full"
                  />
                  {errors.product_name && (
                    <span className="text-red-500">
                      {errors.product_name.message}
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">
                      Category Name <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    id="category"
                    {...register("category_name", {
                      required: "Category is required",
                    })}
                    className="input input-bordered w-full"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {loading ? (
                      <option>Loading categories...</option>
                    ) : (
                      allCategory.map((category) => (
                        <option
                          key={category._id}
                          value={category.category_name}
                        >
                          {category.category_name}
                        </option>
                      ))
                    )}
                  </select>
                  {errors.category_name && (
                    <span className="text-red-500">
                      {errors.category_name.message}
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">
                      Price <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="number"
                    placeholder="Price"
                    {...register("price", { required: "Price is required" })}
                    className="input input-bordered w-full"
                  />
                  {errors.price && (
                    <span className="text-red-500">{errors.price.message}</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">
                      Product Image <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    {...register("productimage", {
                      required: "Product Image is required",
                    })}
                    type="file"
                    className="file-input w-full max-w-xs"
                  />
                  {errors.productimage && (
                    <span className="text-red-500">
                      {errors.productimage.message}
                    </span>
                  )}
                </div>
                <div className="form-control lg:col-span-2">
                  <label className="label">
                    <span className="label-text text-black">
                      Weight <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    {...register("weight", { required: "Weight is required" })}
                    className="textarea textarea-bordered h-10"
                    cols="30"
                    rows="10"
                    placeholder="Weight"
                  ></input>
                  {errors.weight && (
                    <span className="text-red-500">
                      {errors.weight.message}
                    </span>
                  )}
                </div>
                <div className="form-control lg:col-span-2">
                  <label className="label">
                    <span className="label-text text-black">
                      Description <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="textarea textarea-bordered h-10 w-full"
                    cols="30"
                    rows="10"
                    placeholder="Description"
                  ></textarea>
                  {errors.description && (
                    <span className="text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </div>
                <div className="form-control lg:col-span-2">
                  <label className="label">
                    <span className="label-text text-black">
                      Description Title <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Description Title"
                    {...register("description_title", {
                      required: "Description Title is required",
                    })}
                    className="input input-bordered w-full"
                  />
                  {errors.description_title && (
                    <span className="text-red-500">
                      {errors.description_title.message}
                    </span>
                  )}
                </div>

                <div className="w-full lg:col-span-2 grid lg:grid-cols-2 gap-2">
                  <div className="form-control lg:col-span-2">
                    <label className="label">
                      <span className="label-text text-black">
                        Description Title 1{" "}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Description Title 1"
                      {...register("description_title_1", {
                        required: "This field is required",
                      })}
                      className="input input-bordered w-full"
                    />
                    {errors.description_title_1 && (
                      <span className="text-red-500">
                        {errors.description_title_1.message}
                      </span>
                    )}
                  </div>
                  {[1, 2, 3].map((point) => (
                    <div key={point} className="form-control col-span-1">
                      <label className="label">
                        <span className="label-text text-black">
                          Description Point 1.{point}{" "}
                          <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder={`Description Point 1.${point}`}
                        {...register(`description_point_1_${point}`, {
                          required: "This field is required",
                        })}
                        className="input input-bordered w-full"
                      />
                      {errors[`description_point_1_${point}`] && (
                        <span className="text-red-500">
                          {errors[`description_point_1_${point}`].message}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {["2", "3", "4", "5"].map((num) => (
                  <div
                    key={num}
                    className="w-full lg:col-span-2 grid lg:grid-cols-2 gap-2"
                  >
                    <div className="form-control lg:col-span-2">
                      <label className="label">
                        <span className="label-text text-black">{`Description Title ${num}`}</span>
                      </label>
                      <input
                        type="text"
                        placeholder={`Description Title ${num}`}
                        {...register(`description_title_${num}`, {
                          required: false,
                        })}
                        className="input input-bordered w-full"
                      />
                      {errors[`description_title_${num}`] && (
                        <span className="text-red-500">
                          {errors[`description_title_${num}`].message}
                        </span>
                      )}
                    </div>
                    {[1, 2, 3].map((point) => (
                      <div key={point} className="form-control col-span-1">
                        <label className="label">
                          <span className="label-text text-black">{`Description Point ${num}.${point}`}</span>
                        </label>
                        <input
                          type="text"
                          placeholder={`Description Point ${num}.${point}`}
                          {...register(`description_point_${num}_${point}`, {
                            required: false,
                          })}
                          className="input input-bordered w-full"
                        />
                        {errors[`description_point_${num}_${point}`] && (
                          <span className="text-red-500">
                            {
                              errors[`description_point_${num}_${point}`]
                                .message
                            }
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <input
                type="submit"
                value="Add Product"
                className="btn btn-block text-white border-none bg-black"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
