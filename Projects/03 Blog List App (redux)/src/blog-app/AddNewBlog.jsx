import React from "react";
import { useSelector, useDispatch } from "react-redux";

const AddNewBlog = () => {
  const blog = useSelector((state) => state.blog);
  const { blogIdToEdit, formData } = blog;
  const dispatch = useDispatch();

  const onChangeInput = (event) => {
    dispatch({
      type: "blog/handleInputChange",
      payload: { [event.target.name]: event.target.value },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    blogIdToEdit
      ? dispatch({ type: "blog/handleEditBlog" })
      : dispatch({ type: "blog/handleAddBlog" });
  };

  return (
    <div className="flex flex-col items-center text-lg mb-8 bg-gray-50 shadow-lg px-2 py-8 mx-4 sm:mx-0">
      <h2 className="text-xl font-bold mb-4">
        {blogIdToEdit ? "Edit Blog" : "Add New Blog"}
      </h2>
      <form onSubmit={handleSubmit} className="w-10/12">
        <div className="flex flex-col mb-4 text-sm md:text-lg space-y-2">
          <label htmlFor="title">Enter Blog Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="Enter Blog Title"
            value={formData?.title}
            onChange={onChangeInput}
            className="border border-gray-700 px-2 py-1 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-4 text-sm md:text-lg space-y-2">
          <label htmlFor="description">Enter Blog Description</label>
          <input
            type="text"
            name="description"
            id="description"
            required
            placeholder="Enter Blog Description"
            value={formData?.description}
            onChange={onChangeInput}
            className="border border-gray-700 px-2 py-1 rounded-md"
          />
        </div>
        <button
          className="w-full border border-gray-400 bg-gray-100 bg-gr font-bold py-2 my-2"
          type="submit"
        >
          {blogIdToEdit ? "Save Changes" : "Add Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddNewBlog;
