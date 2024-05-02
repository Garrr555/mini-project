
import LoginPage from "@/pages/auth/login";
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image";

const Navbar = () => {

    const {data} = useSession()

    return(
        <div className="flex bg-[#FBFAFF] w-[1798px] mx-auto justify-between items-center border-x border-t border-gray-200 shadow-lg pb-3">
            <div className="gambar flex items-center gap-0">
                <div className="-ml-5">
                <Image
            className="mx-auto"
            src={"/furnitur.png"}
            height={101}
            width={136}
            alt=""
          ></Image>
                </div>

          <p className="-ml-8 text-[#97404C] text-2xl font-semibold">Furniturpedia</p>
            </div>

          <div className="search w-[390px] h-[50px] rounded-full bg-white border border-[#D1D2E2] flex justify-center items-center">
            <div className="w-[316px] rounded-l-full ">
                <input type="text" placeholder="Search..." className="mx-2 px-3 focus:outline-none w-[300px]"/>
            </div>
            <div className="w-[74px] h-full rounded-r-full bg-[#F2F3F9] hover:bg-gray-200 transition duration-300 ease-in-out border-l border-[#D1D2E2] flex items-center cursor-pointer">
            <Image
            className="mx-auto "
            src={"/Group.png"}
            height={27}
            width={26}
            alt=""
          ></Image>
            </div>
              
          </div>

          <div className={`px-5 py-2 mx-3 border rounded-full h-[40px] flex items-center ${data ? `bg-[#E42C14]` : `bg-green-600`}`}>
          <button className={`text-lg text-white font-semibold`} onClick={() => (data ? signOut() : signIn())}>{data ? 'Logout' : 'Login'}</button>
          </div>
        </div>
       
    )
}

export default Navbar;