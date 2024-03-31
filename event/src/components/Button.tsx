
interface ButtonProps {
  title: string;
}

export default function Button({title}: ButtonProps) {
  return (
    <button className="mr-2 border px-5 py-2">{title}</button>
  )
}
