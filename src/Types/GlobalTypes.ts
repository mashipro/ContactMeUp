export type IContact = {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  photo: string | null;
};

export type IErrorMessage = {
  isError: boolean;
  message: string | null;
};
