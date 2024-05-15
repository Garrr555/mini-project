import RegisterView from "@/components/views/auth/Register";
import "../../app/globals.css";
import Image from "next/image";

export default function RegisterPage () {
    return(
        <div className="" > 
            <div className="pt-32 flex justify-end items-center w-[1798px] h-[1041px] mx-auto " >
                <div className="w-2/3 h-full bg-no-repeat bg-cover relative" style={{ backgroundImage: `url('/register.png')` }}>
                <div className="w-[554px] h-[355px] bg-transparent left-[72px] top-[450px] absolute">
                    <div className="absolute bottom-0 left-5">
                    <div>
                    <Image
            className=""
            src={"/berbagai.png"}
            height={455}
            width={432}
            alt=""
          ></Image>
                    </div>
                    <div className="flex items-center">
                    <Image
            className=""
            src={"/furnitur.png"}
            height={155}
            width={132}
            alt=""
          ></Image>
          <p className="italic text-white text-2xl">furniturpedia.com</p>
                    </div>
                    </div>
                </div>
                </div>
                
                <div className="regiter text-center bg-white h-full w-1/3">
                <RegisterView/>
                </div>
            </div>
        </div>
    )
}