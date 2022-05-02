import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Configuration } from '../app.models';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {
    public config$: BehaviorSubject<Configuration> = new BehaviorSubject({} as Configuration)
    @Input()
    public set config(value: Configuration) {
        this.config$.next(value);
    }
}
