import { useSearchParams } from "react-router-dom";
import { DEFAULT_PAGE_SIZE } from "@/constants";

export function useTableParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(
    searchParams.get("limit") || String(DEFAULT_PAGE_SIZE),
    10,
  );

  function handleSearch(value: string) {
    setSearchParams(
      (prev) => {
        if (value) {
          prev.set("q", value);
        } else {
          prev.delete("q");
        }
        prev.set("page", "1");
        return prev;
      },
      { replace: true },
    );
  }

  function handlePageChange(newPage: number) {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  }

  function handlePageSizeChange(newSize: number) {
    setSearchParams((prev) => {
      prev.set("limit", newSize.toString());
      prev.set("page", "1");
      return prev;
    });
  }

  return {
    q,
    page,
    pageSize,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
  };
}
