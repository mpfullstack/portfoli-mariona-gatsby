import moment from 'moment';

// NOTE: Need to import locale when new languages is added
import 'moment/locale/es';

export const changeLocale = locale => moment.locale(locale);

export default moment;