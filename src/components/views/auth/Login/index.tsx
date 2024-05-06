import Link from "next/link";
import React, { useState } from 'react';
import { useRouter } from "next/router";
import { FormEvent } from 'react';
import Image from "next/image";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";

export default function LoginView(){

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const {push, query} = useRouter();
    const callbackUrl: any = query.callbackUrl || '/';
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        const form = event.target as HTMLFormElement;
       try {
        const res = await signIn("credentials", {
            redirect: false,
            email: form.email.value,
            password: form.password.value,
            callbackUrl
        })

        if(!res?.error){           //autentikasi error
            setIsLoading(false);
            form.reset();
            push(callbackUrl);
        }
        else{
            setIsLoading(false);
            setError("Email or password is incorrect else")
        }
       }
       catch(error){
        setIsLoading(false);
        setError("Email or password is incorrect catch")
       }
    }

    return(
        <div>
                <Image
            className="mx-auto"
            src={"/Saly-10.png"}
            height={183}
            width={183}
            alt=""
          ></Image>
             <h1 className="text-4xl font-bold mb-8 mt-24">Login</h1>
             {error && <div className="text-red-500">{error}</div>}
        <div>
            <form onSubmit={handleSubmit} className="">
                <Input label="email" name="email" type="email" gap="gap-7"/>

                <Input label="password" name="password" type="password" gap=""/>

                <button type="submit" className="mt-6 p-1 rounded-full w-[319px] h-[63px] bg-[#E42C14] hover:bg-opacity-80 transition duration-300 ease-in-out text-[#F5F4F2] font-bold text-xl">
                {isLoading ? 'Loading...' : 'LOGIN'}
                </button>
            </form>

            <p className="text-[#8F8F8F] text-sm h-[43px] flex items-center justify-center">Or login with</p>

            <div className="flex justify-center w-[158px] mx-auto gap-4">
            <Image
            className="mx-auto border border-[#E9E9E9]  rounded-full p-2 hover:grayscale transition duration-300 ease-in-out"
            src={"/images.png"}
            height={56}
            width={56}
            alt=""
          ></Image>

<Image
            className="mx-auto border border-[#E9E9E9] rounded-full p-2 hover:grayscale transition duration-300 ease-in-out"
            src={"/facebook.png"}
            height={56}
            width={56}
            alt=""
          ></Image>
            </div>

            <p className="mt-8">{"Don't have an account yet?"} <Link href="/auth/register"> <i className="text-[#0E8BF1] ">Sign Up</i></Link>  </p>
        </div>
        </div>
        
    )
}

