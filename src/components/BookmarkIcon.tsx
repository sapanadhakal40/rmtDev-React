import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContextProvider";

type BookmarkIconProps = {
  id: number;
};
export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkedIds, handleToggleBookmark } = useContext(BookmarksContext);

  return (
    <button onClick={() => handleToggleBookmark(id)} className="bookmark-btn">
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
