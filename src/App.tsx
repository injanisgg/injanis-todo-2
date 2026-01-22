import React, { useState } from "react";
import TodosPage from "./pages/TodosPage";
import PostsPage from "./pages/PostsPage";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<"todos" | "posts">("todos");

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            padding: "14px 16px",
          },
        }} 
      />
      <nav className="bg-white shadow-md mb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-4 py-4">
            <button
             onClick={() => setCurrentPage("todos")}
             className={`px-6 py-2 rounded-lg font-semibold transition-colors 
             ${currentPage === "todos" 
                ? "bg-blue-500 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              Todos
            </button>
            <button
             onClick={() => setCurrentPage("posts")}
             className={`px-6 py-2 rounded-lg font-semibold transition-colors 
             ${currentPage === "posts" 
                ? "bg-blue-500 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              Posts
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        {currentPage === "todos" ? <TodosPage /> : <PostsPage />} 
      </div>
    </div>
  )
}

export default App;