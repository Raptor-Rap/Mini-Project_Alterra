import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import React from "react";
import * as z from "zod";
import "../../styles/auth/auth.css";

import { Input } from "../../components/input";
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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function handleLogin(data) {
    try {
      const result = await userLogin(data);
      changeToken(JSON.stringify(result.payload));
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
      <div className="form_container p-5 rounded bg-white">
        <form onSubmit={handleSubmit(handleLogin)}>
          <h3 className="text-center">Sign In</h3>
          <Input
            id="input-username"
            aria-label="input-username"
            label="Username"
            name="username"
            register={register}
            error={errors.username?.message}
          />
          <Input
            id="input-password"
            aria-label="input-password"
            label="Password"
            name="password"
            register={register}
            error={errors.password?.message}
            type="password"
          />
          <div className="mb-2">
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
            />
            <label htmlFor="check" className="custom-input-label ms-2">
              Remember me
            </label>
          </div>
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
