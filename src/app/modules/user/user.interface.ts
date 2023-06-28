export type IUser = {
  password: string;
  role: "buyer" | "seller";
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};

export type IUserFilter = {
  searchTerm?: string;
  phoneNumber?: string;
  address?: string;
};
