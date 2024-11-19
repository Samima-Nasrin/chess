

export const Button = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
    return <button onClick={onClick} className="px-8 py-4 text-2xl bg-blue-400 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-300 shadow-md hover:shadow-lg">
        { children }
    </button>
};