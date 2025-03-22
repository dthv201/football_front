import {format} from 'date-fns';

const parseExpirationInDays = (expiration: string) => {
  const match = expiration.match(/(\d+)([smhd])/);
  if (!match) return 0;

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 'm':
      return value / 1440;
    case 'h':
      return value / 24;
    case 'd':
      return value;
    default:
      return 0;
  }
};

const formatDate = (dateString?: string) => (dateString ? format(dateString, 'MMMM dd, yyyy. HH:mm') : '');

export {parseExpirationInDays, formatDate};
