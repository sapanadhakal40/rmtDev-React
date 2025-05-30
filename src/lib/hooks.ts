import { useContext, useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";
import { BookmarksContext } from "../context/BookmarksContextProvider";
import { ActiveIdContext } from "../context/ActiveIdContextProvider";
import { SearchTextContext } from "../context/SearchTextContextProvider";
import { JobItemsContext } from "../context/JobItemsContextProvider";

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};
const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};
export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => {
      if (!id) throw new Error("No id provided");
      return fetchJobItem(id);
    },
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    }
  );
  // console.log(data);
  return {
    jobItem: data?.jobItem,
    isLoading: isInitialLoading,
  } as const;
}

//-----------------------------------------------------------------------------------

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    })),
  });
  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => jobItem !== undefined);

  const isLoading = results.some((result) => result.isLoading);

  return {
    jobItems,
    isLoading,
  };
}

//-----------------------------------------------------------------------------------

// export function useActiveJobItem() {
//   const activeId = useActiveId();
//   const jobItem = useJobItem(activeId);
//   return jobItem;
// }

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
  // const response = await fetch(
  //   `${BASE_API_URL}${searchText ? `?search=${searchText}` : " "}`
  // );
  //
  const data = await response.json();
  // console.log(data);
  return data;
};

export function useSearchQuery(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: handleError,
    }
  );
  const jobItems = data?.jobItems;
  const isLoading = isInitialLoading;
  return {
    jobItems,
    isLoading,
  } as const;
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedvalue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedvalue;
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return activeId;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T //what we pass in and what we get out
): [T, React.Dispatch<React.SetStateAction<T>>] {
  //tuple
  const [value, setValue] = useState<T>(
    () => JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue)) //it only run initially and get from local storage
    //key is parameter of function that can change
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]); //so key added here

  return [value, setValue] //array making renaming easier
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      "useBookmarksContext must be within a BookmarksContextProvider"
    );
  }
  return context;
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error(
      "useActiveIdContext must be within a ActiveIdContextProvider"
    );
  }
  return context;
}

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error(
      "useSearchTextContext must be within a SearchTextContextProvider"
    );
  }
  return context;
}

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);
  if (!context) {
    throw new Error(
      "useJobItemsContext must be within a JobItemsContextProvider"
    );
  }
  return context;
}
