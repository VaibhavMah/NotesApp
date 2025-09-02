interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function Button({ text, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
    >
      {text}
    </button>
  );
}
