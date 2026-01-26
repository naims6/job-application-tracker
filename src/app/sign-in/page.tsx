"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth/auth.client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface SignInInput {
  email: string;
  password: string;
}

export default function SignIn() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>();

  const onSubmit: SubmitHandler<SignInInput> = async (d) => {
    setError("");

    const { email, password } = d;
    try {
      const { data, error } = await signIn.email({
        email,
        password,
      });
      console.log({ data, error });
      // if error
      if (error) {
        setError(error.message ?? "Failed to sign in");
      } else {
        router.push("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white">
      <Card className="w-full max-w-md border-gray-200 shadow-lg mx-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-black">
            Sign In
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="space-y-4">
            {/* error message  */}
            {error && <p className="text-red-500">{error}</p>}
            {/* email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required." })}
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
              {errors.email && (
                <p className="text-red-500 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
              {errors.password && (
                <p className="text-red-500 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>
          {/* footer */}
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logining..." : "Sign In"}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-primary hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
