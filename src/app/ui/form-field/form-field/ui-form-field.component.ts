import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  HostBinding,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UiError } from '../error/ui-error.component';
import { UiHint } from '../hint/ui-hint.component';
import { UiInput } from '../input/ui-input.directive';
import { UiErrorMarker, UiHintMarker } from '../message/ui-message.directive';

@Component({
  selector: 'ui-form-field',
  standalone: true,
  templateUrl: './ui-form-field.component.html',
  styleUrl: './ui-form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UiFormField implements AfterContentInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  @ContentChild(UiInput) input?: UiInput;
  @ContentChild(UiHint) hint?: UiHint;
  @ContentChild(UiHintMarker) hintMarker?: UiHintMarker;
  @ContentChild(UiError) error?: UiError;
  @ContentChild(UiErrorMarker) errorMarker?: UiErrorMarker;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  @HostBinding('class.ui-form-field')
  readonly fieldClass = true;

  @HostBinding('class.ui-form-field_focused')
  get focused(): boolean {
    return !!this.input?.focused;
  }

  @HostBinding('class.ui-form-field_disabled')
  get disabled(): boolean {
    return !!this.input?.disabled;
  }

  @HostBinding('class.ui-form-field_error')
  get showError(): boolean {
    return (!!this.error || !!this.errorMarker) && !!this.input?.errorState;
  }

  @HostBinding('class.ui-form-field_filled')
  get filled(): boolean {
    return !!this.input && !this.input.empty;
  }

  ngAfterContentInit(): void {
    this.syncDescribedBy();

    if (this.input) {
      this.subscriptions.add(
        this.input.stateChanges.subscribe(() => {
          this.syncDescribedBy();
          this.cdr.markForCheck();
        }),
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  focusInput(): void {
    if (!this.input?.disabled) {
      this.input?.focus();
    }
  }

  private syncDescribedBy(): void {
    const activeMessageId = this.showError ? this.error?.id ?? this.errorMarker?.id : this.hint?.id ?? this.hintMarker?.id;
    this.input?.setDescribedBy(activeMessageId ? [activeMessageId] : []);
  }
}
