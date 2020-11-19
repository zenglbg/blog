import React, { useState, useEffect } from "react";
import { PageApi } from "src/lib/api/page";

export function usePage() {
  const [pages, setPages] = useState<IPage[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    PageApi.getPagelist().then(([pages, total]) => {
      setPages(pages);
      setTotal(total);
    });
  }, []);

  return [pages, total];
}
