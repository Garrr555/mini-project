'use client'

import Image from "next/image";
import { useRouter } from "next/router";

interface Product {
    nama: string;
    gambar: string;
    kategori: string;
    color: number;
    harga: number;
    size: number;
    deskripsi: string;
  }

const ProductsShow: React.FC<Product & {index : number}> = ({nama, gambar, kategori, color, harga, size, deskripsi, index}) => {

    const router = useRouter();

    const handleProductClick = () => {
        router.push({
            pathname: `/product/${index}`,
            query: { nama, gambar, harga, deskripsi, size},
        });
    };

    return(
        
        <div onClick={handleProductClick} className="w-[203.88px] h-[216.18px] bg-white shadow-lg rounded-xl cursor-pointer">
            <div className="h-[174px]">
            <Image
          className=""
          src={`/furnitur/${gambar}.png`}
          height={174}
          width={size}
          alt=""
        ></Image>
            </div>
             

        <div className="flex justify-between px-2 items-center -mt-3">
            <div className="text-lg">{`${nama}`}</div>
            <div className="text-[#269DE0] text-lg">{`Rp${harga.toLocaleString()}`}</div>
        </div>

       

        </div>
    )
}

export default ProductsShow