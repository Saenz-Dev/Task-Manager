import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationService } from '../../services/notification.service';

@Component({
    standalone: true,
    selector: 'app-notification',
    imports: [CommonModule],
    template: `
    <section class="notification-host" aria-live="polite" aria-atomic="true">
      @for (notification of notificationService.notifications(); track notification.id) {
        <article class="notification" [ngClass]="notification.type">
          <span>{{ notification.message }}</span>
          <button type="button" class="close-btn" (click)="notificationService.remove(notification.id)">×</button>
        </article>
      }
    </section>
  `,
    styles: `
    .notification-host {
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 1100;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 360px;
      width: calc(100% - 32px);
      pointer-events: none;
    }

    .notification {
      pointer-events: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 10px;
      color: #fff;
      font-weight: 500;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);
      animation: enter 220ms ease-out;
      min-height: 40px;
    }

    .notification.success {
      background: #3f8f45;
    }

    .notification.error {
      background: #cc3f3f;
    }

    .notification.info {
      background: #2f7ec1;
    }

    .notification.warning {
      background: #b37b1f;
    }

    .close-btn {
      border: 0;
      background: transparent;
      color: #fff;
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
      line-height: 1;
      padding: 2px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn:hover {
      opacity: 0.8;
    }

    @keyframes enter {
      from {
        transform: translateY(-8px) translateX(16px);
        opacity: 0;
      }
      to {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
    }

    @media (max-width: 640px) {
      .notification-host {
        left: 16px;
        right: 16px;
        max-width: unset;
        width: auto;
      }
    }
  `
})
export class NotificationComponent {
    protected notificationService = inject(NotificationService);
}
