export default function GiftModal() {
    function giftBackgroundClickHandler() {
        alert("back");
    }

    return (
        <div
            className="fixed inset-0 bg-black/70"
            onClick={giftBackgroundClickHandler}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className="mt-32 max-w-sm mx-auto bg-zinc-800 p-4 rounded-lg"
            >
                test
            </div>
        </div>
    );
}
