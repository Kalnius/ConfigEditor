import { AVAILABLE_VALUES } from "./app.constants";
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
            // removing tabs and that single colon from the value
            const name = row.substring(0, row.indexOf(':'));
            const value = extractValueFromString(row);
            category.values.push({
                name,
                value,
                availableValues: name in AVAILABLE_VALUES ? AVAILABLE_VALUES[name as keyof typeof AVAILABLE_VALUES] : undefined,
                valueType: !isNaN(Number(value)) ? 'number' : typeof value === 'string' && value.split(':').length === 3 ? 'time' : 'text'
            });
        }

        return category;
    }, { name: '', values: [] } as Category));


export const deserializeConfigurationString = (base: string): Configuration =>
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
