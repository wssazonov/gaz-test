import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-label',
  standalone: true,
  templateUrl: './ui-label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLabel {}
