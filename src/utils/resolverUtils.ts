import config from 'config';

const ticketStatusList: Array<string> = config.get('ticketStatusList');

export function validateTicketStatus(ticketStatus: string): boolean {
  return ticketStatusList.includes(ticketStatus);
}
