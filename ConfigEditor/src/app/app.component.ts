import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EMPTY, map, Observable, of } from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { Configuration, SubCategory } from './app.models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ConfigEditor';
    public config$: Observable<Configuration>;
    constructor(http: HttpClient) {
        this.config$ = of();
        combineLatest(
            [
                http.get('assets/Base_Config.txt', {responseType: 'text'}),
                http.get('assets/Project_Config.txt', {responseType: 'text'})
            ]).pipe(map(([base, project]) => {
                const test = base.split('=== ');
                console.log(test);
                base.split('=== Section: ').reduce((config, value, index) => {
                    if (index === 0) {
                        config.description = value;
                        return config;
                    }
                    config.categories.push({
                        name: value.substring(0, value.indexOf(' ===')),
                        subcategories: value.split('- ').slice(1).map(subcat => subcat.split(/[\r\n]+/).reduce((subcat, row, index) => {
                            if (index === 0) {
                                subcat.name = row.substring(0, row.indexOf(':'));
                                return subcat;
                            }
                            subcat.values.push({
                                name: row.substring(0, row.indexOf(':')),
                                value: row.substring(row.indexOf(':'), row.indexOf('//')).replace('\t', '').replace(':', '')
                            })
                            return subcat;
                        }, { name: '', values: [] } as SubCategory))
                    })
                    return config;
                }, { categories: [], description: '' } as Configuration);
                console.log(base);
                console.log(project);
            })).subscribe();
    }
}
// function getSubcategories(from: string[]): SubCategory[] {
//     const subcategories: SubCategory[] = [];
//     for(const row of from) {
//         if (row.startsWith(''))
//     }
// }

