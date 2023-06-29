export type IAdmin = {
  password: string;
  role: "admin";
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
};

export type IAdminFilter = {
  searchTerm?: string;
  phoneNumber?: string;
  address?: string;
};
