import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");

/**
 * Fonction return month
 * @returns Months [Janvier, février, etc...]
 */
export const getMonth = (date: string | Date | dayjs.ConfigType = dayjs()) => {
  return dayjs(date).locale("fr").format("MMMM").toUpperCase();
};

/**
 *
 * @param date
 * @param format default Fr format
 * @returns default format DD/MM/YYYY
 */
export const formatDate = (
  date: string | Date,
  format: string = "DD/MM/YYYY"
) => {
  return dayjs(date).format(format);
};

export const toDay = () => {
  return dayjs().toDate();
};
