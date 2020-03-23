import { combineEpics } from "redux-observable";
import { catchError } from "rxjs/operators";
import { userEpic } from "./user";
import {
  get_article_all,
  get_articleEpic,
  del_articleEpic,
  create_articleEpic,
  upadte_articleEpic,
  get_articleItem,
  get_article
} from "./article";
import { get_tag_all, get_tag, createTag, del_tag } from "./tag";
import { get_star_all, get_star, createStar, del_star } from "./star";
import {
  get_category_all,
  createCategory,
  del_category,
  get_category
} from "./category";

export const rootEpics = (action$, store$, dependencies) =>
  combineEpics(
    userEpic,

    get_article_all,
    get_articleEpic,
    del_articleEpic,
    create_articleEpic,
    upadte_articleEpic,
    get_articleItem,
    get_article,

    get_tag_all,
    get_tag,
    createTag,
    del_tag,

    get_star_all,
    get_star,
    createStar,
    del_star,

    get_category,
    get_category_all,
    createCategory,
    del_category
  )(action$, store$, dependencies).pipe(
    catchError((err, source) => {
      console.log(err);
      return source;
    })
  );
