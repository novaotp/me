import { Form } from "@/components/pages/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact"
}

const Page = () => {
    return (
        <div className="relative w-full h-full flex flex-col justify-evenly items-center">
            <h1 className="text-3xl font-bold">Contact Page</h1>
            <p className="text-justify">Fill the form below to get in touch with me. I'll get back to you as soon as I can !</p>
            <Form />
        </div>
    )
}

export default Page;
