import { Types } from 'mongoose';

export type TSemesterRegistration = {
  academicSemester: Types.ObjectId;
  status: 'UPCOMING' | 'ONGOING' | 'ENDED';
  starDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};
