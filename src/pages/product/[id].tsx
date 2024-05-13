// ProductDetail.tsx

import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface CartItem {
  nama: string;
  gambar: string;
  harga: number;
  deskripsi: string;
  size: number;
  jumlah: number;
}

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { nama, gambar, harga, deskripsi, size } = router.query;

  const formattedHarga = Number(harga).toLocaleString();

  const [jumlah, setJumlah] = useState<number>(1);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      nama: nama as string,
      gambar: gambar as string,
      harga: Number(harga),
      deskripsi: deskripsi as string,
      size: Number(size),
      jumlah: Number(jumlah),
    };

    const existingCartItems = localStorage.getItem("cartItems");
    let updatedCartItems: CartItem[] = [];

    if (existingCartItems) {
      updatedCartItems = JSON.parse(existingCartItems);
    }
    updatedCartItems.push(newItem);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    router.push("/cart"); 
  };

  const incrementJumlah = () => {
    setJumlah(prevJumlah => prevJumlah + 1);
  };

  const decrementJumlah = () => {
    if (jumlah > 1) {
      setJumlah(prevJumlah => prevJumlah - 1);
    }
  };

  return (
    <div className="lg:w-[1850px] md:w-[1650px] sm:w-[1450px]  mx-auto">
      <div className=" bg-[#f3f3f7]  h-[850px] flex justify-center mx-auto items-center">
        <div className="xl:w-[1105px] lg:w-[1105px] md:w-[1105px] sm:w-[950px] h-[500px]  flex mx-auto justify-center gap-10 ">
          <div className="bg-white rounded-lg w-[714px] h-[500px] flex justify-center items-center ">
            <Image src={`/furnitur/${gambar}.png`} alt="" width={400} height={400} />
          </div>

          <div className="mx-auto pt-10">
            <h1 className="font-semibold text-[40px] mb-5">{nama}</h1>
            <p className="text-[16px] mb-16">{deskripsi}</p>

            <p className="font-semibold text-[52px] mb-8">Rp{formattedHarga}</p>
            <div className="flex gap-5">
              <div className="flex items-center mb-8 border border-[#E42C14] rounded-xl">
                <button onClick={decrementJumlah} className=" w-[39px] h-[39px] border-r border-[#E42C14] bg-white rounded-tl-xl rounded-bl-xl  flex justify-center items-center cursor-pointer">
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <p className="mx-4 text-[22px]">{jumlah}</p>
                <button onClick={incrementJumlah} className=" w-[39px] h-[39px] border-l border-[#E42C14] bg-white rounded-tr-xl rounded-br-xl  flex justify-center items-center cursor-pointer">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div onClick={handleAddToCart} className="bg-[#E42C14] w-[115px] h-[39px] text-white rounded-lg flex justify-between items-center cursor-pointer">
                <p className="font-semibold text-[22px] mx-auto">ADD</p>
                <div className="mx-auto">
                  <FontAwesomeIcon icon={faCartShopping} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
