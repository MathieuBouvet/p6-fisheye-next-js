import { ArrayUnwrap } from "../utils/typeUtils";
import { PhotographerData } from "@lib/model/getPhotographerById";

type Medium = ArrayUnwrap<PhotographerData["media"]>;

export type SortType = "title" | "date" | "popularity";
type SortConfig = {
  label: string;
  sortFn: (mediumA: Medium, mediumB: Medium) => number;
};

function sortByDate(mediumA: Medium, mediumB: Medium): number {
  return mediumB.createdAt - mediumA.createdAt;
}

function sortByTitle(mediumA: Medium, mediumB: Medium): number {
  return mediumA.title.localeCompare(mediumB.title);
}

function sortByPopularity(mediumA: Medium, mediumB: Medium): number {
  return mediumB.likes - mediumA.likes;
}

const mediaSort: Record<SortType, SortConfig> = {
  title: {
    label: "Titre",
    sortFn: sortByTitle,
  },
  date: {
    label: "Date",
    sortFn: sortByDate,
  },
  popularity: {
    label: "Popularité",
    sortFn: sortByPopularity,
  },
};

function isSortType(str: string): str is SortType {
  return ["title", "date", "popularity"].includes(str);
}

export default mediaSort;
export { isSortType };
