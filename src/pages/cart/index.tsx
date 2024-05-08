// CartPage.tsx

import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

interface CartItem {
  nama: string;
  gambar: string;
  harga: number;
  deskripsi: string;
  size: number;
}

const CartPage: React.FC = () => {
  const router = useRouter();

  // Mengambil produk dari localStorage saat komponen dimount
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Mengambil produk dari state lokal
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Menambahkan produk baru ke keranjang belanja dan menyimpannya di localStorage
  const handleAddToCart = () => {
    if (router.query.nama && router.query.gambar && router.query.harga && router.query.deskripsi && router.query.size) {
      const newItem: CartItem = {
        nama: router.query.nama as string,
        gambar: router.query.gambar as string,
        harga: Number(router.query.harga),
        deskripsi: router.query.deskripsi as string,
        size: Number(router.query.size),
      };
      const updatedCartItems = [...cartItems, newItem];
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  // Menghapus produk dari keranjang belanja berdasarkan indeks
  const handleRemoveFromCart = (index: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const totalHarga = cartItems.reduce((total, item) => total + item.harga, 0);
  const totalProduk = cartItems.length;

  // Agregasi produk-produk yang sama
  const aggregatedCartItems: { [nama: string]: { item: CartItem, jumlah: number, totalHarga: number } } = {};
  cartItems.forEach(item => {
    if (!aggregatedCartItems[item.nama]) {
      aggregatedCartItems[item.nama] = { item: item, jumlah: 1, totalHarga: item.harga };
    } else {
      aggregatedCartItems[item.nama].jumlah++;
      aggregatedCartItems[item.nama].totalHarga += item.harga;
    }
  });

  return (
    <div className='pt-48 pb-16 bg-[#f3f3f7]'>
      <div className="bg-white w-[1000px] mx-auto rounded-md">
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
                  <div className="flex">
                  <p>{aggregatedItem.item.nama} </p>
                  <p>{` (${aggregatedItem.jumlah})`}</p>
                  </div>
                  <p className="text-[#E42C14] font-semibold"><i >Rp {aggregatedItem.totalHarga.toLocaleString()}</i> </p>
                  </div>
                  <button onClick={() => handleRemoveFromCart(index)} className=" px-2 py-1 rounded-full mt-2 bg-[#E42C14] text-white"><FontAwesomeIcon icon={faMinus} /></button>
                </div>
              </div>
            </div>
          ))}
           <div className="flex items-center gap-5 justify-end w-full ">
            <p >{`Total (${totalProduk} Produk):`} <i className="font-bold text-[#E42C14]">Rp{totalHarga.toLocaleString()}</i> </p>
            <button onClick={handleAddToCart} className="px-5 py-3 bg-[#E42C14] text-white">
              Add <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          
        </div>
      )}
    </div>
    </div>
  );
};

export default CartPage;
