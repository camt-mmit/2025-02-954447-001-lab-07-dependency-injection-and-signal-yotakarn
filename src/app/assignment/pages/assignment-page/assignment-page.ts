// src/app/assignment/pages/assignment-page/assignment-page.ts
import { ChangeDetectionStrategy, Component, OnInit, effect, signal } from '@angular/core';
import { SectionItem } from '../../types';
import { DynamicSection } from '../../components/dynamic-section/dynamic-section';

@Component({
  selector: 'app-assignment-page',
  standalone: true,
  imports: [DynamicSection],
  templateUrl: './assignment-page.html',
  styleUrl: './assignment-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentPage implements OnInit {
  private readonly STORAGE_KEY = 'ng-section-data';
  protected sections = signal<SectionItem[]>([]);

  constructor() {
    effect(() => {
      const rawData = this.sections().map((s) => s.numbers.map((n) => n.value));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(rawData));
    });
  }

  ngOnInit() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      const data: number[][] = JSON.parse(saved);
      this.sections.set(
        data.map((nums) => ({
          numbers: nums.map((v) => ({ value: v })),
        })),
      );
    } else {
      this.addSection();
    }
  }

  protected addSection() {
    this.sections.update((prev) => [...prev, { numbers: [{ value: 0 }] }]);
  }

  protected removeSection(index: number) {
    if (this.sections().length > 1) {
      this.sections.update((prev) => prev.filter((_, i) => i !== index));
    }
  }

  protected addNumber(section: SectionItem) {
    section.numbers.push({ value: 0 });
    this.refresh();
  }

  protected removeNumber(section: SectionItem, numIndex: number) {
    section.numbers.splice(numIndex, 1);
    this.refresh();
  }

  protected refresh() {
    this.sections.update((prev) => [...prev]);
  }
}
