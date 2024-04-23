export default function Buttons({title, color}: {title: string, color: string, }) {
  return (
    <button className="w-[80px] h-[30px] rounded-2xl py-1 px-3 m-3" style={{backgroundColor: color}}>
      {title}
    </button>
  )
}