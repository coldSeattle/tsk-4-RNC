import {instance} from './instance';

export const fetchMessagesAPI = async () => await instance.get('/todos/');
