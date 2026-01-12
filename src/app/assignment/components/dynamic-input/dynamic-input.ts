// src/app/assignment/components/dynamic-input/dynamic-input.ts
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NumberItem } from '../../types';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  templateUrl: './dynamic-input.html',
  styleUrl: './dynamic-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicInput {
  item = input.required<NumberItem>();
  index = input.required<number>();
  disableRemove = input<boolean>(false);

  update = output<number>();
  remove = output<void>();
}
