type SuccessResult<T> = {
  success: true;
  data: T;
};

type ErrorResult = {
  success: false;
  message: string;
};

export type Result<T> = SuccessResult<T> | ErrorResult;
