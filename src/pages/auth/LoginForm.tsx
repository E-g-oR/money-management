import { FC, useCallback } from "react";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ROUTES } from "@/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

export interface Auth {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const form = useForm<Auth>();

  const onSubmit = useCallback((data: Auth) => {
    console.log(data);
  }, []);
  return (
    <>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Authorise in money-management.io</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={"flex flex-col gap-3"}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={"exmple@mail.com"}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={"exmple@mail.com"}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type={"submit"}>Log in</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>
          Don't have an account? You can register{" "}
          <Link
            to={ROUTES.auth.register.path}
            className="underline underline-offset-2"
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
