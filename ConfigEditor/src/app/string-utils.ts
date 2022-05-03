import { CATEGORY_START_DELIMITER, SECTION_NAME_DELIMITERS } from "./app.constants";

export const groupByCategory = (value: string) =>
    // splice ignores the section description (1st line)
    value.split(CATEGORY_START_DELIMITER).slice(1);

export const groupBySection = (base: string) =>
    base.split(SECTION_NAME_DELIMITERS.start);

export const getSectionName = (value: string): string =>
    value.substring(0, value.indexOf(SECTION_NAME_DELIMITERS.end));

export const splitStringToRows = (subcat: string) =>
    subcat.split(/[\r\n]+/);

export const removeAllOccurences = (value: string, remove: string): string =>
    value.split(remove).join('');

export const extractValueFromString = (row: string): number | string => {
    const value = removeAllOccurences(row.substring(row.indexOf(':'), row.indexOf('//')), '\t').replace(':', '');
    if (!isNaN(Number(value))) {
        return Number(value);
    }
    return value;
}
