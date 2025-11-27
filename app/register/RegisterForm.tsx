"use client"

import { useState } from "react"
import { Heading } from "../components/Heading"
import { Inputs } from "../components/inputs/Inputs"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../components/Button"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"


const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
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
                title="Register Now"
            />
            <Button outline
                label="Sign up with Google"
                icon={AiOutlineGoogle}
                onClick={() => {}}
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
            <Button label={isLoading ? "Loading" : "Register"} onClick={handleSubmit(onsubmit)} />

            <p className="text-sm">
                Already have an account ? <Link href={'/login'} className="text-slate-700 font-semibold underline">
                    Login
                </Link>
            </p>
        </>
    )
}

export default RegisterForm