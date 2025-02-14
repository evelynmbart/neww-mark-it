import { useEffect, useState } from "react";
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
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });
  const [bookmark, setBookmark] = useState<Bookmark>({
    title: "",
    description: "",
    url: "",
  });

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookmark((prevBookmark) => ({ ...prevBookmark, [name]: value }));
  };

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
    setBookmark({ title: "", description: "", url: "" });
  };

  const handleDelete = (indexId: number): void => {
    setBookmarks(bookmarks.filter((_, index) => index !== indexId));
  };

  console.log("bookmarks array", bookmarks, "one bookmark object", bookmark);

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
              autoComplete="off"
            />
            <label>Description (optional):</label>
            <input
              type="text"
              placeholder="Enter bookmark description"
              onChange={handleChange}
              name="description"
              value={bookmark.description}
              autoComplete="off"
            />

            <label>URL:</label>
            <input
              type="url"
              placeholder="Enter bookmark URL"
              onChange={handleChange}
              name="url"
              value={bookmark.url}
              autoComplete="off"
            />
          </div>
          <button type="submit">Add Bookmark</button>
        </form>
      </section>
      <section className="bookmark-list">
        {bookmarks.map((bookmark, index) => (
          <div key={bookmark.title} className="bookmark-card">
            <h3>{bookmark.title}</h3>
            <p>{bookmark.description}</p>
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
              {bookmark.url}
            </a>
            <button onClick={() => handleDelete(index)}>Delete</button>
            <button>Edit</button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
