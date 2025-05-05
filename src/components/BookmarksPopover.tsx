import { forwardRef } from "react";
import { useBookmarksContext } from "../lib/hooks";
import JobList from "./JobList";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  //first will prop and second will ref
  //if no props is used -> use underscore
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();
  return (
    <div ref={ref} className="bookmarks-popover">
      <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
    </div>
  );
});
export default BookmarksPopover;
