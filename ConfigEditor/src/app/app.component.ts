import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { Configuration } from './app.models';
import { deserializeConfigurationString } from './deserializers';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ConfigEditor';
    public config$: Observable<Configuration>;
    constructor(http: HttpClient) {
        this.config$ = combineLatest(
            [
                http.get('assets/Base_Config.txt', { responseType: 'text' }),
                http.get('assets/Project_Config.txt', { responseType: 'text' })
            ]).pipe(map(([base, project]) =>
                // merging using spread
                ({ ...deserializeConfigurationString(base), ...deserializeConfigurationString(project) })
            ));
    }
}

// TODO:
// would set up eslint, use ngrx for config state management, write unit tests for string utils
