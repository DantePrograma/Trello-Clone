import { Link } from "react-router";
import { boardsStore } from "../store/boardsStore";
import { useRef, useState } from "react";
import { CreateBoard } from "./CreateBoard";
import { useOnClickOutside } from "usehooks-ts";

export const LateralMenu = () => {
  const { boards, currentBoard } = boardsStore();
  const [openCreateBoardModal, setOpenCreateBoardModal] = useState(false);
  const formRef = useRef(null);

  const [expandedMenu, setExpandedMenu] = useState(false);

  const disableEditing = () => {
    setOpenCreateBoardModal(false);
  };

  useOnClickOutside(formRef, disableEditing);

  return (
    <aside
      style={{
        // boxShadow: `1px 0px 0px 0px #ffffff89`,
        background: currentBoard?.boardColor,
        color: currentBoard?.boardTextColor
          ? currentBoard?.boardTextColor
          : "#172b4d",
      }}
      className={`shadow-[0.5px_0px_3px_0px_#24242464] relative h-full flex-shrink-0 specialHeaderBackground
 transition-all duration-200 ${expandedMenu ? "w-[260px]" : "w-[44px] "} `}
    >
      <button
        onClick={() => setExpandedMenu(!expandedMenu)}
        className="absolute top-8.5 z-50 right-1 hover:bg-[#ffffff29] transform -translate-y-1/2 p-2  rounded-sm"
      >
        {expandedMenu ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="currentColor"
          >
            <path d="M240-240v-480h80v480h-80Zm440 0L440-480l240-240 56 56-184 184 184 184-56 56Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 -960 960 960"
            width="18px"
            fill="currentColor"
          >
            <path d="m280-240-56-56 184-184-184-184 56-56 240 240-240 240Zm360 0v-480h80v480h-80Z" />
          </svg>
        )}
      </button>

      <nav
        className={`relative origin-left transition-transform duration-200  ${
          !expandedMenu && "transformTranslateClass"
        }`}
      >
        <Link to="/">
          <header
            // style={{ borderBottom: `1px solid ${currentBoard?.boardTextColor}` }}
            className="h-[65px] flex gap-1.5 items-center px-[12px] py-[8px] shadow-[0px_0.5px_3px_0px_#24242464]"
          >
            <img
              className="h-9 w-9 aspect-square rounded"
              src="https://i.pinimg.com/736x/d7/60/fb/d760fbc1a6bf51234fd2fa5365f0ec81.jpg"
              alt="no photo"
            />
            <h1 className="text-sm font-semibold">Your's workspace</h1>
          </header>
        </Link>

        <div className="px-[12px] py-[8px] flex items-center justify-between group relative">
          <h2 className="text-sm font-semibold">Your's boards</h2>

          <div className="flex gap-1 justify-center items-center relative">
            <button className="p-1.5 hover:bg-[#ffffff29] rounded  opacity-0 group-hover:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 -960 960 960"
                width="16px"
                fill="currentColor"
              >
                <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
              </svg>
            </button>

            {openCreateBoardModal ? (
              <CreateBoard
                ref={formRef}
                inset="187px auto auto 265px"
                setClose={setOpenCreateBoardModal}
              />
            ) : (
              <button
                onClick={() => setOpenCreateBoardModal(true)}
                className="p-0.5 hover:bg-[#ffffff29] rounded transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="currentColor"
                >
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <section className="">
          <ul>
            {Object.entries(boards).map(([boardId, board]) => (
              <Link
                to={`/boards/${boardId}`}
                className="flex items-center gap-2 p-1.5 px-[12px] hover:bg-[#94939353] transition-colors duration-75"
                key={boardId}
              >
                <picture>
                  <div
                    className="h-4 w-6 rounded-xs bg-cover bg-center"
                    style={{
                      backgroundImage: board.boardBackground.startsWith("url(")
                        ? board.boardBackground
                        : "none",
                      backgroundColor: !board.boardBackground.startsWith("url(")
                        ? board.boardBackground
                        : "transparent",
                    }}
                  ></div>
                </picture>

                <p className="text-sm ">{board.boardTitle}</p>
              </Link>
            ))}
          </ul>
        </section>
      </nav>
    </aside>
  );
};
