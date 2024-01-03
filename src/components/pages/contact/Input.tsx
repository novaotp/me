import { Dispatch, SetStateAction } from "react";

interface InputProps {
    type?: "text" | "email";
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    placeholder: string;
    /** If `false`, an input will be rendered (default). Otherwise, a textarea will be rendered. */
    asText?: boolean;
}

export const Input = ({ value, setValue, placeholder, type = "text", asText = false }: InputProps) => {
    const Tag = asText ? 'textarea' : 'input';

    const height = asText ? 'h-[150px] xsm:h-[200px]' : 'h-[50px]';
    const verticalPadding = asText ? 'py-5' : '';

    return (
        <Tag
            type={type}
            name="name"
            value={value}
            onChange={event => setValue(event.target.value)}
            placeholder={placeholder}
            className={`relative w-full ${height} rounded-md border border-gray-400 px-5 ${verticalPadding} text-[14px] resize-none`}
        ></Tag>
    )
}