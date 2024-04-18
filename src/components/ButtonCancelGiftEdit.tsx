export default function ButtonCancelGiftEdit({
    onClick,
}: {
    onClick: () => void;
}) {
    return (
        <button onClick={onClick} className="w-full mt-2">
            Cancel
        </button>
    );
}
