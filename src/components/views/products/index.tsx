'use client'

import { useRef, useState } from "react";
import ProductsShow from "./products";
import Link from "next/link";

interface Product {
    nama: string;
    gambar: string;
    kategori: any;
    color: number;
    harga: number;
    size: number;
    deskripsi: string;
  }

  const product: Product[] = [
    {
        nama: "Sofa",
        gambar: "1",
        kategori: ["living" , "bed"],
        color: 7,
        harga: 80000,
        deskripsi: "3D model of sofa Available in brown, dark green and white",
        size: 174,
    },
    {
        nama: "Cabinet",
        gambar: "2",
        kategori: ["living", "bed"],
        color: 7,
        harga: 80000,
        deskripsi: "3D model of cabinet Available in brown, dark green and white",
        size: 174,
    },
    {
        nama: "Floor",
        gambar: "3",
        kategori: ["living", "bed", "kitchen", "bath", "other"],
        color: 7,
        harga: 40000,
        deskripsi: "3D model of floor Available in brown, dark green and white",
        size: 174,
    },
    {
        nama: "Grey Sofa",
        gambar: "4",
        kategori: ["living", "bed"],
        color: 8,
        harga: 20000,
        deskripsi: "3D model of grey Sofa Available in brown, dark green and white",
        size: 174,
    },
    {
        nama: "Wood floor",
        gambar: "5",
        kategori: ["living", "bed", "kitchen"],
        color: 7,
        harga: 20000,
        deskripsi: "3D model of wood floor Available in brown, dark green and white",
        size: 174,
    },
    {
        nama: "Shoe rack",
        gambar: "6",
        kategori: ["garage", "other"],
        color: 7,
        harga: 40000,
        deskripsi: "3D model of shoe rack Available in brown, dark green and white",
        size: 174,
    },
    {
        nama: "Chair",
        gambar: "7",
        kategori: ["living", "bed", "other"],
        color: 7,
        harga: 35000,
        deskripsi: "3D model of chair Available in brown, dark green and white",
        size: 174,
    },
    {
        nama: "Table",
        gambar: "8",
        kategori: ["living", "bed", "kitchen", "other"],
        color: 7,
        harga: 85000,
        deskripsi: "3D model of table Available in brown, dark green and white",
        size: 174,
    },
    {
        nama: "Sofa",
        gambar: "9",
        kategori: ["living", "bed"],
        color: 7,
        harga: 100000,
        deskripsi: "3D model of sofa Available in brown, dark green and white",
        size: 174,
    },
    {
        nama: "Sofa",
        gambar: "10",
        kategori: ["living", "bed"],
        color: 7,
        harga: 30000,
        deskripsi: "3D model of sofa Available in brown, dark green and white",
        size: 174,
    },
    {
        nama: "Triple rack",
        gambar: "11",
        kategori: ["living", "bed", "kitchen", "bath", "garage", "other"],
        color: 7,
        harga: 50000,
        deskripsi: "3D model of triple rack Available in brown, dark green and white",
        size: 174,
    },
    {
        nama: "Sofa",
        gambar: "12",
        kategori: ["living", "bed"],
        color: 7,
        harga: 90000,
        deskripsi: "3D model of sofa Available in brown, dark green and white",
        size: 175,
    },
    {
        nama: "Small tree",
        gambar: "13",
        kategori: "other",
        color: 7,
        harga: 10000,
        deskripsi: "3D model of small tree Available in brown, dark green and white",
        size: 320,
    },
    {
        nama: "tree",
        gambar: "14",
        kategori: "other",
        color: 7,
        harga: 10000,
        deskripsi: "3D model of tree Available in brown, dark green and white",
        size: 130,
    },
    {
        nama: "Gazebo",
        gambar: "15",
        kategori: "other",
        color: 7,
        harga: 40000,
        deskripsi: "3D model of gazebo Available in brown, dark green and white",
        size: 250,
    },
    {
        nama: "Stand",
        gambar: "16",
        kategori: "other",
        color: 7,
        harga: 60000,
        deskripsi: "3D model of stand Available in brown, dark green and white",
        size: 174,
    },
  ]
  

export default function ProductsView (){

    const [filter, setFilter] = useState("");
  const [klikFilter, setKlikFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const containerRef = useRef(null);
  

  const handleFilter = (kategori: string) => {
    setFilter(kategori);
    setKlikFilter(kategori);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMaxPrice(value === "" ? null : parseFloat(value));
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMinPrice(value === "" ? null : parseFloat(value));
  };


const filterProduk = (produk: Product) => {
    // Filter berdasarkan kategori
    if (filter !== "") {
      if (Array.isArray(produk.kategori)) {
        // Jika kategori produk merupakan array
        if (!produk.kategori.includes(filter)) {
          return false;
        }
      } else {
        // Jika kategori produk bukan array
        if (produk.kategori !== filter) {
          return false;
        }
      }
    }


     // Filter berdasarkan harga
     if (maxPrice !== null && produk.harga > maxPrice) {
        return false;
      }
      if (minPrice !== null && produk.harga < minPrice) {
        return false;
      }
  
      return true;
    };

  

    return(
        <div className="pt-48 z-10 bg-[#f3f3f7] flex justify-center gap-36 items-center h-[1250px] overflow-hidden">
            <div className="w-[380px] h-[1029px] bg-white text-start pl-10">
                <p className="font-semibold text-[20px] mt-10">Category</p>
                <div className="mt-5">
                    <div className="flex gap-2 my-2 items-center">
                        <button onClick={() => handleFilter("")} className={`border border-black rounded-lg w-[30px] h-[30px] cursor-pointer transition duration-300 ease-in-out ${klikFilter === "" ? "bg-black" : "bg-white"}`}></button>
                        <p className="font-semibold text-[18px]">All</p>
                    </div>
                    <div className="flex gap-2 my-2 items-center">
                        <button onClick={() => handleFilter("living")} className={`border border-black rounded-lg w-[30px] h-[30px] cursor-pointer transition duration-300 ease-in-out ${klikFilter === "living" ? "bg-black" : "bg-white"}`}></button>
                        <p className="font-semibold text-[18px]">Living room</p>
                    </div>
                    <div className="flex gap-2 my-2 items-center">
                        <button onClick={() => handleFilter("bed")} className={`border border-black rounded-lg w-[30px] h-[30px] cursor-pointer transition duration-300 ease-in-out ${klikFilter === "bed" ? "bg-black" : "bg-white"}`}></button>
                        <p className="font-semibold text-[18px]">Bed Room</p>
                    </div>
                    <div className="flex gap-2 my-2 items-center">
                        <button onClick={() => handleFilter("kitchen")} className={`border border-black rounded-lg w-[30px] h-[30px] cursor-pointer transition duration-300 ease-in-out ${klikFilter === "kitchen" ? "bg-black" : "bg-white"}`}></button>
                        <p className="font-semibold text-[18px]">Kitchen</p>
                    </div>
                    <div className="flex gap-2 my-2 items-center">
                        <button onClick={() => handleFilter("bath")} className={`border border-black rounded-lg w-[30px] h-[30px] cursor-pointer transition duration-300 ease-in-out ${klikFilter === "bath" ? "bg-black" : "bg-white"}`}></button>
                        <p className="font-semibold text-[18px]">Bathroom</p>
                    </div>
                    <div className="flex gap-2 my-2 items-center">
                        <button onClick={() => handleFilter("garage")} className={`border border-black rounded-lg w-[30px] h-[30px] cursor-pointer transition duration-300 ease-in-out ${klikFilter === "garage" ? "bg-black" : "bg-white"}`}></button>
                        <p className="font-semibold text-[18px]">Garage</p>
                    </div>
                    <div className="flex gap-2 my-2 items-center">
                        <button onClick={() => handleFilter("other")} className={`border border-black rounded-lg w-[30px] h-[30px] cursor-pointer transition duration-300 ease-in-out ${klikFilter === "other" ? "bg-black" : "bg-white"}`}></button>
                        <p className="font-semibold text-[18px]">Other</p>
                    </div>
                </div>

                <p className="font-semibold text-[20px] mt-10">Price</p>
                <div className="">
                    <div className="my-4 flex justify-center items-center border border-[#B3A6AC] rounded-lg w-[213px] h-[52px]">
                        <div className="w-1/4 ">
                            <p className="text-center font-semibold text-[20px] text-[#6F7277] bg-[#BABABA] h-[52px] border-y border-l border-[#B3A6AC] rounded-tl-lg rounded-bl-lg flex items-center justify-center">Rp</p>
                        </div>
                        <div className="w-3/4">
                            <input type="number" value={maxPrice || ''} onChange={handleMaxPriceChange}  className="text-[#B3A6AC] font-light text-[20px] text-center w-full focus:outline-none" placeholder="Max price"/>
                        </div>
                    </div>
                    <div className="my-4 flex justify-center items-center border border-[#B3A6AC] rounded-lg w-[213px] h-[52px]">
                        <div className="w-1/4 ">
                            <p className="text-center font-semibold text-[20px] text-[#6F7277] bg-[#BABABA] h-[52px] border-y border-l border-[#B3A6AC] rounded-tl-lg rounded-bl-lg flex items-center justify-center">Rp</p>
                        </div>
                        <div className="w-3/4">
                            <input type="number" value={minPrice || ''} onChange={handleMinPriceChange}  className="text-[#B3A6AC] font-light text-[20px] text-center w-full focus:outline-none" placeholder="Min price"/>
                        </div>
                    </div>
                </div>

                <div className="w-[270.68px] h-[146.58px] px-2 mt-20" >
                <p className="font-semibold text-[20px]">Color</p>
                <div className="flex flex-wrap w-full h-[105.77px] gap-2 mt-5">
                    <div className="color-1 w-[32px] h-[32px] bg-[#009999] rounded-lg shadow-xl cursor-pointer"></div>
                    <div className="color-2 w-[32px] h-[32px] bg-[#660000] rounded-lg shadow-xl cursor-pointer"></div>
                    <div className="color-3 w-[32px] h-[32px] bg-[#cccc99] rounded-lg shadow-xl cursor-pointer"></div>
                    <div className="color-4 w-[32px] h-[32px] bg-[#000000] rounded-lg shadow-xl cursor-pointer"></div>
                    <div className="color-5 w-[32px] h-[32px] bg-[#ff822d] rounded-lg shadow-xl cursor-pointer"></div>
                    <div className="color-6 w-[32px] h-[32px] bg-[#663300] rounded-lg shadow-xl cursor-pointer"></div>
                    <div className="color-7 w-[32px] h-[32px] bg-[#996633] rounded-lg shadow-xl cursor-pointer"></div>
                    <div className="color-8 w-[32px] h-[32px] bg-[#999999] rounded-lg shadow-xl cursor-pointer"></div>
                    <div className="color-9 w-[32px] h-[32px] bg-[#ffffff] rounded-lg shadow-xl cursor-pointer"></div>
                </div>
                </div>
                

            </div>


            <div className=" w-[938.52px] h-[993.7px] bg-transparent flex flex-wrap justify-start gap-10 items-start">
            {product.filter(filterProduk).map((items, i) => (
          <ProductsShow
            key={i}
            gambar={items?.gambar}
            kategori={items?.kategori}
            color={items?.color}
            harga={items?.harga}
            size={items?.size}
            nama={items?.nama}
            deskripsi={items?.deskripsi}
            index={i}
          />
        ))}
            </div>
        </div>
    )
}