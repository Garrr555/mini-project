import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";


interface CartItem {
  nama: string;
  gambar: string;
  harga: number;
  deskripsi: string;
  size: number;
}


const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { id, nama, gambar, harga, deskripsi, size } = router.query;

  const formattedHarga = Number(harga).toLocaleString();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = () => {
    const productToAdd: CartItem = {
      nama: nama as string,
      gambar: gambar as string,
      harga: Number(harga),
      deskripsi: deskripsi as string,
      size: Number(size),
    };

    // Navigasi ke halaman CartPage dengan menyertakan query parameters
    router.push({
      pathname: '/cart',
      query: { 
        ...productToAdd
      },
    });
  };

  

  return (
    <div className=" bg-[#f3f3f7]  h-[850px] flex items-center">
      <div className="w-[1105px] h-[500px]  flex mx-auto justify-center gap-10 ">
      <div className="bg-white rounded-lg w-[714px] h-[500px] flex justify-center items-center ">
      <Image src={`/furnitur/${gambar}.png`} alt='' width={400} height={400} />
      </div>

      <div className="mx-auto pt-10">
      <h1 className="font-semibold text-[40px] mb-5">{nama}</h1>
      <p className="text-[16px] mb-16">{deskripsi}</p>
      
      <p className="font-semibold text-[52px] mb-8">Rp{formattedHarga}</p>
      <div onClick={handleAddToCart} className="bg-[#E42C14] w-[115px] h-[39px] text-white rounded-lg flex justify-between items-center cursor-pointer">
        <p className="font-semibold text-[22px] mx-auto">BUY</p>
        <div className="mx-auto">
        <FontAwesomeIcon icon={faCartShopping} />
        </div>
        
      </div>
      </div>
      </div>
     
     
    </div>
  );
};

export default ProductDetail;