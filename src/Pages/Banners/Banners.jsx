import React, { useState } from "react";
import useBanners from "../../Hooks/useBanners";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

const Banners = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [allBanners, refetch, loading] = useBanners();
  const image_hosting_key = "7b7cc2939f38dd7f29e0801393262933";
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (banner, bannerField) => {
    setSelectedBanner({ ...banner, bannerField });
    setValue("banner_image", banner[bannerField]);
    setValue("banner_id", banner._id);
    setValue(
      "banner_name",
      bannerField.replace("_image", "").replace("_", " ").toUpperCase()
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBanner(null);
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    if (data.banner_image[0]) {
      const imageFile = new FormData();
      imageFile.append("image", data.banner_image[0]);
      const res = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        const bannerInfoToUpdate = {
          [selectedBanner.bannerField]: res.data.data.display_url,
        };

        axios
          .put(`/updateBanner/${data.banner_id}`, bannerInfoToUpdate, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.data.modifiedCount > 0) {
              Swal.fire({
                title: "Success!",
                text: "Banner Updated Successfully",
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
      const bannerInfoToUpdate = {
        [selectedBanner.bannerField]: data.image_url,
      };
      axios
        .put(
          `https://ruchir-alap-backend.vercel.app/updateBanner/${data.banner_id}`,
          bannerInfoToUpdate,
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
              text: "Banner Updated Successfully",
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
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffaf0] py-8">
        <div className="w-full max-w-4xl bg-white/30 backdrop-blur-lg p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">All Banners</h2>
          <div className="overflow-x-auto">
            <table className="table table-xs w-full text-center">
              <thead>
                <tr className="text-xl bg-white/40 backdrop-blur-md">
                  <th>Banner Name</th>
                  <th>Banner Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allBanners.map((banner) =>
                  Object.keys(banner)
                    .filter((key) => key.includes("banner_"))
                    .map((key) => (
                      <tr
                        key={`${banner._id}-${key}`}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-b border-gray-200"
                      >
                        <td className="p-2 align-middle">
                          {key
                            .replace("_image", "")
                            .replace("_", " ")
                            .toUpperCase()}
                        </td>
                        <td className="p-2 align-middle">
                          <div className="flex justify-center items-center">
                            <img
                              className="w-16 h-16 object-cover rounded"
                              src={banner[key]}
                              alt={key}
                            />
                          </div>
                        </td>
                        <td className="flex justify-center items-center space-x-4 p-2 align-middle">
                          <button
                            onClick={() => openModal(banner, key)}
                            className="mt-4 ms-4"
                          >
                            <Pencil color="#dfa70c" />
                          </button>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
              <tfoot>
                <tr className="text-xl bg-white/40 backdrop-blur-md">
                  <th>Banner Name</th>
                  <th>Banner Image</th>
                  <th>Action</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && selectedBanner && (
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
                      <span className="label-text text-black">Banner Name</span>
                    </label>
                    <input
                      type="text"
                      value={selectedBanner.bannerField
                        .replace("_image", "")
                        .replace("_", " ")
                        .toUpperCase()}
                      className="input input-bordered w-full"
                      disabled
                    />
                    <input
                      type="text"
                      placeholder="image url"
                      defaultValue={selectedBanner[selectedBanner.bannerField]}
                      {...register("image_url", { required: true })}
                      required
                      className="input hidden input-bordered w-full"
                    />
                    <input
                      type="text"
                      placeholder="Banner id"
                      value={selectedBanner._id}
                      {...register("banner_id", { required: true })}
                      required
                      className="input hidden input-bordered w-full"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black">New Image</span>
                    </label>
                    <input
                      {...register("banner_image")}
                      type="file"
                      className="file-input w-full max-w-xs"
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  value="Update Banner"
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

export default Banners;
