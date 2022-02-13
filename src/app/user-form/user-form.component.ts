import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseFormComponent } from '@core';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent extends BaseFormComponent<FormGroup> {
    constructor(
        changeDetector: ChangeDetectorRef
    ) {
        super(changeDetector);
    }
}
