import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dashboard-container">
      <h1>Dashboard Designer</h1>
      <p>Welcome to the migrated Angular 16 application!</p>
      
      <div class="cards-grid">
        <mat-card class="feature-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>design_services</mat-icon>
            <mat-card-title>Designer</mat-card-title>
            <mat-card-subtitle>Canvas-based design interface</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Create and edit dashboard components with an intuitive drag-and-drop interface.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary">Open Designer</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="feature-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>tune</mat-icon>
            <mat-card-title>Properties</mat-card-title>
            <mat-card-subtitle>Component property editor</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Edit component properties with advanced form controls and validation.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary">View Properties</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="feature-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>folder</mat-icon>
            <mat-card-title>File Explorer</mat-card-title>
            <mat-card-subtitle>File management system</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Browse, upload, and manage your dashboard files and assets.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary">Browse Files</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .dashboard-container h1 {
      color: #1976d2;
      margin-bottom: 10px;
    }
    
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }
    
    .feature-card {
      height: 250px;
      display: flex;
      flex-direction: column;
    }
    
    .feature-card mat-card-content {
      flex: 1;
    }
    
    .feature-card mat-icon[mat-card-avatar] {
      background-color: #1976d2;
      color: white;
    }
  `]
})
export class DashboardComponent {}