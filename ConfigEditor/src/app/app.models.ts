import { Time } from "@angular/common";

export type Configuration = {
    description: string;
    categories: Category[];
}

export type Category = {
    name: string;
    subcategories: SubCategory[];
}

export type SubCategory = {
    name: string;
    values: { name: string, value: number | string | Time }[];
}
