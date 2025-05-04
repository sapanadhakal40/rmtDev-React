import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import Sidebar, { SidebarTop } from "./Sidebar";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import PaginationControls from "./PaginationControls";
import JobList from "./JobList";
import { useActiveId, useJobItem, useJobItems } from "../lib/hooks";

function App() {
  const [searchText, setSearchText] = useState("");
  //  const { jobItemsSliced: jobItems, isLoading } = useJobItems(searchText);
  const [jobItems, isLoading] = useJobItems(searchText);
  const activeId = useActiveId();
  const jobItem = useJobItem(activeId);
  // const jobItem = useActiveJobItem();
  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItems} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent jobItem={jobItem} />
      </Container>
      <Footer />
    </>
  );
}

export default App;
