import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  UiError,
  UiFormField,
  UiHint,
  UiInput,
  UiLabel,
  UiPrefix,
  UiSuffix,
} from './ui/form-field';

@Component({
  selector: 'app-root',
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
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly titleControl = new FormControl('Компонент поля формы', {
    nonNullable: true,
    validators: [Validators.required],
  });
  readonly nameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(40)],
  });
  readonly emailControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.email],
  });
  readonly codeControl = new FormControl('ABC', {
    nonNullable: true,
    validators: [Validators.pattern(/^[A-Z]{2}-\d{4}$/)],
  });
  readonly disabledControl = new FormControl(
    { value: 'Получено из API', disabled: true },
    { nonNullable: true },
  );
  readonly descriptionMaxLength = 120;
  readonly descriptionControl = new FormControl('Короткий и понятный API.', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(24),
      Validators.maxLength(this.descriptionMaxLength),
    ],
  });
  readonly searchControl = new FormControl('поле формы', { nonNullable: true });

  get nameErrorText(): string {
    if (this.nameControl.hasError('required')) {
      return 'ФИО обязательно.';
    }

    if (this.nameControl.hasError('minlength')) {
      return 'Минимальная длина 2 символа.';
    }

    if (this.nameControl.hasError('maxlength')) {
      return 'Максимальная длина 40 символов.';
    }

    return 'Проверьте значение.';
  }

  get descriptionErrorText(): string {
    if (this.descriptionControl.hasError('required')) {
      return 'Описание обязательно.';
    }

    if (this.descriptionControl.hasError('minlength')) {
      return 'Описание слишком короткое.';
    }

    if (this.descriptionControl.hasError('maxlength')) {
      return `Максимум ${this.descriptionMaxLength} символов.`;
    }

    return 'Проверьте описание.';
  }

  constructor() {
    this.codeControl.markAsTouched();
  }
}
