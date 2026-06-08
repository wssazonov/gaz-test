import { Directive, HostBinding, Input } from '@angular/core';

let nextHintId = 1000;
let nextErrorId = 1000;

@Directive({
  selector: '[uiHint]',
  standalone: true,
})
export class UiHintMarker {
  @Input() id = `ui-hint-${nextHintId++}`;

  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }
}

@Directive({
  selector: '[uiError]',
  standalone: true,
})
export class UiErrorMarker {
  @Input() id = `ui-error-${nextErrorId++}`;

  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }
}
