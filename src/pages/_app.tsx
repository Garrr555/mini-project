import Navbar from "@/components/layouts/Navbar";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import styles from "../../src/app/globals.css";
import Footer from "@/components/layouts/footer";

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps){
    return(
        <SessionProvider session={session}>
            <div className={styles.container}>
                <Navbar/>
            <Component {...pageProps}/>
            <Footer/>
        </div>
        </SessionProvider>
    )
}