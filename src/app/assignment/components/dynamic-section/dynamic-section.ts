// src/app/assignment/components/dynamic-section/dynamic-section.ts
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { SectionItem } from '../../types';
import { DynamicInput } from '../dynamic-input/dynamic-input';

@Component({
  selector: 'app-dynamic-section',
  standalone: true,
  imports: [DynamicInput],
  templateUrl: './dynamic-section.html',
  styleUrl: './dynamic-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // ช่วยให้ประสิทธิภาพดีขึ้นและทำงานร่วมกับ Signal ได้ดี
})
export class DynamicSection {
  section = input.required<SectionItem>();
  index = input.required<number>();
  disableRemoveSection = input<boolean>(false);

  addNumber = output<void>();
  removeNumber = output<number>();
  removeSection = output<void>();
  changed = output<void>();

  // คำนวณผลรวมแบบ Real-time โดยใช้ computed signal
  total = computed(() => this.section().numbers.reduce((acc, curr) => acc + (curr.value || 0), 0));
}
