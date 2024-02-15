import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./customErrorReporter";

vine.errorReporter = () => new CustomErrorReporter();

const registerSchema = vine.object({
  name: vine.string().minLength(2).maxLength(140),
  username: vine.string().minLength(2).maxLength(40),
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(32).confirmed(),
});

export const RegisterValidator = vine.compile(registerSchema);

const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(32),
});

export const LoginValidator = vine.compile(loginSchema);
