import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AuthInfo {
  authType: string;
  token: string;
  spacekey: string;
  userID: string;
  preferenceObject: string;
  rootFolders: any[];
  user: {
    userName: string;
    emailID: string;
    lite: boolean;
  };
  preferenceID?: string;
  lite: boolean;
}

export interface DashboardTab {
  id: string;
  name: string;
  json: any;
  backendId?: string;
}

export interface DesignerState {
  isMainMenuVisible: boolean;
  dashboardTabs: DashboardTab[];
  selectedDashboard: DashboardTab | null;
  currentTheme: string;
  previewMode: boolean;
  selectedWorkspace: {
    key: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DesignerService {
  private stateSubject = new BehaviorSubject<DesignerState>({
    isMainMenuVisible: true,
    dashboardTabs: [],
    selectedDashboard: null,
    currentTheme: 'light',
    previewMode: false,
    selectedWorkspace: { key: '', name: '' }
  });

  private authInfoSubject = new BehaviorSubject<AuthInfo | null>(null);

  public state$ = this.stateSubject.asObservable();
  public authInfo$ = this.authInfoSubject.asObservable();

  constructor(private http: HttpClient) {}

  initialize() {
    // Load initial state from session storage
    this.loadAuthInfo();
    this.loadWorkspaceInfo();
    this.loadTheme();
  }

  private loadAuthInfo() {
    const authInfo = sessionStorage.getItem('bvz_authInfo');
    if (authInfo) {
      try {
        const parsedAuthInfo = JSON.parse(authInfo);
        this.authInfoSubject.next(parsedAuthInfo);
      } catch (error) {
        console.error('Error parsing auth info:', error);
      }
    }
  }

  private loadWorkspaceInfo() {
    const workspace = sessionStorage.getItem('workspace');
    if (workspace) {
      const workspaceDetail = workspace.split('_');
      const currentState = this.stateSubject.value;
      this.stateSubject.next({
        ...currentState,
        selectedWorkspace: {
          key: workspaceDetail[0],
          name: workspaceDetail[1]
        }
      });
    }
  }

  private loadTheme() {
    const theme = sessionStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', theme);
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      currentTheme: theme
    });
  }

  toggleMainMenu() {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      isMainMenuVisible: !currentState.isMainMenuVisible
    });
  }

  toggleTheme() {
    const currentState = this.stateSubject.value;
    const newTheme = currentState.currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    sessionStorage.setItem('theme', newTheme);
    
    this.stateSubject.next({
      ...currentState,
      currentTheme: newTheme
    });
  }

  createNewDashboard(autoFocus: boolean = false): string {
    const dashboardId = this.generateId();
    const newDashboard: DashboardTab = {
      id: dashboardId,
      name: 'Untitled Dashboard',
      json: {
        Dashboard: {
          backendId: '',
          AbsoluteLayout: {
            Object: []
          }
        }
      }
    };

    const currentState = this.stateSubject.value;
    const updatedTabs = [...currentState.dashboardTabs, newDashboard];
    
    this.stateSubject.next({
      ...currentState,
      dashboardTabs: updatedTabs,
      selectedDashboard: newDashboard,
      isMainMenuVisible: false
    });

    return dashboardId;
  }

  closeDashboard(dashboardId: string) {
    const currentState = this.stateSubject.value;
    const updatedTabs = currentState.dashboardTabs.filter(tab => tab.id !== dashboardId);
    
    let selectedDashboard = currentState.selectedDashboard;
    if (selectedDashboard?.id === dashboardId) {
      selectedDashboard = updatedTabs.length > 0 ? updatedTabs[updatedTabs.length - 1] : null;
    }

    this.stateSubject.next({
      ...currentState,
      dashboardTabs: updatedTabs,
      selectedDashboard: selectedDashboard,
      isMainMenuVisible: updatedTabs.length === 0
    });
  }

  selectDashboard(dashboardId: string) {
    const currentState = this.stateSubject.value;
    const dashboard = currentState.dashboardTabs.find(tab => tab.id === dashboardId);
    
    if (dashboard) {
      this.stateSubject.next({
        ...currentState,
        selectedDashboard: dashboard
      });
    }
  }

  togglePreview() {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      previewMode: !currentState.previewMode
    });
  }

  saveDashboard(): Observable<any> {
    const currentState = this.stateSubject.value;
    if (!currentState.selectedDashboard) {
      throw new Error('No dashboard selected');
    }

    // This would make an HTTP call to save the dashboard
    // For now, we'll just simulate a successful save
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({ success: true });
        observer.complete();
      }, 1000);
    });
  }

  private generateId(): string {
    return 'dashboard_' + Math.random().toString(36).substr(2, 9);
  }

  // Methods for handling user actions
  logout() {
    const authInfo = this.authInfoSubject.value;
    if (authInfo?.user?.lite) {
      window.location.href = '/lite-preview';
    } else {
      // Call logout API
      this.http.post('/auth/logout', { token: authInfo?.token }).subscribe({
        next: () => {
          sessionStorage.clear();
          window.location.href = '/signin';
        },
        error: (error) => {
          console.error('Logout error:', error);
          // Force logout even if API fails
          sessionStorage.clear();
          window.location.href = '/signin';
        }
      });
    }
  }

  navigateToNotifications() {
    window.location.href = '/home/#/notifications';
  }

  navigateToMyAccount() {
    window.location.href = '/home/#/myaccount';
  }

  navigateToAbout() {
    window.location.href = '/home/#/home/welcome';
  }

  navigateToSettings() {
    window.location.href = '/home/#/admin';
  }
}