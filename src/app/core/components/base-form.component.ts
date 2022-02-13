import { ChangeDetectorRef, Directive, Input } from "@angular/core";
import { AbstractControl, FormControlStatus } from "@angular/forms";
import { Observable, tap } from "rxjs";

@Directive()
export abstract class BaseFormComponent<T extends AbstractControl> {
    @Input('form')
    public set formSetter(form: T) {
        this.form = form;
        
        this.initFormChangesObservable();
    }

    public form!: T;
    public formChanges$!: Observable<FormControlStatus>;

    constructor(
        private readonly _cdr: ChangeDetectorRef
    ) {}

    private initFormChangesObservable(): void {
        this.formChanges$ = this.form.statusChanges
            .pipe(
                tap(() => this._cdr.markForCheck())
            );
    }
}
