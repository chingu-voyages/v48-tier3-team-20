
interface ButtonProps {
  title: string;
  type: 'button' | 'submit' | 'reset';
}

export default function Button({title, type}: ButtonProps) {
  return (
    <button type={type} className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none">{title}</button>
  )
}
