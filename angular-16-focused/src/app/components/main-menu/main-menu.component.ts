import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { DesignerService, AuthInfo } from '../../services/designer.service';

interface Language {
  locale: string;
  displayName: string;
}

interface HeaderNavMenu {
  name: string;
  icon: string;
  status: boolean;
  url?: string;
}

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  authInfo: AuthInfo | null = null;
  isUserDropdownOpen = false;
  isUserAlertOpen = false;
  isUserNavigationOpen = false;
  
  unreadMessages = 0;
  unreadNotifications: any[] = [];
  
  languageList: Language[] = [
    {
      locale: "en-US",
      displayName: "English(US)"
    },
    {
      locale: "hi-IN", 
      displayName: "हिंदी(भारत)"
    }
  ];
  
  selectedLanguage = this.languageList[0];
  
  headerNavMenu: HeaderNavMenu[] = [
    { name: 'Home', icon: 'home', status: true, url: '/home' },
    { name: 'Analytics', icon: 'analytics', status: true, url: '/analytics' },
    { name: 'Reports', icon: 'assessment', status: true, url: '/reports' },
    { name: 'Data Sources', icon: 'storage', status: true, url: '/datasources' },
    { name: 'Admin', icon: 'settings', status: true, url: '/admin' }
  ];

  constructor(private designerService: DesignerService) {}

  ngOnInit() {
    this.designerService.authInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(authInfo => {
        this.authInfo = authInfo;
      });

    // Load notifications (simulated)
    this.loadNotifications();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleUserDropdown() {
    this.isUserAlertOpen = false;
    this.isUserNavigationOpen = false;
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  toggleUserAlertNotification() {
    this.isUserDropdownOpen = false;
    this.isUserNavigationOpen = false;
    this.isUserAlertOpen = !this.isUserAlertOpen;
  }

  toggleUserNavigation() {
    this.isUserDropdownOpen = false;
    this.isUserAlertOpen = false;
    this.isUserNavigationOpen = !this.isUserNavigationOpen;
  }

  toggleDarkMode() {
    this.designerService.toggleTheme();
  }

  userNotification() {
    this.designerService.navigateToNotifications();
  }

  userLogout() {
    this.designerService.logout();
  }

  navigateToMyAccount() {
    this.designerService.navigateToMyAccount();
  }

  navigateToAbout() {
    this.designerService.navigateToAbout();
  }

  navigateToSettings() {
    this.designerService.navigateToSettings();
  }

  navigateBy(menu: HeaderNavMenu, name: string) {
    if (menu.url) {
      window.location.href = menu.url;
    }
  }

  private loadNotifications() {
    // Simulated notification loading
    this.unreadMessages = 3;
    this.unreadNotifications = [
      {
        notificationMessageId: {
          subject: 'Dashboard Published',
          message: 'Your dashboard "Sales Report" has been successfully published.'
        }
      },
      {
        notificationMessageId: {
          subject: 'Data Source Updated',
          message: 'The connection to your MySQL database has been refreshed.'
        }
      },
      {
        notificationMessageId: {
          subject: 'New Template Available',
          message: 'A new dashboard template "Financial Overview" is now available.'
        }
      }
    ];
  }

  getUserInitials(): string {
    if (this.authInfo?.user?.userName) {
      return this.authInfo.user.userName.charAt(0).toUpperCase();
    }
    return 'U';
  }

  get currentTheme(): string {
    return document.body.getAttribute('data-theme') || 'light';
  }

  get isDarkMode(): boolean {
    return this.currentTheme === 'dark';
  }
}