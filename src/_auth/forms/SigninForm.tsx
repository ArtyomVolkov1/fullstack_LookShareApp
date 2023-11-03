import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SigninSchema } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/customHook";

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync: signInAccount } = useSignInAccount();
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninSchema>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({ title: "Упс... похоже вы не зарегистрированы " });
    }
    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      toast({ title: "Не получилось. Попробуйте еще раз!" });
      return;
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <h2 className=" flex-center h3-bold text-center">
          <img
            className="float-left "
            src="./assets/images/logo-ls.svg"
            alt="logo"
          />
          L&S
        </h2>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-5">
          Войдите в ваш аккаунт
        </h2>
        <p className="text-light-3 text-center small-medium md:base-regular mt-2">
          Добро пожаловать в L&S введите ваши данные
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-11/12 mt-4"
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
                    className="shad-input"
                    placeholder="ваш email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="shad-input"
                    placeholder="ваш пароль"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Загрузка...
              </div>
            ) : (
              "Войти"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Нет аккаунта? Ошибка!
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Не зарегистрировался? Фатальная ошибка!
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
