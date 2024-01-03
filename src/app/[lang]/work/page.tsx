import { useDictionary } from "@/hooks/useDictionary";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Works"
}

const Page = ({ params }: { params: { lang: string } }) => {
    const { lang } = params;
    const dictionary = useDictionary(lang);

    return (
        <div>
            <h1 className="text-center font-bold text-3xl mb-10">{dictionary.work.greeting}</h1>
            <p className="text-center">{dictionary.work.paragraph}</p>
        </div>
    )
}

export default Page;
