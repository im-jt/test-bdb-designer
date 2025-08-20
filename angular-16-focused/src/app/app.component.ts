import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DesignerService } from './services/designer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'Dashboard Designer';

  constructor(private designerService: DesignerService) {}

  ngOnInit() {
    // Initialize the designer service
    this.designerService.initialize();
  }
}