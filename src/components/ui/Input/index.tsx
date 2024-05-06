type Propstypes = {
    label?: string;
    name: string;
    type: string;
    placeholder?: string;
    gap: string;
}

export default function Input (props: Propstypes) {

    const {label, name, type, placeholder, gap} = props;

    return(
        <div>
             <div className={`mx-auto flex w-[319px] h-[63px] rounded-full justify-end items-center ${gap} bg-[#F5F4F2] my-4`}>
                    { label && <label htmlFor={name} className="text-[#241C1C]">{label}</label>}
                    <input name={name} id={name} type={type} placeholder={placeholder} className="bg-transparent border-none rounded-full text-[#241C1C] py-5 px-6 focus:outline-none"/>
                </div>
        </div>
    )
}