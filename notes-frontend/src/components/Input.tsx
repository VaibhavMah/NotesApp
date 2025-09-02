interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
