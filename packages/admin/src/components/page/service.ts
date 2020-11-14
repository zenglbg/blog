import React, { useState, useEffect } from "react";
import { PageApi } from "src/lib/api/page";

export function usePage() {
  const [pages, setPages] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    PageApi.getPagelist().subscribe((res) => {
      if (res.success) {
        const [pages, total] = res.data;
        setPages(pages);
        setTotal(total);
      }
    });
  }, []);

  return [pages, total];
}
