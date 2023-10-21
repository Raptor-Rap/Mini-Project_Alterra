import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import React from "react";
import * as z from "zod";
import "../../styles/auth/auth.css";

import { Input, Checkbox } from "../../components/input";
import { useToken } from "../../utils/contexts/token";
import Swal from "../../utils/swal";
import { userLogin } from "../../utils/apis/auth/api";
import Button from "../../components/button";

const schema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function Login() {
  const { changeToken } = useToken();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      const user = JSON.parse(rememberedUser);
      setValue("username", user.username);
      setValue("password", user.password);
      setValue("remember", true);
    }
  }, [setValue]);

  async function handleLogin(data) {
    try {
      const result = await userLogin(data);
      changeToken(JSON.stringify(result.payload));

      if (getValues("remember")) {
        localStorage.setItem("rememberedUser", JSON.stringify(data));
      } else {
        localStorage.removeItem("rememberedUser");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        showCancelButton: false,
      });
    }
  }

  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100">
      <div className="form_container p-5 rounded">
        <form onSubmit={handleSubmit(handleLogin)}>
          <h3 className="text-center">Sign In</h3>
          <Input
            aria-label="input-username"
            label="Username"
            name="username"
            register={register}
            error={errors.username?.message}
          />
          <Input
            aria-label="input-password"
            label="Password"
            name="password"
            register={register}
            error={errors.password?.message}
            type="password"
          />
          <Checkbox
            aria-label="remember"
            label="Remember me"
            name="remember"
            register={register}
          />
          <div className="d-grid">
            <Button
              aria-label="btn-submit"
              label="Submit"
              type="submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            />
          </div>
          <p className="text-center mt-3">
            Don't have account yet?
            <Link to="/signup" className="ms-2">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
