import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department  must be provide string',
      required_error: 'Department name must be provided',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Department  must be provide string',
      required_error: 'faculty is required',
    }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department  must be provide string',
        required_error: 'Department name must be provided',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Department  must be provide string',
        required_error: 'faculty is required',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
