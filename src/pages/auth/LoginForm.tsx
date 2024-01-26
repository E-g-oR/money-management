import { FC, useEffect } from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Api } from "@/api";
import { ROUTES } from "@/router";
import { Auth } from "@/types/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRequestTrigger } from "@/hooks/useRequest";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginForm: FC = () => {
  const form = useForm<Auth>();
  const navigate = useNavigate();
  const { run: login, isLoading, data } = useRequestTrigger(Api.logIn);

  // TODO: вынести логику редиректа по авторизации в общую обертку приложения
  useEffect(() => {
    if (data) {
      navigate(ROUTES.home.path);
    }
  }, [data, navigate]);

  return (
    <>
      <CardHeader>
        {/* TODO: использовать словарь перевода */}
        <CardTitle>Login</CardTitle>
        <CardDescription>Authorise in money-management.io</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(login)}
            className={"flex flex-col gap-3"}
          >
            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type={"email"}
                      placeholder={"exmple@mail.com"}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"password"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={"password"}
                      placeholder={"exmple@mail.com"}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type={"submit"} isLoading={isLoading}>
              Log in
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>
          Don't have an account? You can register{" "}
          <Link
            to={ROUTES.auth.register.path}
            className={"underline underline-offset-2"}
          >
            here
          </Link>
          .
        </p>
      </CardFooter>
    </>
  );
};

export default LoginForm;
