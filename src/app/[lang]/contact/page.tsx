import { Form } from "@/components/pages/contact";
import { useDictionary } from "@/hooks/useDictionary";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact"
}

const Page = ({ params }: { params: { lang: string } }) => {
    const dictionary = useDictionary(params.lang);

    return (
        <div className="relative w-full max-w-[800px] h-full max-h-[600px] flex flex-col justify-evenly items-center">
            <h1 className="text-3xl font-bold text-center">{dictionary.contact.title}</h1>
            <p className="text-center text-sm xsm:text-base">{dictionary.contact.paragraph}</p>
            <Form />
        </div>
    )
}

export default Page;
