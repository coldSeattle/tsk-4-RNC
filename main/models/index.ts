import {UserNumberID, ObjectNumberID} from '../alias-types';

export type MessageItem = {
  userId: UserNumberID;
  id: ObjectNumberID;
  title: string;
  completed: boolean;
};
