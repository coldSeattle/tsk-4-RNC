import {UserNumberID, ObjectNumberID} from '../alias-types';

export type MessageItem = {
  userId: UserNumberID;
  id: ObjectNumberID;
  value: string;
  title: string;
  completed: boolean;
};
