import Link from "next/link";
import React, { useState } from 'react';
import { useRouter } from "next/router";
import { FormEvent } from 'react';

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
             <h1 className="text-3xl font-bold">Register</h1>
             {error && <div className="text-red-500">{error}</div>}
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input name="email" id="email" type="email" className="border border-black rounded-lg my-2"/>
                </div>

                <div>
                    <label htmlFor="fullname">Fullname: </label>
                    <input name="fullname" id="fullname" type="text" className="border border-black rounded-lg my-2"/>
                </div>

                <div>
                    <label htmlFor="phone">Phone: </label>
                    <input name="phone" id="phone" type="text" className="border border-black rounded-lg my-2"/>
                </div>

                <div>
                    <label htmlFor="password">Password: </label>
                    <input name="password" id="password" type="password" className="border border-black rounded-lg my-2"/>
                </div>
                <button type="submit" className="border border-black p-1 rounded-2xl">
                {isLoading ? 'Loading...' : 'Register'}
                </button>
            </form>
            
        </div>

        
        <p>Have an account? <Link href="/auth/login"> <i className="text-cyan-500">Sign in</i></Link>  </p>
        </div>
        
    )
}

