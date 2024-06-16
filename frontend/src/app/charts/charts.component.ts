import { Component, OnInit } from '@angular/core';
import { NgCircleProgressModule, CircleProgressOptions } from 'ng-circle-progress';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    NgCircleProgressModule
  ],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  providers: [
    {
      provide: CircleProgressOptions,
      useValue: {
        radius: 100,
        outerStrokeWidth: 16,
        innerStrokeWidth: 0,
        outerStrokeColor: "#78C000",
        animationDuration: 300,
        showUnits: true,
        units: '%',
        showTitle: true,
        showSubtitle: true,
        unitsColor: "#483500",
        subtitleColor: "#483500",
        titleColor: "#483500",
      }
    }
  ]
})
export class ChartsComponent implements OnInit {
  percent: number = 70;

  constructor() { }

  ngOnInit(): void {
    // Initialization logic if needed
  }
}