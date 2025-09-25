function CTAButton(props) {
    return <button 
        className='px-6 py-2 rounded-lg bg-raspberry text-[20px] not-disabled:hover:bg-raspberry/80 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
        type={props.type || "button"}
        disabled={props.disabled || false}
    >
        {props.label}
    </button>;
}

export default CTAButton;