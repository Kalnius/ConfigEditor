import { Component, Input } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Configuration } from '../app.models';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {
    config$: ReplaySubject<Configuration> = new ReplaySubject();
    @Input()
    public set config(value: Configuration) {
        this.config$.next(value);
    }
}
