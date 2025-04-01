import { useEffect, useRef, useState } from "react";
import { boardsStore, BoardType } from "../store/boardsStore";
import { Link } from "react-router";
import { CreateBoard } from "./CreateBoard";
import { useOnClickOutside } from "usehooks-ts";

export const Home = () => {
  const { setCurrentBoard, boards } = boardsStore();
  const [openModal, setOpenModal] = useState(false);
  const [filteredBoards, setFilteredBoards] =
    useState<Record<string, BoardType>>(boards);
  const formRef = useRef(null!);

  const setModalClose = () => {
    setOpenModal(false);
  };

  useOnClickOutside(formRef, setModalClose);

  useEffect(() => {
    setCurrentBoard(null);
  }, [setCurrentBoard]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    const filteredArrays = Object.entries(boards).filter(([, value]) => {
      return value.boardTitle.toLowerCase().includes(searchValue.toLowerCase());
    });

    const resultObject: Record<string, BoardType> = {};
    filteredArrays.forEach(([key, value]) => {
      resultObject[key] = value;
    });

    setFilteredBoards(resultObject);
  };

  const orderBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = event.target.value;
    if (filterValue === "All") {
      setFilteredBoards(boards);
    } else if (filterValue === "In alphabetical order from A to Z") {
      const sortedBoards: Record<string, BoardType> = Object.fromEntries(
        Object.entries(boards).sort(([, a], [, b]) =>
          a.boardTitle.localeCompare(b.boardTitle)
        )
      );

      setFilteredBoards(sortedBoards);
    } else {
      const sortedBoards: Record<string, BoardType> = Object.fromEntries(
        Object.entries(boards).sort(([, a], [, b]) =>
          b.boardTitle.localeCompare(a.boardTitle)
        )
      );

      setFilteredBoards(sortedBoards);
    }
  };

  return (
    <div className="h-full w-full text-[#172b4d] ">
      <main className="w-full max-w-[1280px] mx-auto bg-white ">
        <header className="px-4 py-9 flex gap-2 items-center justify-center">
          <div className="flex gap-2 mx-auto w-[800px] ">
            <img
              className="h-15 w-15 aspect-square rounded"
              src="https://i.pinimg.com/736x/d7/60/fb/d760fbc1a6bf51234fd2fa5365f0ec81.jpg"
              alt="messi's photo"
            />

            <div className="flex flex-col gap-0.5">
              <h1 className="text-xl font-semibold">Your's workspace</h1>

              <span className="flex items-center gap-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="14px"
                  viewBox="0 -960 960 960"
                  width="14px"
                  fill="currentColor"
                >
                  <path d="M240-640h360v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85h-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640Zm0 480h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Z" />
                </svg>
                <p className="text-[12px] ">Public</p>
              </span>
            </div>
          </div>
        </header>
        <hr className="bg-[#091e4224] border-0 h-[1px] " />
        <section className="pt-4">
          <h1 className="text-lg font-semibold">Boards</h1>

          <header className="mt-4 flex justify-between">
            <div className="flex flex-col gap-0.5">
              <label
                className="text-[12px] text-[#44546f] font-bold"
                htmlFor=""
              >
                Sort By
              </label>
              <select
                onChange={orderBy}
                className="w-[250px] p-2 rounded-sm border border-zinc-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-[#172b4d] truncate"
                name=""
                id=""
              >
                <option value="All">All</option>
                <option value="In alphabetical order from A to Z">
                  In alphabetical order from A to Z
                </option>
                <option value="In alphabetical order from Z to A">
                  In alphabetical order from Z to A
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-0.5">
              <label
                className="text-[12px] text-[#44546f] font-bold"
                htmlFor=""
              >
                Search
              </label>

              <div className="relative">
                <span className="absolute top-[20%] left-1.5 text-zinc-400 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#00000054"
                  >
                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                  </svg>
                </span>
                <input
                  onChange={handleSearch}
                  className="w-[250px] pl-8 py-1.5 rounded-sm border border-zinc-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-[#172b4d] truncate"
                  placeholder="Search boards"
                  name=""
                  id=""
                />
              </div>
            </div>
          </header>

          <main className="mt-4">
            <ul className="grid grid-cols-4 gap-3">
              <button
                onClick={() => setOpenModal(true)}
                className="h-[105px] bg-[#00000012] p-2 hover:bg-[#00000065] transition duration-75 hover:opacity-90 w-full rounded-xl bg-cover bg-center flex justify-center items-center"
              >
                <h1 className="text-base text-zinc-700 ">Create a new board</h1>
              </button>
              {openModal && (
                <CreateBoard
                  ref={formRef}
                  inset="187px auto auto 35%"
                  setClose={setOpenModal}
                />
              )}
              {Object.entries(filteredBoards).map(([boardId, board]) => (
                <Link to={`/boards/${boardId}`} className="" key={boardId}>
                  <picture className=" ">
                    <div
                      className="h-[105px] p-2 hover:brightness-60 transition duration-75 hover:opacity-90 w-full rounded-xl bg-cover bg-center"
                      style={{
                        backgroundImage: board.boardBackground.startsWith(
                          "url("
                        )
                          ? board.boardBackground
                          : "none",
                        backgroundColor: !board.boardBackground.startsWith(
                          "url("
                        )
                          ? board.boardBackground
                          : "transparent",
                      }}
                    >
                      <h1 className="text-base text-white font-bold">
                        {board.boardTitle}
                      </h1>
                    </div>
                  </picture>
                </Link>
              ))}
            </ul>
          </main>
        </section>
      </main>
    </div>
  );
};
