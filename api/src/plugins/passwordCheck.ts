/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeWrapResolversPlugin } from "graphile-utils";
import * as crypto from "crypto";
import axios from "axios";

async function checkPasswordHaveIBeenPwned(password: string) {
  // https://haveibeenpwned.com/API/v3#PwnedPasswords
  const hash = crypto
    .createHash("sha1")
    .update(password)
    .digest("hex")
    .toUpperCase();
  const hash_range = hash.substring(0, 5);
  const hash_suffix = hash.substring(5);
  const res = await axios.get(
    `https://api.pwnedpasswords.com/range/${hash_range}`,
    {
      validateStatus: (status: number) => status === 200,
      maxRedirects: 0,
      timeout: 5000,
    }
  );
  if (res.data.indexOf(hash_suffix) != -1) {
    throw Error(
      "This password has appeared in a data breach before, please choose a different one."
    );
  }
}

const wrapper = {
  async resolve(
    resolve: any,
    source: any,
    args: any,
    context: any,
    info: any
  ): Promise<any> {
    await checkPasswordHaveIBeenPwned(args.input.password);
    const result = await resolve(source, args, context, info);
    return result;
  },
};

export default makeWrapResolversPlugin({
  Mutation: {
    register: wrapper,
    registerWithToken: wrapper,
    registerWithPassword: wrapper,
  },
});
