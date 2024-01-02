"use client";

import { sendEmail } from "@/server-actions/sendEmail";
import { useRef, type FormEvent, useState } from "react";
import { Input } from "./Input";

export const Form = () => {
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
                <Input value={name} setValue={setName} placeholder="Enter your name here..." />
                <Input value={email} setValue={setEmail} placeholder="Enter your email here..." />
            </div>
            <Input value={message} setValue={setMessage} placeholder="Enter your message here..." asText={true} />
            <button type="submit" className="relative h-[50px] mt-5 px-10 rounded-full bg-blue-500 text-white flex items-center">
                Send
            </button>
        </form>
    )
}
