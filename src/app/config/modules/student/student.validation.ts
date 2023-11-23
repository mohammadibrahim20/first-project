import { z } from 'zod';

const UserNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name must be at least 1 character long' })
    .max(20, { message: 'First name cannot exceed 20 characters' }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last name must be at least 1 character long' }),
});

const GuardianSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father name is required' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father occupation is required' }),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father contact number is required' }),
  motherName: z.string().min(1, { message: 'Mother name is required' }),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother occupation is required' }),
  motherContactNo: z
    .string()
    .min(1, { message: 'Mother contact number is required' }),
});

const LocalGuardianSchema = z.object({
  name: z.string().min(1, { message: 'Local guardian name is required' }),
  occupation: z
    .string()
    .min(1, { message: 'Local guardian occupation is required' }),
  contactNo: z
    .string()
    .min(1, { message: 'Local guardian contact number is required' }),
  address: z.string().min(1, { message: 'Local guardian address is required' }),
});

const GenderEnum = z.enum(['female', 'male', 'other']);

const StudentValidatorSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: UserNameSchema,
  gender: GenderEnum,
  dateOfBirth: z.string(), // Ensure dateOfBirth is always a string and not optional
  email: z.string().email({ message: 'Invalid email address' }),
  contactNo: z.string().min(1, { message: 'Contact number is required' }),
  emergencyContactNo: z
    .string()
    .min(1, { message: 'Emergency contact number is required' }),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().min(1, { message: 'Present address is required' }),
  permanentAddress: z
    .string()
    .min(1, { message: 'Permanent address is required' }),
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});

export { StudentValidatorSchema };
