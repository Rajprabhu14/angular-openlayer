import { Component, OnInit,  ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('toolsImplemented') toolsImplemented;
  implementedFeatures: string[] = ['Zoom Control', 'Measure Control', 'GetFeatureInfo'];
  futureImplemented: string[] = ['Feature Hover', 'Edit Feature', 'Atrribution Update'];
  constructor() { }

  ngOnInit() {
    // this.toolsImplemented.
    // this.toolsImplemented.selectAll();
    // this.toolsImplemented.options.forEach(item => { item.select();
    // });
  //   this.toolsImplemented.forEach((sel) => {
  //     sel.selectAll();
  // });
  }
}
