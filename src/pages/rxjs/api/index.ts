import http from "@/lib/fetch/http";

const apiUrl = {
  list: "/home/list",
};

export function getList() {
  return http({
    url: apiUrl.list,
    method: "post",
  });
}
