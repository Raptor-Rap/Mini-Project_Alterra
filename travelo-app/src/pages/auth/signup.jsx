import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-toastify";
import "../../styles/auth/auth.css";

import { Input } from "../../components/input";
import { userRegister } from "../../utils/apis/auth/api";
import Button from "../../components/button";

const registerSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(6, { message: "Password is required" }),
    repassword: z.string().min(6, { message: "Retype password is required" }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords don't match",
    path: ["repassword"],
  });

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  async function handleSignUp(data) {
    try {
      const result = await userRegister(data);
      toast.success(result.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="signup template d-flex justify-content-center align-items-center vh-100">
      <div className="form_container p-5 rounded bg-white">
        <form aria-label="form-signup" onSubmit={handleSubmit(handleSignUp)}>
          <h3 className="text-center">Sign Up</h3>
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
          <Input
            id="input-repassword"
            aria-label="input-repassword"
            label="Retype Password"
            name="repassword"
            register={register}
            error={errors.repassword?.message}
            type="password"
          />
          <Button
            aria-label="btn-submit"
            label="Sign Up"
            type="submit"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
          />
          <p className="text-center mt-3">
            Already have account?
            <Link to="/login" className="ms-2">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
