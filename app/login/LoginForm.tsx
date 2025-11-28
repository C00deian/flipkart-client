"use client"

import {useEffect, useState } from "react"
import { Heading } from "../components/Heading"
import { Inputs } from "../components/inputs/Inputs"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../components/Button"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"
import { loginUser } from "../services/auth.service"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { User } from "../types/User"

interface LogniFormProps {
    currentUser: User
    refresh: () => void;
}

const LoginForm : React.FC<LogniFormProps> = ({currentUser, refresh}) => {

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

   const router = useRouter();

useEffect(() => {
    if (currentUser) {
        router.push("/cart");
    }
}, [currentUser]);

    const onsubmit: SubmitHandler<FieldValues> = async(data) => {
        setIsLoading(true)
       try {
          
           const response = await loginUser(data);
       
           const token = response.data.data.token;
       
           localStorage.setItem("token", token);
           refresh();
       
           toast.success(response.data.message || "Logged in");
           router.push("/cart");
       
         } catch (error: any) {
           toast.error(error?.response?.data?.message || "Something went wrong");
         } finally {
           setIsLoading(false);
         }
    }

    if (currentUser) {
        return <p className="text-center">Logged in. Redirecting...</p>
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
                Don't have an account ?
                <Link href={'/register'} className="text-slate-700 font-semibold underline">
                    Register
                </Link>
            </p>
        </>
    )
}

export default LoginForm