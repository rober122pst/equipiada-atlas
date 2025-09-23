import { useState } from "react";

function InputText(props) {
    const [value, setValue] = useState(props.value || "");

    const handleChange = (e) => {
        setValue(e.target.value);
        props.onChange && props.onChange(e);
    };

    return (
        <div className="mb-4 w-full">
            <label className="font-extralight">{props.label || ""}
                <input 
                    type={props.type || "text"}
                    className="w-full h-[47px] p-3 mt-1 rounded-[20px] border-2 border-raspberry focus:outline-none focus:border-cocoa-brown transition duration-300"
                    placeholder={props.placeholder || ""}
                    required={props.required || false}
                    value={props.value || value} 
                    onChange={handleChange}
                    name={props.name || ""}
                />
            </label>
        </div>
    );
}

export default InputText;