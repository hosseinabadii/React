import { create } from "zustand";
import { nanoid } from "nanoid";

const updateLocalStorage = (blogList) => {
  localStorage.setItem("blogList", JSON.stringify(blogList));
};

const useBlogStore = create((set) => ({
  formData: { title: "", description: "" },
  blogList: [],
  blogIdToEdit: null,
  deleteModalVisible: false,
  blogIdToDelete: null,

  handleInputChange: (payload) =>
    set((state) => ({ formData: { ...state.formData, ...payload } })),

  handleAddBlog: () =>
    set((state) => {
      const newBlog = { id: nanoid(), ...state.formData };
      const updatedBlogList = [...state.blogList, newBlog];
      updateLocalStorage(updatedBlogList);
      return {
        blogList: updatedBlogList,
        formData: { title: "", description: "" },
      };
    }),

  setBlogListOnInitialLoad: ({ blogList }) => set({ blogList }),

  setBlogIdToEdit: (blogId) => set({ blogIdToEdit: blogId }),

  handleEditBlog: () =>
    set((state) => {
      const updatedBlogList = state.blogList.map((singleBlog) =>
        singleBlog?.id === state.blogIdToEdit
          ? { id: state.blogIdToEdit, ...state.formData }
          : singleBlog
      );
      updateLocalStorage(updatedBlogList);
      return {
        blogList: updatedBlogList,
        formData: { title: "", description: "" },
        blogIdToEdit: null,
      };
    }),

  handleOnDeleteBlog: (blogId) =>
    set({
      deleteModalVisible: true,
      blogIdToDelete: blogId,
    }),

  handleConfirmDelete: () =>
    set((state) => {
      const updatedBlogList = state.blogList.filter(
        (blog) => blog.id !== state.blogIdToDelete
      );
      updateLocalStorage(updatedBlogList);
      return {
        blogList: updatedBlogList,
        deleteModalVisible: false,
        blogIdToDelete: null,
      };
    }),

  handleCancelDelete: () =>
    set({
      deleteModalVisible: false,
      blogIdToDelete: null,
    }),
}));

export default useBlogStore;
