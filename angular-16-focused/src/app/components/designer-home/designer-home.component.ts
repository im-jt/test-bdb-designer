import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { DesignerService, DesignerState, AuthInfo } from '../../services/designer.service';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { DesignerCanvasComponent } from '../designer-canvas/designer-canvas.component';

@Component({
  selector: 'app-designer-home',
  standalone: true,
  imports: [
    CommonModule,
    MainMenuComponent,
    DesignerCanvasComponent
  ],
  templateUrl: './designer-home.component.html',
  styleUrls: ['./designer-home.component.scss']
})
export class DesignerHomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  designerState!: DesignerState;
  authInfo: AuthInfo | null = null;
  brandConfig: any;

  constructor(private designerService: DesignerService) {
    this.brandConfig = (window as any).app_brand_cfg;
  }

  ngOnInit() {
    // Subscribe to designer state
    this.designerService.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.designerState = state;
      });

    // Subscribe to auth info
    this.designerService.authInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(authInfo => {
        this.authInfo = authInfo;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDocumentClick(event: MouseEvent) {
    // Handle global document click events
    console.log('Document click:', event);
  }

  toggleMenu() {
    this.designerService.toggleMainMenu();
  }

  createNewDashboard(autoFocus: boolean = false) {
    this.designerService.createNewDashboard(autoFocus);
  }

  dashboardTabClick(dashboardId: string) {
    this.designerService.selectDashboard(dashboardId);
  }

  closeDashboard(dashboardId: string, index: number) {
    event?.stopPropagation();
    this.designerService.closeDashboard(dashboardId);
  }

  togglePreview() {
    this.designerService.togglePreview();
  }

  saveDashboard() {
    this.designerService.saveDashboard().subscribe({
      next: (result) => {
        console.log('Dashboard saved successfully:', result);
        // Show success notification
      },
      error: (error) => {
        console.error('Error saving dashboard:', error);
        // Show error notification
      }
    });
  }

  exportCurrentDashboard() {
    // Implementation for export functionality
    console.log('Export dashboard');
  }

  switchDashboardView(viewType: 'Mobile' | 'Tablet' | 'Desktop') {
    // Implementation for responsive view switching
    console.log('Switch view to:', viewType);
  }

  openSaveAsDialog(event: Event) {
    // Implementation for save as dialog
    console.log('Open save as dialog');
  }

  get previewLabel(): string {
    return this.designerState?.previewMode ? 'Exit Preview' : 'Preview';
  }

  get previewIcon(): string {
    return this.designerState?.previewMode ? 'nt-design-icon' : 'nt-preview-icon';
  }
}