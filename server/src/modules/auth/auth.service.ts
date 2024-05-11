import httpStatus from "http-status";

import token from "@/lib/token";
import hash from "@/lib/hash";
import { DecodedToken, TUserSchema } from "./auth.api.schema";
import { CustomError } from "@/utils/custom-error";
import * as UserService from "@/modules/user/user.service";

export const register = async (user: TUserSchema) => {
  const exists = await UserService.getUserByEmail(user.email);
  if (exists) {
    throw new CustomError(httpStatus.BAD_REQUEST, "User with this email address already exists");
  }

  const hashedPassword = await hash.generate(user.password);

  return await UserService.createUser({
    ...user,
    password: hashedPassword,
  });
};

export const login = async (email: string, password: string) => {
  const user = await UserService.getUserByEmail(email);

  if (!user) {
    throw new CustomError(httpStatus.NOT_FOUND, "User with this email address doesn't exist");
  }

  const isPasswordValid = await hash.compare(password, user.password);
  if (!isPasswordValid) {
    throw new CustomError(httpStatus.BAD_REQUEST, "Invalid password");
  }

  const accessToken = token.generate({
    payload: {
      id: user._id,
      role: user.role
    },
    type: "access",
  });

  const refreshToken = token.generate({
    payload: {
      id: user._id,
      role: user.role
    },
    type: "refresh",
  });

  return {
    accessToken,
    refreshToken
  };
};

export const refresh = async (refToken: string) => {
  const isValid = token.verify({
    token: refToken,
    type: "refresh",
  });

  if (!isValid) {
    throw new CustomError(httpStatus.BAD_REQUEST, "Invalid or expired token");
  }

  const tokenPayload = isValid as DecodedToken;

  const accessToken = token.generate({
    payload: {
      id: tokenPayload.id,
      role: tokenPayload.role
    },
    type: "access",
  });

  return { accessToken };
};

export const getMe = async (id: string) => {
  const user = await UserService.getUserById(id);
  if (!user) {
    throw new CustomError(httpStatus.BAD_REQUEST, "User doesn't exists!");
  }

  return user;
};

