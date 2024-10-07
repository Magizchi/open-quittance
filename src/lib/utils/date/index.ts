import dayjs from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');

/**
 * Fonction return month
 * @returns Months [Janvier, févriér, etc...]
 */
export const getMonth = () => {
    return dayjs().locale('fr').format('MMMM').toUpperCase();
};

/**
 * 
 * @param date 
 * @param format default Fr format
 * @returns formate date
 */
export const formatDate = (date: string | Date, format: string = "DD/MM/YYYY") => {
    return dayjs(date).format(format);
};