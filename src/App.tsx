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

const colors = [
  "#FAD1D1",
  "#F5B0CB",
  "#F6C6A6",
  "#F8D0A1",
  "#F7E2A1",
  "#D4E2B8",
  "#A8D8A1",
  "#A1E5D4",
  "#A1D4E5",
  "#A1C6E5",
  "#D0A1E5",
  "#E5A1D8",
  "#F0A1C0",
  "#F1B3B3",
  "#E0B8B8",
  "#C8E0E5",
  "#B8C9E5",
  "#B1D1E0",
  "#B8E5D1",
  "#C7E5D1",
];

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
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

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

  const randomColor = (): string => {
    return colors[Math.floor(Math.random() * colors.length)];
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
        {!isEditMode ? (
          <>
            {bookmarks.map((bookmark, index) => (
              <div
                key={bookmark.title}
                className="bookmark-card"
                style={{ backgroundColor: randomColor() }}
              >
                <h3>{bookmark.title}</h3>
                <p>{bookmark.description}</p>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {bookmark.url}
                </a>
                <button onClick={() => handleDelete(index)}>Delete</button>
                <button onClick={() => setIsEditMode(!isEditMode)}>Edit</button>
              </div>
            ))}
          </>
        ) : (
          <>
            {bookmarks.map((bookmark, index) => (
              <div
                key={bookmark.title}
                className="bookmark-card"
                style={{ backgroundColor: randomColor() }}
              >
                <input
                  type="text"
                  value={bookmark.title}
                  onChange={(e) => {
                    e.target.focus();
                    const newBookmarks = [...bookmarks];
                    newBookmarks[index].title = e.target.value;
                    setBookmarks(newBookmarks);
                  }}
                />
                <input
                  type="text"
                  value={bookmark.description}
                  onChange={(e) => {
                    e.target.focus();
                    const newBookmarks = [...bookmarks];
                    newBookmarks[index].description = e.target.value;
                    setBookmarks(newBookmarks);
                  }}
                />
                <input
                  type="url"
                  value={bookmark.url}
                  onChange={(e) => {
                    e.target.focus();
                    const newBookmarks = [...bookmarks];
                    newBookmarks[index].url = e.target.value;
                    setBookmarks(newBookmarks);
                  }}
                />
                <button onClick={() => handleDelete(index)}>Delete</button>
                <button onClick={() => setIsEditMode(!isEditMode)}>Save</button>
              </div>
            ))}
          </>
        )}
      </section>
    </main>
  );
}

export default App;
