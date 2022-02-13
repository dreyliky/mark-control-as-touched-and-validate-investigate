import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { markControlAsTouchedAndValidate } from '@core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    public readonly form = new FormGroup({
        login: new FormControl('', [Validators.required, Validators.minLength(6)]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    public onSubmitButtonClick(): void {
        if (!this.form.valid) {
            markControlAsTouchedAndValidate(this.form);
        }
    }
}
