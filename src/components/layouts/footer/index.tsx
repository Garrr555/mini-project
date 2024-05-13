import Image from "next/image";

export default function Footer(){
    return(
       <div className="xl:w-[1798px] lg:w-[1450px] md:w-[1450px] sm:w-[950px] md:h-[230px] sm:h-[500px] bg-white md:flex justify-center mx-auto">
         <div className="sm:pl-0 md:pl-40 md:flex sm:flex-none mx-auto bg-white xl:w-full lg:w-[1450px] md:w-[1450px] sm:w-[1450px]  md:justify-between sm:justify-center items-center pb-10">
            <div className="sm:flex sm:justify-center sm:py-3">
            <div className="sm:w-[313px]">
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
            </div>
           

            <div className="sm:flex sm:justify-center ">
            <div className="sm:w-[313px] sm:ml-16">
                <p className="text-2xl mb-2 sm:pt-3 ">SERVICE</p>
                <p className="text-[#434343] text-lg">3d Model</p>
                <p className="text-[#434343] text-lg">Contact Us</p>
            </div>
            </div>
            
            <div className="sm:flex sm:justify-center">
            <div className="sm:w-[313px] sm:ml-16">
                <p className="text-2xl mb-2 sm:pt-3">SUPPORT</p>
                <p className="text-[#434343] text-lg">About Supply3dArsitek.com</p>
                <p className="text-[#434343] text-lg">Privacy policy & terms</p>
            </div>
            </div>
           


            <div className="sm:flex sm:justify-center">
            <div className="sm:py-3 sm:w-[313px] sm:ml-16">
                <p className="text-2xl mb-2">FOLLOW US ON</p>
                <p className="text-[#434343] text-lg">Instagram</p>
                <p className="text-[#434343] text-lg">Facebook</p>
            </div>
            </div>
            
        </div>
       </div>
    )
}