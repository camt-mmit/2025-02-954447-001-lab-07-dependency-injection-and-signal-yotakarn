import { ChangeDetectionStrategy, Component, effect, inject, model } from '@angular/core';
import { numbersToSections, sectionToNumbers } from '../../helpers';
import { SectionModel } from '../../types';
import { DynamicInput } from '../dynamic-input/dynamic-input';
import { SectionStorage } from '../../services/section.storage';

@Component({
  selector: 'app-dynamic-section',
  imports: [DynamicInput],
  templateUrl: './dynamic-section.html',
  styleUrl: './dynamic-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSection {
  readonly dataStorage = inject(SectionStorage);
  readonly sections = model(numbersToSections(this.dataStorage.get()));

  constructor() {
    effect(() => {
      this.dataStorage.set(sectionToNumbers(this.sections()));
    });
  }
  addSection() {
    this.sections.update((secs) => [...secs, { numbers: [{ value: 0 }] }]);
  }

  removeSection(index: number) {
    this.sections.update((secs) => secs.filter((_, i) => i !== index));
  }

  changeSection(index: number, value: SectionModel) {
    this.sections.update((secs) => secs.map((s, i) => (i === index ? value : s)));
  }
}
