import Navbar from "@/components/layouts/Navbar";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "../../src/app/globals.css";
import Footer from "@/components/layouts/footer";
import ProductPage from "./products";
import ProductsView from "@/components/views/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps){
    return(
        <SessionProvider session={session}>
            <div className="mx-auto bg-white w-full">
                <Navbar/>
            <Component {...pageProps}/>
            <Footer/>
        </div>
        </SessionProvider>
    )
}