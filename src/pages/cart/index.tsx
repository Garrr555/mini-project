// CartPage.tsx

import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface CartItem {
  nama: string;
  gambar: string;
  harga: number;
  deskripsi: string;
  size: number;
  jumlah: number;
}

const CartPage: React.FC = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  

  const handleAddToCart = () => {
    if (
      router.query.nama &&
      router.query.gambar &&
      router.query.harga &&
      router.query.deskripsi &&
      router.query.size
    ) {
      const newItem: CartItem = {
        nama: router.query.nama as string,
        gambar: router.query.gambar as string,
        harga: Number(router.query.harga),
        deskripsi: router.query.deskripsi as string,
        size: Number(router.query.size),
        jumlah: 1,
      };

      const existingItemIndex = cartItems.findIndex(item => item.nama === newItem.nama);

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].jumlah += 1;
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      } 
      
      else {
        const updatedCartItems = [...cartItems, newItem];
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
    }
  };

  const handleRemoveFromCart = (index: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleDecrementQuantity = (index: number) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].jumlah === 1) {
      updatedCartItems.splice(index, 1);
    } 
    else {
      updatedCartItems[index].jumlah -= 1;
    }
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleIncrementQuantity = (index: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].jumlah += 1;
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const totalHarga = cartItems.reduce((total, item) => total + item.harga * item.jumlah, 0);

  const totalProduk = cartItems.length;

  const aggregatedCartItems: { [nama: string]: { item: CartItem; jumlah: number; totalHarga: number } } = {};
  
  cartItems.forEach(item => {
    if (!aggregatedCartItems[item.nama]) {
      aggregatedCartItems[item.nama] = { item: item, jumlah: item.jumlah, totalHarga: item.harga * item.jumlah };
    } 
    else {
      aggregatedCartItems[item.nama].jumlah += item.jumlah;
      aggregatedCartItems[item.nama].totalHarga += item.harga * item.jumlah;
    }
  });

  return (
    <div className="lg:w-[1850px] md:w-[1650px] sm:w-[1450px] mx-auto">
      <div className='pt-48 pb-16 bg-[#f3f3f7] mx-auto'>
        <div className="bg-white md:w-[1000px] sm:w-[950px] mx-auto rounded-md">
          {cartItems.length === 0 ? (
            <div >
              <p className="p-5 text-xl text-center h-[700px] flex items-center justify-center">Keranjang belanja Anda kosong.</p>
              <div className="flex items-center gap-5 justify-end w-full ">
                <p >{`Total (${totalProduk} Produk):`} <i className="font-bold text-[#E42C14]">Rp{totalHarga.toLocaleString()}</i> </p>
                <button onClick={handleAddToCart} className="px-5 py-3 bg-[#E42C14] text-white">
                  Add <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          ) : (
            <div className="mx-auto flex justify-center flex-col items-center ">
              {Object.values(aggregatedCartItems).map((aggregatedItem, index) => (
                <div key={index} className=" border-y-8 border-[#f3f3f7] w-[1000px]">
                  <div className="flex items-center mx-auto justify-between w-[900px]">
                    <div>
                      <Image src={`/furnitur/${aggregatedItem.item.gambar}.png`} alt='' width={200} height={200} />
                    </div>
                    <div className="ml-4 flex items-center justify-between w-[155px] ">
                      <div>
                        <div className="flex w-32">
                          <p className="">{aggregatedItem.item.nama} </p>
                          <p>{` (${aggregatedItem.jumlah})`}</p>
                        </div>
                        <p className="text-[#E42C14] font-semibold"><i >Rp {aggregatedItem.totalHarga.toLocaleString()}</i> </p>
                      </div>
                      <div className="flex gap-3">
                      <div>
                        {aggregatedItem.jumlah === 1 ? (
                          <button onClick={() => handleRemoveFromCart(index)} className="px-2 py-1 rounded-full bg-[#E42C14] text-white"><FontAwesomeIcon icon={faMinus} /></button>
                        ) : (
                          <button onClick={() => handleDecrementQuantity(index)} className="px-2 py-1 rounded-full bg-[#E42C14] text-white"><FontAwesomeIcon icon={faMinus} /></button>
                        )}
                      </div>
                      <button onClick={() => handleIncrementQuantity(index)} className="px-2 py-1 rounded-full bg-[#E42C14] text-white"><FontAwesomeIcon icon={faPlus} /></button>
                      </div>
                      
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-5 justify-end w-full ">
                <p >{`Total (${totalProduk} Produk):`} <i className="font-bold text-[#E42C14]">Rp{totalHarga.toLocaleString()}</i> </p>
                <Link href='/'>
                  <button onClick={handleAddToCart} className="px-5 py-3 bg-[#E42C14] text-white">
                    Add <FontAwesomeIcon icon={faPlus} />
                  </button> 
                </Link>
               
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
