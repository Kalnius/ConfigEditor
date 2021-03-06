import { Time } from "@angular/common";

export type Configuration = {
    description: string;
    sections: Section[];
}

export type Section = {
    name: string;
    categories: Category[];
}

export type ConfigValue = {
    name: string;
    value: number | string;
    valueType: 'text' | 'number' | 'time';
    availableValues: string[] | undefined;
};

export type Category = {
    name: string;
    values: ConfigValue[];
}
