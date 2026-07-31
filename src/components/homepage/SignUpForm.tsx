"use client";

import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthService } from "@/services/auth.service";
const formSchema = z.object({
  name: z.string().min(1, "Please enter your password."),
  email: z.email("Please enter a valid email."),
  password: z.string().min(1, "Please enter your password."),
});

const authService = new AuthService();

export default function SignupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await authService.signup({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return (
    <div className="flex items-center justify-center px-6 py-8 relative">
      <Card className="w-full max-w-[420px] bg-[#08000ebf] border border-[#801b34] rounded-[18px] p-7">
        <CardHeader>
          <CardTitle className="text-center font-bold text-md  text-[#f0c0cc]">
            SIGN UP
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="flex flex-col gap-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col gap-1"
                  >
                    <FieldLabel className="text-[#dc96aaa6]">
                      Username
                    </FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="alessandra"
                      autoComplete="off"
                      className="bg-black/45 border-[#a0284659] text-[#f0d0dc] rounded-lg "
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col gap-1"
                  >
                    <FieldLabel className="text-[#dc96aaa6]">Email</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="aless@example.com"
                      autoComplete="off"
                      className="bg-black/45 border-[#a0284659] text-[#f0d0dc] rounded-lg "
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col gap-1"
                  >
                    <FieldLabel className="  text-[#d1889da6]">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      autoComplete="off"
                      className="bg-black/45 border-[#a0284659] text-[#f0d0dc] rounded-lg"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            type="submit"
            form="form-login"
            className="w-full bg-gradient-to-br from-[#c02050] to-[#7a1060] font-bold text-[#ffe0ea] rounded-lg"
          >
            Sign Up
          </Button>

          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px text-[#4e0e19]" />
            <span className="font-raleway text-sm text-[#ffe0ea]">OR</span>
            <div className="flex-1 h-px text-[#4e0e19]" />
          </div>

          <p className="text-center text-sm text-[#ffe0ea] mt-2">
            Already have an account?{" "}
            <p className="bg-transparent border-none text-[#f0a0b8] font-raleway underline">
              <Link
                to={{
                  pathname: "/",
                }}
              >
                Login
              </Link>
            </p>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
