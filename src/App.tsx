import { useEffect, useState } from "react";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
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
  color: string;
};

function App() {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });
  const [bookmark, setBookmark] = useState<Bookmark>({
    title: "",
    description: "",
    url: "",
    color: "",
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
      color: randomColor(),
    };
    handleAddBookmark(bookmark);
    setIsCreateMode(false);
    setBookmark({ title: "", description: "", url: "", color: "" });
  };

  const handleDelete = (indexId: number): void => {
    setBookmarks(bookmarks.filter((_, index) => index !== indexId));
  };

  const randomColor = (): string => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <main className="main-container">
      {/* make this into an animation that fades into Welcome to MarkIt on loading from left to right. */}
      <h1 className="markit-title">MarkIt</h1>
      <div className="header-btns">
        <button className="link-btn" onClick={() => setIsCreateMode(false)}>
          Bookmarks
        </button>
        <button className="link-btn" onClick={() => setIsCreateMode(true)}>
          Create New
        </button>
      </div>
      {isCreateMode ? (
        <section className="create-bookmark">
          <form
            onSubmit={handleSubmit}
            style={{ backgroundColor: randomColor() }}
          >
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
      ) : (
        <section className="bookmark-list">
          {bookmarks.map((bookmark, index) => (
            <div
              key={index}
              className="bookmark-card"
              style={{ backgroundColor: bookmark.color }}
            >
              {editingIndex === index ? (
                <>
                  <div className="bookmark-input-container edit-mode">
                    <input
                      type="text"
                      value={bookmark.title}
                      onChange={(e) => {
                        const newBookmarks = [...bookmarks];
                        newBookmarks[index] = {
                          ...newBookmarks[index],
                          title: e.target.value,
                        };
                        setBookmarks(newBookmarks);
                      }}
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      value={bookmark.description}
                      onChange={(e) => {
                        const newBookmarks = [...bookmarks];
                        newBookmarks[index] = {
                          ...newBookmarks[index],
                          description: e.target.value,
                        };
                        setBookmarks(newBookmarks);
                      }}
                      placeholder="Description"
                    />
                    <input
                      type="url"
                      value={bookmark.url}
                      onChange={(e) => {
                        const newBookmarks = [...bookmarks];
                        newBookmarks[index] = {
                          ...newBookmarks[index],
                          url: e.target.value,
                        };
                        setBookmarks(newBookmarks);
                      }}
                      placeholder="URL"
                    />
                    <div className="edit-actions">
                      <button onClick={() => setEditingIndex(null)}>
                        Save
                      </button>
                      <button onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="actions">
                    <button onClick={() => handleDelete(index)}>
                      <IoTrashOutline />
                    </button>
                    <button onClick={() => setEditingIndex(index)}>
                      <IoPencilOutline />
                    </button>
                  </div>
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <h3>{bookmark.title}</h3>
                    <p>{bookmark.description}</p>
                  </a>
                </>
              )}
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

export default App;
