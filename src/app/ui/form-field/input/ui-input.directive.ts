import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';

let nextInputId = 0;

@Directive({
  selector: 'input[uiInput], textarea[uiInput]',
  standalone: true,
})
export class UiInput implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();
  private focusedValue = false;
  private describedByIds = '';

  readonly stateChanges = new Subject<void>();

  @Input() id = `ui-input-${nextInputId++}`;

  constructor(
    readonly elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    private readonly renderer: Renderer2,
    @Optional() @Self() readonly ngControl: NgControl | null,
  ) {}

  @HostBinding('class.ui-input')
  readonly inputClass = true;

  @HostBinding('class.ui-input_textarea')
  get textareaClass(): boolean {
    return this.elementRef.nativeElement.tagName.toLowerCase() === 'textarea';
  }

  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }

  @HostBinding('attr.aria-invalid')
  get ariaInvalid(): string | null {
    return this.errorState ? 'true' : null;
  }

  @HostBinding('attr.aria-describedby')
  get ariaDescribedBy(): string | null {
    return this.describedByIds || null;
  }

  get focused(): boolean {
    return this.focusedValue;
  }

  get disabled(): boolean {
    return this.elementRef.nativeElement.disabled || !!this.ngControl?.control?.disabled;
  }

  get empty(): boolean {
    return this.elementRef.nativeElement.value.length === 0;
  }

  get errorState(): boolean {
    const control = this.ngControl?.control;
    return !!control && control.invalid && control.touched;
  }

  ngOnInit(): void {
    const control = this.ngControl?.control;

    if (control) {
      this.subscriptions.add(control.events.subscribe(() => this.emitStateChange()));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.stateChanges.complete();
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  setDescribedBy(ids: string[]): void {
    this.describedByIds = ids.filter(Boolean).join(' ');
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'aria-describedby',
      this.describedByIds,
    );
  }

  @HostListener('input')
  @HostListener('change')
  handleValueChange(): void {
    this.emitStateChange();
  }

  @HostListener('focus')
  handleFocus(): void {
    this.focusedValue = true;
    this.emitStateChange();
  }

  @HostListener('blur')
  handleBlur(): void {
    this.focusedValue = false;
    this.emitStateChange();
  }

  private emitStateChange(): void {
    this.stateChanges.next();
  }
}
