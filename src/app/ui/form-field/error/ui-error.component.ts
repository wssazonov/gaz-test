import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

let nextErrorId = 0;

@Component({
  selector: 'ui-error',
  standalone: true,
  templateUrl: './ui-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiError {
  @Input() id = `ui-error-${nextErrorId++}`;

  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }
}
