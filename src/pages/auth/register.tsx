import RegisterView from "@/components/views/auth/Register";
import styles from "../../app/globals.css";

export default function RegisterPage () {
    return(

        //agar tailwind nya dapat digunakan
        <div className={styles.container}> 
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                <RegisterView/>
                </div>
            </div>
        </div>
    )
}