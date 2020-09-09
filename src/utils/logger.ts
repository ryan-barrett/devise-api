import bunyan       from 'bunyan';
import bunyanFormat from 'bunyan-format';

const formatOut = bunyanFormat({ outputMode: 'short' });

export const logger: bunyan = bunyan.createLogger({ name: 'devise-api', stream: formatOut, level: 'info' });
