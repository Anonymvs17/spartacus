import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { Observable } from 'rxjs';
import { shareReplay, startWith, switchMap } from 'rxjs/operators';
import { ItemService } from '../../shared/item.service';
import { UnitItemService } from '../services/unit-item.service';

@Component({
  selector: 'cx-org-unit-details',
  templateUrl: './unit-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ItemService,
      useExisting: UnitItemService,
    },
  ],
  host: { class: 'content-wrapper' },
})
export class UnitDetailsComponent {
  model$: Observable<B2BUnit> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    shareReplay({ bufferSize: 1, refCount: true }),
    startWith({})
  );

  constructor(protected itemService: ItemService<B2BUnit>) {}
}
