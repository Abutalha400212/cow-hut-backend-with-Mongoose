import { IUser } from "./user.interface";
import { User } from "./user.model";
const createUser = async (payload: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(payload);
  if (!createdUser) {
    throw Error("Failed to create user");
  }
  return createdUser;
};
const getAllUsers = async () => {
  const result = await User.find();
  return result;
};
const getSingleUser = async (id: string) => {
  const result = await User.findOne({ _id: id });
  return result;
};
const deleteSingleUser = async (id: string) => {
  const result = await User.deleteOne({ _id: id });
  return result;
};
const updateSingleUser = async (id: string, update: IUser) => {
  const result = await User.updateOne({ _id: id }, update);
  return result;
};
export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
};
