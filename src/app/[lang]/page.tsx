import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home"
}

const Page = ({ params }: { params: { lang: string } }) => {
    const { lang } = params;

    console.log(lang);

    return (
        <div>
            <h1>Hi, I'm Sajidur Rahman</h1>
        </div>
    )
}

export default Page;
