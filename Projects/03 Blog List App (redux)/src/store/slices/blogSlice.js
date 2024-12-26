import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  formData: { title: "", description: "" },
  blogList: [],
  blogIdToEdit: null,
  deleteModalVisible: false,
  blogIdToDelete: null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    handleInputChange: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },

    handleAddBlog: (state, action) => {
      state.blogList = [...state.blogList, { id: nanoid(), ...state.formData }];
      state.formData = {
        title: "",
        description: "",
      };
      localStorage.setItem("blogList", JSON.stringify(state.blogList));
    },

    setBlogListOnInitialLoad: (state, action) => {
      state.blogList = action.payload.blogList;
    },

    setBlogIdToEdit: (state, action) => {
      const { blogId } = action.payload;
      state.blogIdToEdit = blogId;
    },

    handleEditBlog: (state, action) => {
      let copyBlogList = [...state.blogList];
      const indexOfEditedBlog = copyBlogList.findIndex(
        (singleBlog) => singleBlog?.id === state.blogIdToEdit
      );
      copyBlogList[indexOfEditedBlog] = {
        id: state.blogIdToEdit,
        ...state.formData,
      };
      state.blogList = copyBlogList;
      localStorage.setItem("blogList", JSON.stringify(copyBlogList));
      state.formData = {
        title: "",
        description: "",
      };
      state.blogIdToEdit = null;
    },

    handleOnDeleteBlog: (state, action) => {
      const { deleteModalVisible, blogIdToDelete } = action.payload;
      state.deleteModalVisible = deleteModalVisible;
      state.blogIdToDelete = blogIdToDelete;
    },

    handleConfirmDelete: (state) => {
      state.blogList = state.blogList.filter(
        (blog) => blog.id !== state.blogIdToDelete
      );
      localStorage.setItem("blogList", JSON.stringify(state.blogList));
      state.deleteModalVisible = false;
      state.blogIdToDelete = null;
    },

    handleCancelDelete: (state) => {
      state.deleteModalVisible = false;
      state.blogIdToDelete = null;
    },
  },
});

export const {
  handleInputChange,
  handleAddBlog,
  setBlogListOnInitialLoad,
  setBlogIdToEdit,
  handleEditBlog,
  handleOnDeleteBlog,
  handleConfirmDelete,
  handleCancelDelete,
} = blogSlice.actions;
export default blogSlice.reducer;
