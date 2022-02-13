import { Component, ChangeDetectionStrategy, Self, ChangeDetectorRef, OnInit, OnDestroy, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-my-input',
    templateUrl: './my-input.component.html',
    styleUrls: ['./my-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input()
    public placeholder: string = '';

    public value!: string;

    public onChange!: (value: string) => void;
    public onTouched!: () => void;

    public get isFormControlInvalid(): boolean {
        return (!this.controlDir.valid && !!this.controlDir.touched);
    }

    private readonly _viewDestroyed$ = new Subject<boolean>();

    constructor(
        @Self() private readonly controlDir: NgControl,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        this.controlDir.valueAccessor = this;
    }

    public ngOnInit(): void {
        // TextBox `error` class binding doesn't working without call
        // `changeDetector.markForCheck` after FormControl.statusChanges
        this.initFormControlStatusChangesObserver();
    }

    public ngOnDestroy(): void {
        this._viewDestroyed$.next(true);
        this._viewDestroyed$.complete();
    }

    public onInputValueChange(event: Event): void {
        const inputElement = event.target as HTMLInputElement;

        this.onChange(inputElement.value);
    }

    public writeValue(value: string): void {
        this.value = value;

        this.changeDetector.detectChanges();
    }

    public registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    private initFormControlStatusChangesObserver(): void {
        this.controlDir.statusChanges
            ?.pipe(
                takeUntil(this._viewDestroyed$)
            )
            .subscribe(() => this.changeDetector.markForCheck());
    }
}
