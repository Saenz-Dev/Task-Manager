import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface AppNotification {
  id: number;
  message: string;
  type: NotificationType;
  durationMs: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications = signal<AppNotification[]>([]);

  show(message: string, type: NotificationType = 'info', durationMs = 3500): void {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const notification: AppNotification = { id, message, type, durationMs };

    this.notifications.update(items => [...items, notification]);

    setTimeout(() => {
      this.remove(id);
    }, durationMs);
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  warning(message: string): void {
    this.show(message, 'warning');
  }

  remove(id: number): void {
    this.notifications.update(items => items.filter(item => item.id !== id));
  }
}
