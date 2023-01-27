
export default function Button(props) {
    
    return (
        <button onClick={props.handleClick} className="py-3 px-4 rounded-md text-lg bg-purple-600 ring-4 ring-purple-700 hover:bg-orange-400 hover:ring-orange-600">
            {props.label}
        </button>
    )
}