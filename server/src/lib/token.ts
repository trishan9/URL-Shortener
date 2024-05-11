import jwt from "jsonwebtoken";
import config from "../config";

type GenerateOptions = {
  payload: string | object | Buffer;
  type: "access" | "refresh" | "passwordReset";
};

type VerifyOptions = {
  token: string;
  type: GenerateOptions["type"];
};

const selectType = (type: GenerateOptions["type"]) => {
  if (type === "access") {
    return {
      secret: config.jwt.secret ?? "",
      expiresIn: config.jwt.accessToken.expiresIn || "1d",
    };
  }
  return {
    secret: config.jwt.secret ?? "",
    expiresIn: config.jwt.refreshToken.expiresIn || "1y",
  };
};

const generate = ({ payload, type }: GenerateOptions): string => {
  const { expiresIn, secret } = selectType(type);

  return jwt.sign(payload, secret, {
    expiresIn,
    algorithm: "HS256",
    subject: type
  });
};

const verify = ({ token, type }: VerifyOptions): string | jwt.JwtPayload => {
  const { secret } = selectType(type);

  return jwt.verify(token, secret, {
    algorithms: ["HS256"],
    subject: type
  });
};

export default { generate, verify };
