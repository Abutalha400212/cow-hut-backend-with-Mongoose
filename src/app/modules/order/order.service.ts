import { ICow } from "../cow/cow.interface";
import { Cow } from "../cow/cow.model";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (order: IOrder) => {
  let newData = {};
  const { buyer, cow: cows } = order;
  const user: IUser | null = await User.findOne({ _id: buyer });
  const cow: ICow | null = await Cow.findOne({ _id: cows });
  if (user && cow && user?.budget >= cow?.price) {
    await User.updateOne(
      { _id: buyer },
      { $inc: { budget: -Number(cow?.price) } }
    );
    await Cow.updateOne(
      { _id: cow.seller },
      {
        $inc: { income: Number(cow?.price) },
      }
    );
    await Cow.updateOne(
      { _id: cows },
      {
        $set: {
          label: "sold-out",
        },
      }
    );
    newData = {
      seller: cow?.seller,
      buyer: buyer,
      cow: cows,
    };
  } else {
    throw new Error("Insufficient Balance");
  }

  const result = await Order.create(newData);
  return result;
};

export const OrderService = {
  createOrder,
};
