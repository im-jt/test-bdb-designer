import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardTab } from '../../services/designer.service';

@Component({
  selector: 'app-designer-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './designer-canvas.component.html',
  styleUrls: ['./designer-canvas.component.scss']
})
export class DesignerCanvasComponent implements OnInit, OnDestroy {
  @Input() dashboard!: DashboardTab;

  // Canvas state
  canvasObjects: any[] = [];
  selectedObjects: any[] = [];
  canvasConfig = {
    width: 1200,
    height: 800,
    showGrid: true,
    snapToGrid: true,
    gridSize: 20,
    zoomLevel: 1
  };

  // Interaction state
  isDragging = false;
  isResizing = false;
  dragStartPosition = { x: 0, y: 0 };
  selectionRectangle: any = null;

  ngOnInit() {
    if (this.dashboard?.json?.Dashboard?.AbsoluteLayout?.Object) {
      this.canvasObjects = this.dashboard.json.Dashboard.AbsoluteLayout.Object;
    }
  }

  ngOnDestroy() {
    // Cleanup any event listeners
  }

  onCanvasMouseDown(event: MouseEvent) {
    console.log('Canvas mouse down:', event);
    // Start selection rectangle or canvas interaction
  }

  onCanvasMouseMove(event: MouseEvent) {
    // Handle mouse move for dragging, resizing, etc.
  }

  onCanvasMouseUp(event: MouseEvent) {
    // End interaction
    this.isDragging = false;
    this.isResizing = false;
    this.selectionRectangle = null;
  }

  onCanvasWheel(event: WheelEvent) {
    event.preventDefault();
    // Handle zoom
    const zoomDelta = event.deltaY > 0 ? -0.1 : 0.1;
    this.canvasConfig.zoomLevel = Math.max(0.1, Math.min(3, this.canvasConfig.zoomLevel + zoomDelta));
  }

  addComponent(componentType: string) {
    const newComponent = {
      id: this.generateId(),
      type: componentType,
      x: 100,
      y: 100,
      width: 200,
      height: 100,
      properties: this.getDefaultProperties(componentType)
    };
    
    this.canvasObjects.push(newComponent);
    this.selectObject(newComponent);
  }

  selectObject(obj: any) {
    // Clear previous selections
    this.canvasObjects.forEach(o => o.selected = false);
    
    // Select current object
    obj.selected = true;
    this.selectedObjects = [obj];
  }

  deleteSelected() {
    this.canvasObjects = this.canvasObjects.filter(obj => !obj.selected);
    this.selectedObjects = [];
  }

  duplicateSelected() {
    const duplicates = this.selectedObjects.map(obj => ({
      ...obj,
      id: this.generateId(),
      x: obj.x + 20,
      y: obj.y + 20,
      selected: false
    }));
    
    this.canvasObjects.push(...duplicates);
  }

  toggleGrid() {
    this.canvasConfig.showGrid = !this.canvasConfig.showGrid;
  }

  zoomIn() {
    this.canvasConfig.zoomLevel = Math.min(3, this.canvasConfig.zoomLevel + 0.1);
  }

  zoomOut() {
    this.canvasConfig.zoomLevel = Math.max(0.1, this.canvasConfig.zoomLevel - 0.1);
  }

  resetZoom() {
    this.canvasConfig.zoomLevel = 1;
  }

  fitToWindow() {
    // Calculate zoom to fit all objects in view
    this.canvasConfig.zoomLevel = 0.8;
  }

  private generateId(): string {
    return 'component_' + Math.random().toString(36).substr(2, 9);
  }

  private getDefaultProperties(componentType: string): any {
    const defaults: any = {
      chart: {
        title: 'New Chart',
        chartType: 'column',
        backgroundColor: '#ffffff',
        borderColor: '#cccccc'
      },
      text: {
        text: 'Text Component',
        fontSize: 14,
        fontFamily: 'Arial',
        color: '#333333',
        textAlign: 'left'
      },
      image: {
        src: '',
        alt: 'Image',
        fit: 'contain'
      },
      button: {
        text: 'Button',
        backgroundColor: '#1976d2',
        color: '#ffffff',
        action: ''
      }
    };
    
    return defaults[componentType] || {};
  }

  trackByObjectId(index: number, obj: any): string {
    return obj.id;
  }
}