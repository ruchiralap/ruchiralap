import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import PrivateAxios from "../../Hooks/PrivateAxios";
import axios from "axios";
const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();

  const image_hosting_key = "7b7cc2939f38dd7f29e0801393262933";
  console.log("image key", image_hosting_key);
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.productimage[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image url

      console.log("imageurl from imagebb", res.data.data.display_url);

      const productInfo = {
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

      PrivateAxios.post("addProduct", productInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "Product Added Successfully",
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
      <div>
        <h1 className="text-center font-bold my-4">Add A Product</h1>
        <div className="min-h-screen px-5">
          <div className="lg:max-w-6xl   mx-auto  rounded-xl shadow-xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body border"
            >
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Product Name</span>
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
                    <span className="label-text text-black">Category Name</span>
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
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text text-black">Product Image</span>
                  </label>

                  <input
                    {...register("productimage", { required: true })}
                    type="file"
                    className="file-input w-full max-w-xs"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Description</span>
                  </label>
                  <textarea
                    {...register("description", { required: true })}
                    className="textarea textarea-bordered h-10"
                    cols="30"
                    rows="10"
                    placeholder="Description"
                  ></textarea>
                </div>
                <div className="form-control">
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
                  <div
                    key={num}
                    className="w-full lg:col-span-2 grid lg:grid-cols-2 gap-2"
                  >
                    <div className="form-control col-span-1">
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
                    {[1, 2, 3].map((point) => (
                      <div key={point} className="form-control col-span-1">
                        <label className="label">
                          <span className="label-text text-black">{`Description Point ${num}.${point}`}</span>
                        </label>
                        <input
                          type="text"
                          placeholder={`Description Point ${num}.${point}`}
                          {...register(`description_point_${num}_${point}`, {
                            required: num !== "5",
                          })}
                          className="input input-bordered w-full"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <input
                type="submit"
                value="Add Product"
                className="btn btn-block text-white border-none bg-red-500"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
