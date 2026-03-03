export default function LinksButtons() {
  return (
    <div className="rounded-xl m-2 flex gap-10 justify-center items-center">
      <button
        className="bg-white p-0.5"
        style={{
          fontSize: "10px",
          padding: "1px",
          height: "20px",
          width: "20px",
          borderRadius: "50%",
          fontWeight: "bold",
        }}
      >
        &lt;
      </button>

      <button
        style={{
          fontSize: "8px",
          backgroundColor: "rgba(255, 255, 255)",
          padding: "1px",
          height: "20px",
          width: "20px",
          borderRadius: "50%",
        }}
      >
        +
      </button>
      <button
        style={{
          fontSize: "8px",
          backgroundColor: "rgba(255, 255, 255)",
          padding: "1px",
          height: "20px",
          width: "20px",
          borderRadius: "50%",
        }}
      >
        ✎
      </button>

      <button
        className="bg-white p-0.5"
        style={{
          fontSize: "10px",
          padding: "1px",
          height: "20px",
          width: "20px",
          borderRadius: "50%",
          fontWeight: "bold",
        }}
      >
        &gt;
      </button>
    </div>
  );
}
