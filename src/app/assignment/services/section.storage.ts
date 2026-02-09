import { Injectable } from '@angular/core';

const keyName = 'ng-section-data';

@Injectable({
  providedIn: 'root',
})
export class SectionStorage {
  set(data: number[][]): void {
    localStorage.setItem(keyName, JSON.stringify(data));
  }

  get(): number[][] | null {
    const json = localStorage.getItem(keyName);
    return json ? (JSON.parse(json) as number[][]) : null;
  }
}
