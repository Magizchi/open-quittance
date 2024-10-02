import dayjs from 'dayjs';
import { writable, type Writable } from 'svelte/store';

export interface Toast {
    [x: string]: string | null | boolean | number | unknown;
}

// Liste des notifications
export const listNotification: Writable<Toast[]> = writable([]);
// CRUD notification

export const createNotification = (notification: Toast, delay: number = 5000, id: string = dayjs().unix().toString(),) => {
    listNotification.update(($listNotification) => [{ id, ...notification, }, ...$listNotification]);

    setTimeout(() => {
        deleteNotification({ id, ...notification });
    }, delay);
};

export const delayNotification = () => { };
export const readNotification = () => { };
export const updateNotification = () => { };

export const deleteNotification = (notification: Toast) => {
    listNotification.update(($listNotification) => $listNotification.filter(item => item.id !== notification.id));
};