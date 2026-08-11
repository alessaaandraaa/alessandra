export default function Hero() {
  return (
    <div className=" flex flex-col items-center justify-center text-center relative">
      <img
        src="icon.png"
        width="50px"
        height="50px"
        className="bg-linear-to-r from-white to-purple-300 rounded-3xl"
      ></img>
      <h1 className="text-4xl font-extrabold bg-linear-to-r from-white to-purple-300 bg-clip-text text-transparent mb-3">
        ALESSANDRA
      </h1>
    </div>
  );
}
