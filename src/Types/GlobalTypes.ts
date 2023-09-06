export type IContact = {
  id?: string | null;
  firstName: string;
  lastName: string;
  age: number;
  photo: string | null;
};

export type IPost = {
  id: string | null;
  userID: string;
  title: string;
  body: string;
  image?: string;
};

export type IErrorMessage = {
  isError: boolean;
  message: string | null;
};
