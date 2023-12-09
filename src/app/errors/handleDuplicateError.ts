import { TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extracted_msg = match && match[1];
  const errorSources = [
    {
      path: '',
      message: `${extracted_msg} is already exist`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate error',
    errorSources: errorSources,
  };
};

export default handleDuplicateError;
