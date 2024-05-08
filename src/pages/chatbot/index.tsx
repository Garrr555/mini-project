import { useState, useEffect } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

interface Message {
  text: string;
  role: "user" | "bot";
  timestamp: Date;
}

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
        size: 195,
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

export default function ChatBot(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [chat, setChat] = useState<any>(null);
  const [theme, setTheme] = useState<string>("light");
  const [error, setError] = useState<string | null>(null);

  const API_KEY: string = "AIzaSyAZgVQuPNL7KjbhK46uDMoz-D9Nc6Z30qE";
  const MODEL_NAME: string = "gemini-1.0-pro-001";

  const genAI = new GoogleGenerativeAI(API_KEY);

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await genAI
          .getGenerativeModel({ model: MODEL_NAME })
          .startChat({
            generationConfig,
            safetySettings,
            // @ts-ignore
            history: messages.map((msg) => ({
              text: msg.text,
              role: msg.role,
            })),
          });
        setChat(newChat);
      } catch (error) {
        setError("failed");
      }
    };
    initChat();
  }, []);

//   const handleSendmessages = async () => {
//     try {
//       const userMessage: Message = {
//         text: userInput,
//         role: "user",
//         timestamp: new Date(),
//       };

//       setMessages((prevMessages) => [...prevMessages, userMessage]);

//       setUserInput("");

//       if (chat) {
//         const result = await chat.sendMessage(userInput);
//         const botMessage: Message = {
//           text: result.response.text(),
//           role: "bot",
//           timestamp: new Date(),
//         };

//         setMessages((prevMessages) => [...prevMessages, botMessage]);
//       }
//     } catch (error) {
//       setError("failed");
//     }
//   };


// Fungsi untuk mencari informasi produk berdasarkan pertanyaan pengguna
const findProductInfo = (input: string): Product | undefined => {
  const keyword = input.toLowerCase();
  return product.find((item) => item.nama.toLowerCase().includes(keyword));
};

  const handleSendmessages = async () => {
    try {
      const userMessage: Message = {
        text: userInput,
        role: "user",
        timestamp: new Date(),
      };
  
      setMessages((prevMessages) => [...prevMessages, userMessage]);
  
      setUserInput("");
  
      if (chat) {
        let botMessage: Message;
  
        // Cek apakah pertanyaan pengguna terkait produk
        if (isProductQuestion(userInput)) {
          const productInfo = findProductInfo(userInput);
          if (productInfo) {
            botMessage = {
              text: formatProductInfo(productInfo),
              role: "bot",
              timestamp: new Date(),
            };
          } else {
            botMessage = {
              text: "Maaf, produk tidak ditemukan.",
              role: "bot",
              timestamp: new Date(),
            };
          }
        } else {
          // Jika bukan pertanyaan terkait produk, minta ChatBot untuk merespons
          const result = await chat.sendMessage(userInput);
          botMessage = {
            text: result.response.text(),
            role: "bot",
            timestamp: new Date(),
          };
        }
  
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      setError("failed");
    }
  };
  
  // Fungsi untuk mendeteksi apakah pertanyaan terkait produk
  const isProductQuestion = (input: string): boolean => {
    const productKeywords = ["product", "item", "barang", "produk"];
    return productKeywords.some((keyword) => input.toLowerCase().includes(keyword));
  };
  
  
  // Fungsi untuk memformat informasi produk dalam bentuk teks
  const formatProductInfo = (productInfo: Product): string => {
    return `Nama: ${productInfo.nama}\nDeskripsi: ${productInfo.deskripsi}\nHarga: Rp${productInfo.harga}`;
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const getThemeColor = () => {
    switch (theme) {
      case "light":
        return {
          primary: "bg-white",
          secondary: "bg-gray-100",
          accent: "bg-[#E42C14]",
          text: "text-gray-800",
        };

      case "dark":
        return {
          primary: "bg-gray-900",
          secondary: "bg-gray-800",
          accent: "bg-yellow-500",
          text: "text-gray-100",
        };

      default:
        return {
          primary: "bg-white",
          secondary: "bg-gray-100",
          accent: "bg-blue-500",
          text: "text-gray-800",
        };
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendmessages();
    }
  };

  const { primary, secondary, accent, text } = getThemeColor();

  return (
    <div className={`pt-36 flex flex-col h-screen p-4 ${primary}`}>
      <div className={`flex-1 overflow-y-auto py-5 px-5  ${secondary} rounded-xl p-2`}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div className="">
            <span
              className={`px-4 py-1 text-xl rounded-md ${
                msg.role === "user" ? `${accent} text-white` : `bg-white ${text} `
              }`}
            >
              {msg.text}
            </span>
            </div>
           
            <p className={`text-xs pt-2 mx-2 ${text} mt-1`}>
              {msg.role === "bot" ? "Penjual" : "You"} -{" "}
              {msg.timestamp.toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          placeholder="Type Message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className={`flex-1 text-black p-2 rounded-l-md border-y border-l focus:outline-none focus:border-${accent}`}
        />
        <button
          onClick={handleSendmessages}
          className={`p-2 ${accent} text-white rounded-r-md hover:bg-opacity-80 focus:outline-none`}
        >
          send
        </button>
      </div>
    </div>
  );
}
