import { z } from 'zod';

const CreateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name must be at least 1 character long' })
    .max(20, { message: 'First name cannot exceed 20 characters' }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last name must be at least 1 character long' }),
});

const CreateGuardianValidationSchema = z.object({
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

const CreateLocalGuardianValidationSchema = z.object({
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

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: CreateUserNameValidationSchema,
      gender: GenderEnum,
      dateOfBirth: z.string().optional(), // Ensure dateOfBirth is always a string and not optional
      email: z.string().email({ message: 'Invalid email address' }),
      contactNo: z.string().min(1, { message: 'Contact number is required' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' }),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' }),
      guardian: CreateGuardianValidationSchema,
      localGuardian: CreateLocalGuardianValidationSchema,
      profileImg: z.string().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

// updated schema
const UpdateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name must be at least 1 character long' })
    .max(20, { message: 'First name cannot exceed 20 characters' })
    .optional(), // Make firstName optional
  middleName: z.string().optional(), // Make middleName optional
  lastName: z
    .string()
    .min(1, { message: 'Last name must be at least 1 character long' })
    .optional(), // Make lastName optional
});

const UpdateGuardianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(1, { message: 'Father name is required' })
    .optional(), // Make fatherName optional
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father occupation is required' })
    .optional(), // Make fatherOccupation optional
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father contact number is required' })
    .optional(), // Make fatherContactNo optional
  motherName: z
    .string()
    .min(1, { message: 'Mother name is required' })
    .optional(), // Make motherName optional
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother occupation is required' })
    .optional(), // Make motherOccupation optional
  motherContactNo: z
    .string()
    .min(1, { message: 'Mother contact number is required' })
    .optional(), // Make motherContactNo optional
});

const UpdateLocalGuardianValidationSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Local guardian name is required' })
    .optional(), // Make name optional
  occupation: z
    .string()
    .min(1, { message: 'Local guardian occupation is required' })
    .optional(), // Make occupation optional
  contactNo: z
    .string()
    .min(1, { message: 'Local guardian contact number is required' })
    .optional(), // Make contactNo optional
  address: z
    .string()
    .min(1, { message: 'Local guardian address is required' })
    .optional(), // Make address optional
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: UpdateUserNameValidationSchema.optional(), // Make name optional
      gender: GenderEnum.optional(), // Make gender optional
      dateOfBirth: z.string().optional(), // Make dateOfBirth optional
      email: z.string().email({ message: 'Invalid email address' }).optional(), // Make email optional
      contactNo: z
        .string()
        .min(1, { message: 'Contact number is required' })
        .optional(), // Make contactNo optional
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' })
        .optional(), // Make emergencyContactNo optional
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(), // Make bloodGroup optional
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' })
        .optional(), // Make presentAddress optional
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' })
        .optional(), // Make permanentAddress optional
      guardian: UpdateGuardianValidationSchema.optional(), // Make guardian optional
      localGuardian: UpdateLocalGuardianValidationSchema.optional(), // Make localGuardian optional
      profileImg: z.string().optional(), // Make profileImg optional
      admissionSemester: z.string().optional(), // Make admissionSemester optional
      academicDepartment: z.string().optional(), // Make academicDepartment optional
    }),
  }),
});
export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
