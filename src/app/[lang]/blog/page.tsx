import { useDictionary } from "@/hooks/useDictionary";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog"
}

const Page = ({ params }: { params: { lang: string } }) => {
    const { lang } = params;
    const dictionary = useDictionary(lang);

    return (
        <div>
            <h1 className="text-center font-bold text-3xl mb-10">{dictionary.blog.greeting}</h1>
            <p className="text-center">{dictionary.blog.paragraph}</p>
        </div>
    )
}

export default Page;
