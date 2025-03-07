export const LateralMenu = () => {
  const boards = [
    {
      title: "Work Projects",
      src: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg",
    },
    {
      title: "Personal Tasks",
      src: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
    },
    {
      title: "Travel Plans",
      src: "https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg",
    },
    {
      title: "Ideas & Inspiration",
      src: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
    },
  ];

  return (
    <div>
      <header className="h-[65px] flex gap-1.5 items-center px-[12px] py-[8px] border-b border-b-gray-600">
        <img
          className="h-9 w-9 aspect-square rounded"
          src="https://i.pinimg.com/736x/d7/60/fb/d760fbc1a6bf51234fd2fa5365f0ec81.jpg"
          alt="no photo"
        />
        <h1 className="text-sm font-semibold text-gray-300">
          Your's workspace
        </h1>
      </header>

      <div className="px-[12px] py-[8px] flex items-center justify-between group">
        <h2 className="text-sm font-semibold text-gray-300">Your's boards</h2>

        <div className="flex gap-1 justify-center items-center">
          <button className="p-1.5 hover:bg-[#383842] rounded  opacity-0 group-hover:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="#e8eaed"
            >
              <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
            </svg>
          </button>

          <button className="p-0.5 hover:bg-[#383842] rounded transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="22px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </button>
        </div>
      </div>

      <section className="">
        <ul>
          {boards.map((board) => (
            <li
              title="hola"
              className="flex items-center gap-2 p-1.5 px-[12px] hover:bg-[#383842] transition-colors duration-75"
              key={board.src}
            >
              <picture>
                <img
                  className="h-4 w-6 rounded-xs"
                  src={board.src}
                  alt={board.title}
                />
              </picture>

              <p className="text-sm text-gray-300">{board.title}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
