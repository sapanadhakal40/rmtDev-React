import { createContext } from "react";
import { useActiveId } from "../lib/hooks";

type ActiveIdContext = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContext | null>(null);

export default function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeId = useActiveId();
  return (
    <ActiveIdContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}
