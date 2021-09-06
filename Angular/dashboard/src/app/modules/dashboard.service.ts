import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor() {}

  bigCharts() {
    return [
      {
        name: 'Asia',
        data: [502, 635, 809, 947, 1402, 3634, 5268],
      },
      {
        name: 'Africa',
        data: [106, 107, 111, 133, 221, 767, 1766],
      },
      {
        name: 'Europe',
        data: [163, 203, 276, 408, 547, 729, 628],
      },
      {
        name: 'America',
        data: [18, 31, 54, 156, 339, 818, 1201],
      },
      {
        name: 'Oceania',
        data: [2, 2, 2, 6, 13, 30, 46],
      },
    ];
  }

  cards() {
    let data: number[] = [];

    for (let i = 0; i < 8; i++) {
      data.push(Math.floor(Math.random() * (100 - 1) + 1));
    }
    return { data: data };
  }

  pie() {
    return [
      {
        name: 'Nice',
        y: 69,
      },
      {
        name: 'Internet Explorer',
        y: 12,
      },
      {
        name: 'Firefox',
        y: 10,
      },
      {
        name: 'Edge',
        y: 3.1,
      },
      {
        name: 'Safari',
        y: 3.2,
      },
      {
        name: 'Sogou Explorer',
        y: 2.7,
      },
    ];
  }
}
