type SquareHomeProps = {
    text: string;
    icon: string;
    color?: string;
    className?: string;
    onclickEvent?: any;
    text_color?: string;
};

const SquareHome = ({
    text,
    icon,
    color,
    onclickEvent,
    className,
    text_color,
}: SquareHomeProps) => {
    return (
        <button
            className={
                `flex items-center justify-center flex-col py-5 border rounded-xl gap-2 shadow-lg w-28 ` +
                color
            }
            onClick={onclickEvent}
        >
            <div
                className={
                    `p-2 flex items-center justify-center rounded-lg border bg-transparent ` +
                    className
                }
            >
                <i className={`bx ${icon} font-extrabold `}></i>
            </div>
            <small className={"font-bold text-wrap " + text_color}>
                {text}
            </small>
        </button>
    );
};

export default SquareHome;
