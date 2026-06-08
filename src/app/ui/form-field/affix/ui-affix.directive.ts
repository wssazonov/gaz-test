import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[uiPrefix]',
  standalone: true,
})
export class UiPrefix {
  @HostBinding('class.ui-prefix')
  readonly prefixClass = true;
}

@Directive({
  selector: '[uiSuffix]',
  standalone: true,
})
export class UiSuffix {
  @HostBinding('class.ui-suffix')
  readonly suffixClass = true;
}
