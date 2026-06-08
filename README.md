# Angular Form Field UI-kit

Тестовое задание: реализация UI-kit элемента `Form Field` по принципу использования Angular Material.

## Что реализовано

- Совместимость с нативными `input` и `textarea`.
- Работа с Reactive Forms через обычный `formControl`.
- Поддержка `label`, `hint`, `error`, `prefix` и `suffix`.
- Ошибка показывается только для невалидного `touched`-контрола.
- `hint` заменяется на `error` в состоянии ошибки.
- Для input проставляются `id`, `aria-invalid` и `aria-describedby`.
- Prefix/suffix, hint и error передаются через content projection.

## Пример использования

```html
<ui-form-field>
  <ui-label>Название проекта</ui-label>

  <span uiPrefix>AZ</span>
  <input uiInput type="text" [formControl]="titleControl" placeholder="UI-kit Газфонд" />
  <button uiSuffix type="button" aria-label="Очистить" (click)="titleControl.setValue('')">
    x
  </button>

  <ui-hint>Prefix и suffix передаются через content projection.</ui-hint>
  <ui-error>Название обязательно.</ui-error>
</ui-form-field>
```

## Запуск

```bash
npm install
npm start
```

Приложение будет доступно на `http://localhost:4200/`. Или https://gazfond-test.vercel.app/

## Сборка

```bash
npm run build
```

## Тесты

```bash
npm test
```

## Затраченное время

Около 2 часов:

- создание Angular-проекта и базовой структуры;
- реализация `ui-form-field`, `uiInput`, `ui-label`, `ui-hint`, `ui-error`, `uiPrefix`, `uiSuffix`;
- настройка состояний focused/disabled/error и интеграции с Reactive Forms;
- верстка демо-страницы, README и финальная проверка сборки.
- покрытие тестами.
