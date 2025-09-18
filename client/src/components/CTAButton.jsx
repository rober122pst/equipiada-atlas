function CTAButton(props) {
    return <button 
        className="px-6 py-2 rounded-lg bg-raspberry text-[20px] hover:bg-raspberry/80 transition cursor-pointer"
        type={props.type || "button"}
    >
        {props.label}
    </button>;
}

export default CTAButton;