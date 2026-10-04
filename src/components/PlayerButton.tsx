interface IPlayerButtonProps {
  name: string;
  onClick: () => void;
}

export const PlayerButton = ({ name, onClick }: IPlayerButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="border-2 border-amber-600 text-amber-500 px-4 py-2 rounded hover:bg-amber-600 hover:text-black transition-colors"
    >
      {name}
    </button>
  );
};
