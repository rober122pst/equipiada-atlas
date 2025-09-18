function InputText(props) {
    return (
        <div className="mb-4 w-full">
            <label className="font-extralight">{props.label || ""}
                <input 
                    type={props.type || "text"}
                    className="w-full h-[47px] p-3 mt-1 rounded-[20px] border-2 border-raspberry focus:outline-none focus:border-cocoa-brown transition duration-300"
                    placeholder={props.placeholder || ""}
                />
            </label>
        </div>
    );
}

export default InputText;