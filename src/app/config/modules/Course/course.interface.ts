import { Types } from 'mongoose';

export type TPeRequisiteCourse = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourse?: TPeRequisiteCourse[];
  isDeleted?: boolean;
};
