import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { ReturnType } from "./types";

export interface UserJWTPayload extends JWTPayload {
  userId: string;
  username: string;
  isSubscribed: boolean;
}

const key = new TextEncoder().encode(process.env.SECRETKEY);

export const verifyJwt = async (
  token: string,
): Promise<ReturnType<UserJWTPayload>> => {
  const { payload }: { payload: UserJWTPayload } = await jwtVerify(token, key);
  if (!payload.userId) {
    return { data: null, error: "Invalid user" };
  }

  return { data: payload, error: null };
};

export const createJwt = async (payload: UserJWTPayload): Promise<string> => {
  const token = await new SignJWT({
    ...payload,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime("12hr")
    .sign(key);

  return token;
};
