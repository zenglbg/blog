import React, { useState, useEffect } from "react";
import { PageApi } from "@lib/api";

export const usePage = () => {
  const [page, setPage] = useState<IPage[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    PageApi.getPagelist().then(([pages, total]) => {
      setPage(pages);
      setTotal(total);
    });
  }, []);

  return [page, total];
};
