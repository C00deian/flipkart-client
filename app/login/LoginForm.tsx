"use client"

import { useState } from "react"
import { Heading } from "../components/Heading"
import { Inputs } from "../components/inputs/Inputs"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../components/Button"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"
import { loginUser } from "../services/auth.service"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"


const LoginForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit,reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onsubmit: SubmitHandler<FieldValues> = async(data) => {
        setIsLoading(true)
       try {
          
           const response = await loginUser(data);
       
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
    }

    return (
        <>
            <Heading
                title="Sign in to E-Shop"
            />
            <Button outline
                label="Continue with Google"
                icon={AiOutlineGoogle}
                onClick={() => {}}
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
            <Button label={isLoading ? "Loading" : "LogIn"} onClick={handleSubmit(onsubmit)} />

            <p className="text-sm">
                Don't have an account ? <Link href={'/register'} className="text-slate-700 font-semibold underline">
                    Register
                </Link>
            </p>
        </>
    )
}

export default LoginForm