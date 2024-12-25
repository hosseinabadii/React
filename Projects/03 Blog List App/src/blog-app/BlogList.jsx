import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";

const BlogList = () => {
  const blog = useSelector((state) => state.blog);
  const { blogList, deleteModalVisible } = blog;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "blog/setBlogListOnInitialLoad",
      payload: { blogList: JSON.parse(localStorage.getItem("blogList")) || [] },
    });
  }, []);

  const handleOnEditBlog = (currentBlogToEdit) => {
    dispatch({
      type: "blog/setBlogIdToEdit",
      payload: { blogId: currentBlogToEdit?.id },
    });

    dispatch({
      type: "blog/handleInputChange",
      payload: {
        title: currentBlogToEdit?.title,
        description: currentBlogToEdit?.description,
      },
    });
  };

  const handleOnDeleteBlog = (blogId) => {
    dispatch({
      type: "blog/handleOnDeleteBlog",
      payload: { deleteModalVisible: true, blogIdToDelete: blogId },
    });
  };

  const handleConfirmDelete = () => {
    dispatch({
      type: "blog/handleConfirmDelete",
    });
  };

  const handleCancelDelete = () => {
    dispatch({
      type: "blog/handleCancelDelete",
    });
  };

  return (
    <div className="flex flex-col space-y-4 text-lg items-center px-4 md:max-w-2xl md:px-0 mx-auto">
      {blogList?.length > 0 ? (
        blogList.map((singleBlog) => (
          <div
            className="border border-gray-200 shadow-lg p-4 rounded-sm w-full"
            key={singleBlog?.id}
          >
            <h3 className="font-bold mb-6 border-b pb-2">
              {singleBlog?.title}
            </h3>
            <p>{singleBlog?.description}</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleOnEditBlog(singleBlog)}
                className="text-blue-600 bg-white p-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleOnDeleteBlog(singleBlog?.id)}
                className="text-red-600 bg-white p-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <h2 className="text-red-500">No blog added! Please add one</h2>
      )}

      {deleteModalVisible && (
        <Modal
          handleConfirm={handleConfirmDelete}
          handleCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default BlogList;
