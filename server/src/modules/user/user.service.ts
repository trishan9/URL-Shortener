import httpStatus from "http-status";

import { User } from "@/db/models/user.model";
import { TUserSchema } from "../auth/auth.api.schema";
import { TUpdateUserSchema, TUserQuerySchema } from "./user.api.schema";
import { CustomError } from "@/utils/custom-error";

export const getAllUsers = async (
  {
    page = 1,
    limit = 10,
    sortField = 'name',
    sortOrder = 'desc'
  }: TUserQuerySchema
) => {
  const total = await User.countDocuments();
  const totalPages = Math.ceil(total / limit);

  const users = await User.find({}, "-password -__v")
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ [sortField]: sortOrder });
  return {
    users,
    total,
    totalPages,
    currentPage: page,
    perPage: limit
  };
};

export const getUserById = async (id: string) => {
  return await User.findById(id, "-password -__v");
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const createUser = async (user: TUserSchema) => {
  const { _id, name, email, role } = await User.create(user);
  return {
    _id,
    name,
    email,
    role
  };
};

export const updateUser = async (id: string, user: TUpdateUserSchema) => {
  const exists = await getUserById(id);
  if (!exists) throw new CustomError(httpStatus.BAD_REQUEST, "User with this ID not found");

  return await User.findByIdAndUpdate(id, user).select("-password -__v")
};

export const deleteUser = async (id: string) => {
  const exists = await getUserById(id);
  if (!exists) throw new CustomError(httpStatus.BAD_REQUEST, "User with this ID not found");

  return await User.findByIdAndDelete(id).select("-password -__v")
};