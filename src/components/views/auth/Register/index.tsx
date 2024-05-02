import Link from "next/link";
import React, { useState } from 'react';
import { useRouter } from "next/router";
import { FormEvent } from 'react';
import Image from "next/image";

export default function RegisterView(){

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const {push} = useRouter()
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        const form = event.target as HTMLFormElement;
        const data = {
            email: form.email.value,         //masih curiga ini error
            fullname: form.fullname.value,
            phone: form.phone.value,
            password: form.password.value,

        }

        const result = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })

        if (result.status === 200) {
            form.reset();
            setIsLoading(false)
            push("/auth/login")
        }
        else{
            setIsLoading(false);
            setError('Email is already registered')
            console.log('error');
            
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
             <h1 className="text-4xl font-bold mb-8 mt-24">Register</h1>
             {error && <div className="text-red-500">{error}</div>}
        <div>
            <form onSubmit={handleSubmit} className="">
                <div className="mx-auto flex w-[319px] h-[63px] rounded-full justify-end items-center gap-7 bg-[#F5F4F2] my-4">
                    <label htmlFor="email" className="text-[#241C1C]">email </label>
                    <input name="email" id="email" type="email" className="bg-transparent border-none rounded-full text-[#241C1C] py-5 px-6 focus:outline-none"/>
                </div>

                <div className="mx-auto flex w-[319px] h-[63px] rounded-full justify-end items-center bg-[#F5F4F2] my-4">
                    <label htmlFor="fullname" className="text-[#241C1C]">username</label>
                    <input name="fullname" id="fullname" type="text" className="bg-transparent border-none rounded-full text-[#241C1C] py-5 px-6 focus:outline-none"/>
                </div>

                <div className="mx-auto flex w-[319px] h-[63px] rounded-full justify-end items-center gap-5 bg-[#F5F4F2] my-4">
                    <label htmlFor="phone" className="text-[#241C1C]">phone</label>
                    <input name="phone" id="phone" type="text" className="bg-transparent border-none rounded-full text-[#241C1C] py-5 px-6 focus:outline-none"/>
                </div>

                <div className="mx-auto flex w-[319px] h-[63px] rounded-full justify-end items-center  bg-[#F5F4F2] my-4">
                    <label htmlFor="password" className="text-[#241C1C]">password</label>
                    <input name="password" id="password" type="password" className="bg-transparent border-none rounded-full text-[#241C1C] py-5 px-6 focus:outline-none"/>
                </div>
                <button type="submit" className="mt-6 p-1 rounded-full w-[319px] h-[63px] bg-[#E42C14] hover:bg-opacity-80 transition duration-300 ease-in-out text-[#F5F4F2] font-bold text-xl">
                {isLoading ? 'Loading...' : 'REGISTER'}
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

            <p className="mt-8">Already have an account? <Link href="/auth/login"> <i className="text-[#0E8BF1] ">Login</i></Link>  </p>
        </div>
        </div>
        
    )
}

