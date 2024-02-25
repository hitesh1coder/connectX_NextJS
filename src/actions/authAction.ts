"use server";
import { LoginValidator, RegisterValidator } from "@/validations/authSchema";
import { errors } from "@vinejs/vine";
import { createClient } from "@/lib/supabase/supabasServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerAction(formdata: FormData) {
  const supabase = createClient(cookies());

  try {
    const data = {
      name: formdata.get("name"),
      username: formdata.get("username"),
      email: formdata.get("email"),
      password: formdata.get("password"),
      password_confirmation: formdata.get("password_confirmation"),
    };
    const payload = await RegisterValidator.validate(data);
    console.log("payload", payload);
    //    check if user already exists
    const { data: userdata, error: error } = await supabase
      .from("users")
      .select("id")
      .eq("username", payload.username);
    if (userdata && userdata.length > 0) {
      return { status: 400, errors: { username: "user already exists" } };
    }
    const { error: signupError } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          name: payload.name,
          username: payload.username,
        },
      },
    });
    if (signupError) {
      return { status: 400, error: { email: signupError.message } };
    }

    await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return { status: 400, errors: error.messages };
    }
  }
  return redirect("/");
}

export async function loginAction(prevstate: any, formdata: FormData) {
  const supabase = createClient(cookies());
  try {
    const data = {
      email: formdata.get("email"),
      password: formdata.get("password"),
    };
    const payload = await LoginValidator.validate(data);
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
    if (loginError) {
      return { status: 400, error: { email: loginError.message } };
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return { status: 400, errors: error.messages };
    }
  }
  redirect("/");
}
