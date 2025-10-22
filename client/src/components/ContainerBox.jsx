function ContainerBox(props) {
    return (
        <div className="flex border-2 bg-gradient-to-br from-rich-900/40 to-transparent border-rich-900 p-4 rounded-3xl w-full min-h-[100px] flex-col">
            <h6 className="font-semibold text-2xl text-gray">{props.title}</h6>
            {props.children}
        </div>
    );
}

export default ContainerBox;