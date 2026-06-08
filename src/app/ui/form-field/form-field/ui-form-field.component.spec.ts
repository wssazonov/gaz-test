import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { describe, expect, it, vi } from 'vitest';
import { UiError, UiFormField, UiHint, UiInput, UiLabel, UiPrefix, UiSuffix } from '..';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UiFormField,
    UiInput,
    UiLabel,
    UiHint,
    UiError,
    UiPrefix,
    UiSuffix,
  ],
  templateUrl: './ui-form-field.component.spec.html',
})
class TestHost {
  readonly requiredControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(2)],
  });
  readonly disabledControl = new FormControl(
    { value: 'Получено из API', disabled: true },
    { nonNullable: true },
  );
  readonly descriptionControl = new FormControl('коротко', {
    nonNullable: true,
    validators: [Validators.minLength(10)],
  });
}

describe('UiFormField', () => {
  async function setup(): Promise<ComponentFixture<TestHost>> {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();

    return fixture;
  }

  function getField(fixture: ComponentFixture<TestHost>, testId: string): HTMLElement {
    return fixture.nativeElement.querySelector(`[data-testid="${testId}"]`);
  }

  it('проецирует label, prefix, suffix, hint и нативный input', async () => {
    const fixture = await setup();
    const field = getField(fixture, 'required-field');
    const label = field.querySelector('label');
    const input = field.querySelector('input');

    expect(label?.textContent?.trim()).toBe('Название проекта');
    expect(input?.placeholder).toBe('UI-kit Газфонд');
    expect(field.querySelector('.ui-form-field__prefix')?.textContent?.trim()).toBe('AZ');
    expect(field.querySelector('.ui-form-field__suffix button')?.textContent?.trim()).toBe('x');
    expect(field.querySelector('ui-hint')?.textContent?.trim()).toBe(
      'Введите от 2 до 40 символов.',
    );
  });

  it('связывает label и активное сообщение с input через accessibility-атрибуты', async () => {
    const fixture = await setup();
    const field = getField(fixture, 'required-field');
    const label = field.querySelector('label');
    const input = field.querySelector('input');
    const hint = field.querySelector('ui-hint');

    expect(input?.id).toBeTruthy();
    expect(label?.getAttribute('for')).toBe(input?.id);
    expect(input?.getAttribute('aria-invalid')).toBeNull();
    expect(input?.getAttribute('aria-describedby')).toBe(hint?.id);
  });

  it('показывает ошибку только после touched и invalid состояния контрола', async () => {
    const fixture = await setup();
    const host = fixture.componentInstance;
    const field = getField(fixture, 'required-field');
    const input = field.querySelector('input');
    const hint = field.querySelector('ui-hint');
    const error = field.querySelector('ui-error');

    expect(field.classList.contains('ui-form-field_error')).toBe(false);
    expect(input?.getAttribute('aria-describedby')).toBe(hint?.id);

    host.requiredControl.markAsTouched();
    host.requiredControl.updateValueAndValidity();
    fixture.detectChanges();

    expect(field.classList.contains('ui-form-field_error')).toBe(true);
    expect(input?.getAttribute('aria-invalid')).toBe('true');
    expect(input?.getAttribute('aria-describedby')).toBe(error?.id);

    host.requiredControl.setValue('Angular UI-kit');
    fixture.detectChanges();

    expect(field.classList.contains('ui-form-field_error')).toBe(false);
    expect(input?.getAttribute('aria-invalid')).toBeNull();
    expect(input?.getAttribute('aria-describedby')).toBe(hint?.id);
  });

  it('фокусирует нативный input по клику на обертку поля', async () => {
    const fixture = await setup();
    const field = getField(fixture, 'required-field');
    const control = field.querySelector('.ui-form-field__control') as HTMLElement;
    const input = field.querySelector('input') as HTMLInputElement;
    const focusSpy = vi.spyOn(input, 'focus');

    control.click();
    fixture.detectChanges();

    expect(focusSpy).toHaveBeenCalledOnce();
  });

  it('отражает disabled-состояние и не фокусирует выключенный input', async () => {
    const fixture = await setup();
    const field = getField(fixture, 'disabled-field');
    const control = field.querySelector('.ui-form-field__control') as HTMLElement;
    const input = field.querySelector('input') as HTMLInputElement;
    const focusSpy = vi.spyOn(input, 'focus');

    expect(field.classList.contains('ui-form-field_disabled')).toBe(true);

    control.click();
    fixture.detectChanges();

    expect(focusSpy).not.toHaveBeenCalled();
  });

  it('поддерживает textarea через ту же директиву uiInput и error-state', async () => {
    const fixture = await setup();
    const host = fixture.componentInstance;
    const field = getField(fixture, 'textarea-field');
    const textarea = field.querySelector('textarea');
    const error = field.querySelector('ui-error');

    expect(textarea?.classList.contains('ui-input_textarea')).toBe(true);
    expect(field.classList.contains('ui-form-field_error')).toBe(false);

    host.descriptionControl.markAsTouched();
    host.descriptionControl.updateValueAndValidity();
    fixture.detectChanges();

    expect(field.classList.contains('ui-form-field_error')).toBe(true);
    expect(textarea?.getAttribute('aria-describedby')).toBe(error?.id);
  });
});
