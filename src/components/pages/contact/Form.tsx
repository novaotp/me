"use client";

import { sendEmail } from "@/server-actions/sendEmail";
import { useRef, type FormEvent, useState } from "react";
import { Input } from "./Input";
import { useParams } from "next/navigation";
import { useDictionary } from "@/hooks/useDictionary";

/**
 * Renders the contact form for the contact page.
 */
export const Form = () => {
    const dictionary = useDictionary(useParams().lang as string);
    const ref = useRef<HTMLFormElement>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleFormSubmission = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const success = await sendEmail({ name, email, message });

        if (!success) {
            alert("Something went wrong. Please try again later.");
            return;
        }

        alert("Email sent successfully. I'll get back to you soon.");
        ref.current?.reset();
    }

    return (
        <form ref={ref} onSubmit={handleFormSubmission} className="relative w-full flex flex-col justify-center items-center">
            <div className="relative w-full flex flex-col gap-5 mb-5 sm:flex-row">
                <Input value={name} setValue={setName} placeholder={dictionary.contact.placeholders.name} />
                <Input value={email} setValue={setEmail} placeholder={dictionary.contact.placeholders.email} />
            </div>
            <Input value={message} setValue={setMessage} placeholder={dictionary.contact.placeholders.message} asText={true} />
            <button type="submit" className="relative h-[50px] mt-5 px-10 rounded-full bg-blue-500 text-white flex items-center text-sm">
                {dictionary.contact.send}
            </button>
        </form>
    )
}
