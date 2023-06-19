"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const order_model_1 = require("./order.model");
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    let newData = {};
    const { buyer, cow: cows } = order;
    const user = yield user_model_1.User.findOne({ _id: buyer });
    const cow = yield cow_model_1.Cow.findOne({ _id: cows });
    if (user && cow && (user === null || user === void 0 ? void 0 : user.budget) >= (cow === null || cow === void 0 ? void 0 : cow.price)) {
        yield user_model_1.User.updateOne({ _id: buyer }, { $inc: { budget: -Number(cow === null || cow === void 0 ? void 0 : cow.price) } });
        yield cow_model_1.Cow.updateOne({ _id: cow.seller }, {
            $inc: { income: Number(cow === null || cow === void 0 ? void 0 : cow.price) },
        });
        yield cow_model_1.Cow.updateOne({ _id: cows }, {
            $set: {
                label: "sold-out",
            },
        });
        newData = {
            seller: cow === null || cow === void 0 ? void 0 : cow.seller,
            buyer: buyer,
            cow: cows,
        };
    }
    else {
        throw new Error("Insufficient Balance");
    }
    const result = yield order_model_1.Order.create(newData);
    return result;
});
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    return getOrders;
});
exports.OrderService = {
    createOrder,
    getOrders,
};
