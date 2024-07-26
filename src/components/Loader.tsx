import Logo from "./Logo";

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-800 bg-opacity-50 z-50">
            <div className="flex flex-col items-center">
                <Logo />
                <p className="text-white font-koulen font-medium text-2xl">Please wait...</p>
            </div>
        </div>
    );
};

export default Loader;
