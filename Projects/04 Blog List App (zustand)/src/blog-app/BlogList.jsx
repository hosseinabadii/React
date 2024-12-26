import { useEffect } from "react";
import Modal from "../components/Modal";
import useBlogStore from "../store/useBlogStore";

const BlogList = () => {
  const {
    blogList,
    deleteModalVisible,
    setBlogListOnInitialLoad,
    handleInputChange,
    setBlogIdToEdit,
    handleOnDeleteBlog,
    handleConfirmDelete,
    handleCancelDelete,
  } = useBlogStore();

  useEffect(() => {
    setBlogListOnInitialLoad({
      blogList: JSON.parse(localStorage.getItem("blogList")) || [],
    });
  }, []);

  const handleOnEditBlog = (currentBlogToEdit) => {
    setBlogIdToEdit(currentBlogToEdit?.id);
    handleInputChange({
      title: currentBlogToEdit?.title,
      description: currentBlogToEdit?.description,
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
