import { Component, OnInit,  ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('toolsImplemented') toolsImplemented;
  implementedFeatures: string[] = ['Zoom Control', 'Measure Control', 'GetFeatureInfo'];
  futureImplemented: string[] = ['Feature Hover', 'Edit Feature', 'Atrribution Update'];
  breakpoint: number;
  constructor() {

   }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 2 : 4;
    // this.toolsImplemented.
    // this.toolsImplemented.selectAll();
    // this.toolsImplemented.options.forEach(item => { item.select();
    // });
  //   this.toolsImplemented.forEach((sel) => {
  //     sel.selectAll();
  // });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 2 : 4;
  }
}
