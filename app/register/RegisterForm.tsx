"use client"

import { useState } from "react"
import { Heading } from "../components/Heading"
import { Inputs } from "../components/inputs/Inputs"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../components/Button"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { loginUser, registerUser } from "../services/auth.service"


const RegisterForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

 const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  setIsLoading(true);

  try {
    const res =  await registerUser(data);
    toast.success( res.data.message || "Account created successfully!");

    const response = await loginUser({
      email: data.email,
      password: data.password,
    });

    const token = response.data.data.token;

    localStorage.setItem("token", token);

    toast.success(response.data.message || "Logged in");

      router.push("/cart");
      router.refresh();
      reset();

  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};


    return (
        <>
            <Heading
                title="Register Now"
            />
            <Button outline
                label="Sign up with Google"
                icon={AiOutlineGoogle}
                onClick={() => { }}
            />
            {/* <hr className="bg-slate-300 w-full h-px" /> */}
            <Inputs
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Inputs
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Inputs
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
            <Button label={isLoading ? "Loading" : "Register"} onClick={handleSubmit(onSubmit)} />

            <p className="text-sm">
                Already have an account ? <Link href={'/login'} className="text-slate-700 font-semibold underline">
                    Login
                </Link>
            </p>
        </>
    )
}

export default RegisterForm