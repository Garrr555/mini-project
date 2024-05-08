import Image from "next/image";

export default function Footer(){
    return(
       <div className="lg:w-[1450px] md:w-[1450px] sm:w-[950px] bg-white flex justify-center">
         <div className="flex bg-white xl:w-full lg:w-[1450px] md:w-[1450px] sm:w-[950px] justify-between items-center pb-10">
            <div className="sm:pl-0 pl-40">
            <div className="flex items-center gap-0">
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

            <p className="w-[313px] pl-8 text-2xl mt-2">Berbagai kebutuhan interior rumah anda</p>
            </div>

            <div>
                <p className="text-2xl mb-2">SERVICE</p>
                <p className="text-[#434343] text-lg">3d Model</p>
                <p className="text-[#434343] text-lg">Contact Us</p>
            </div>
            <div>
                <p className="text-2xl mb-2">SUPPORT</p>
                <p className="text-[#434343] text-lg">About Supply3dArsitek.com</p>
                <p className="text-[#434343] text-lg">Privacy policy & terms</p>
            </div>
            <div className="sm:pr-0 pr-56">
                <p className="text-2xl mb-2">FOLLOW US ON</p>
                <p className="text-[#434343] text-lg">Instagram</p>
                <p className="text-[#434343] text-lg">Facebook</p>
            </div>
        </div>
       </div>
    )
}