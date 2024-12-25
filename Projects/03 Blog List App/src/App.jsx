import BlogList from "./blog-app/BlogList";
import AddNewBlog from "./blog-app/AddNewBlog";

function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-gray-900">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto p-4 text-white">
          <h1 className="text-xl">Blog List App</h1>
        </div>
      </header>
      <main className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto py-4 flex flex-col-reverse sm:flex-row gap-4">
        <div className="sm:w-2/3">
          <BlogList />
        </div>
        <div className="sm:w-1/3">
          <AddNewBlog />
        </div>
      </main>
    </div>
  );
}

export default App;

<div className="min-h-screen"></div>;
