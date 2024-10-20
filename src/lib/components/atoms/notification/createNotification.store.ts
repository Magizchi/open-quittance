import { writable, type Writable } from "svelte/store";

type notificationType = "default" | "success" | "warning" | "info" | "alert";

export const NOTIFICATIONS = {
  default: "default",
  success: "success",
  warning: "warning",
  alert: "alert",
  info: "info",
} as const;

export interface Toast {
  id: number;
  message: string;
  timeout: number;
  type: notificationType;
}

export const notifications: Writable<Toast[]> = writable([]);

const createNotification = () => {
  const id = Math.floor(Math.random() * 10000);
  const send = (
    message: string,
    type: notificationType,
    timeout: number = 5000
  ) => {
    notifications.update(($notifications) => [
      { id, type, message, timeout },
      ...$notifications,
    ]);

    setTimeout(() => {
      deleteNotification({ id, message, type, timeout });
    }, timeout);
  };

  return {
    default: (msg: string, timeout: number) => send(msg, "default", timeout),
    success: (msg: string, timeout: number) => send(msg, "success", timeout),
    warning: (msg: string, timeout: number) => send(msg, "warning", timeout),
    alert: (msg: string, timeout: number) => send(msg, "alert", timeout),
    info: (msg: string, timeout: number) => send(msg, "info", timeout),
  };
};

export const deleteNotification = (notification: Toast) => {
  notifications.update(($notifications) =>
    $notifications.filter((item) => item.id !== notification.id)
  );
};

export const addToast = createNotification();
