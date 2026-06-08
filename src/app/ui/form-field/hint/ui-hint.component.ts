import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

let nextHintId = 0;

@Component({
  selector: 'ui-hint',
  standalone: true,
  templateUrl: './ui-hint.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiHint {
  @Input() id = `ui-hint-${nextHintId++}`;

  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }
}
