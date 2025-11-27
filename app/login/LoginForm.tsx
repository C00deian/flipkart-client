"use client"

import { useState } from "react"
import { Heading } from "../components/Heading"
import { Inputs } from "../components/inputs/Inputs"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../components/Button"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"


const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onsubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        console.log(data);
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