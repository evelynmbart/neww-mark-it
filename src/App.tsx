import { useState } from "react";
import "./App.css";

/*
  TODO:
  - Add a search bar to search for bookmarks
  - Add a main content area to display bookmarks
  - Add a footer for the app

  - so the app is basically a todo list and each todo input will have a title, optional description, link url, and thats it?
  - then on each todoCard each card will show the title, a link to the url, a delete button, edit button.
  - the page will just list them out on the page from newest to oldest or vice versa.
  - actually i think it'd be cool in the end if you could rearrange them however you wanted!
*/

type Bookmark = {
  title: string;
  description: string;
  url: string;
};

function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [bookmark, setBookmark] = useState<Bookmark>({
    title: "",
    description: "",
    url: "",
  });

  const handleAddBookmark = (bookmark: Bookmark) => {
    setBookmarks([...bookmarks, bookmark]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const bookmark: Bookmark = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      url: formData.get("url") as string,
    };
    handleAddBookmark(bookmark);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookmark((prevBookmark) => ({ ...prevBookmark, [name]: value }));
  };

  return (
    <main className="main-container">
      {/* make this into an animation that fades into Welcome to MarkIt on loading from left to right. */}
      <h1>MarkIt</h1>
      <section className="create-bookmark">
        <form onSubmit={handleSubmit}>
          <h3>Create a New Bookmark</h3>
          <div className="bookmark-input-container">
            <label>Title:</label>
            <input
              type="text"
              placeholder="Enter bookmark title"
              onChange={handleChange}
              name="title"
              value={bookmark.title}
            />
            <label>Description (optional):</label>
            <input
              type="text"
              placeholder="Enter bookmark description"
              onChange={handleChange}
              name="description"
              value={bookmark.description}
            />
            <label>URL:</label>
            <input
              type="url"
              placeholder="Enter bookmark URL"
              onChange={handleChange}
              name="url"
              value={bookmark.url}
            />
          </div>
          <button type="submit">Add Bookmark</button>
        </form>
      </section>
    </main>
  );
}

export default App;
