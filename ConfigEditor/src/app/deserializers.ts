import { Category, Configuration } from "./app.models";
import { extractValueFromString, getSectionName, groupByCategory, groupBySection, removeAllOccurences, splitStringToRows } from "./string-utils";

export const mapCategories = (categories: string[]): Category[] =>
    categories.map(subcat => splitStringToRows(subcat).reduce((category, row, index) => {
        // 1st line is the category name
        if (index === 0) {
            category.name = row.substring(0, row.indexOf(':'));
            return category;
        }

        if (row.length !== 0) { // ignore empty rows
            category.values.push({
                name: row.substring(0, row.indexOf(':')),
                // removing tabs and that single colon from the value
                value: extractValueFromString(row)
            });
        }

        return category;
    }, { name: '', values: [] } as Category));


export const deserializeConfigurationString = (base: string) =>
    groupBySection(base).reduce((config, value, index) => {
        // 1st line is the config description
        if (index === 0) {
            config.description = removeAllOccurences(value, '\r\n');
            return config;
        }

        config.sections.push({
            name: getSectionName(value),
            categories: mapCategories(groupByCategory(value))
        });

        return config;
    }, { description: '', sections: [] } as Configuration);
