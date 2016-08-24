import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'page-not-found',
    template: 'Page Not Found'
})
// Until useAsDefault has returned
export class NotFoundComponent {
    constructor(private _router:Router){
        this._router.navigate(['/about']);
    }
}
