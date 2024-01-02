"use client";

import { sendEmail } from "@/server-actions/sendEmail";
import { useRef, type FormEvent, useState } from "react";

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
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    placeholder="Enter your name here..."
                    className="relative w-full h-[50px] rounded-md border border-gray-400 px-5 text-[14px]"
                />
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    placeholder="Enter your email here..."
                    className="relative w-full h-[50px] rounded-md border border-gray-400 px-5 text-[14px]"
                />
            </div>
            <textarea
                name="message"
                value={message}
                onChange={event => setMessage(event.target.value)}
                placeholder="Enter your message here..."
                className="relative w-full h-[200px] rounded-md border border-gray-400 p-5 mb-5 text-[14px] resize-none"
            ></textarea>
            <button
                type="submit"
                className="relative h-[50px] px-10 rounded-full bg-blue-500 text-white flex items-center"
            >
                Send
            </button>
        </form>
    )
}
