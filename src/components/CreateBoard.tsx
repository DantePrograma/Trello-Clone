import { FormEvent, RefObject, useState } from "react";
import { createPortal } from "react-dom";
import { boardsStore } from "../store/boardsStore";
import { useNavigate } from "react-router";

const backgrounds = [
  {
    bg: "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1467/d63a7f0c88d9ff99791d2eaf73cd4f3a/photo-1739992115892-36453a241b5e.webp)",
    bgColor: "#bbb0a7e6",
    headerBoardColor: "#ffffff3d",
    boardTextColor: "#172b4d",
    buttonsBackground: "#fafafa3c",
  },
  {
    bg: "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1701/483c90bb8b224193f6d0fd7d9212896e/photo-1739614621579-8f8f396c7412.webp)",
    bgColor: "#212b29e6",
    headerBoardColor: "#0000003d",
    boardTextColor: "#fff",
    buttonsBackground: "#ffffff3a",
  },
  {
    bg: "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/350dda08d977f92d756f3d9ec111ea66/photo-1521495084171-3ad639e3d525.jpg)",
    bgColor: "#463c32e6",
    headerBoardColor: "#0000003d",
    boardTextColor: "#fff",
    buttonsBackground: "#ffffff3a",
  },
  {
    bg: "url(https://www.concoursvehicles.co.uk/wp-content/uploads/2019/06/Porsche-911-GT2-RS-HD-Desktop-Wallpaper.jpg)",
    bgColor: "#282828c1",
    headerBoardColor: "#4e4e4ea6",
    boardTextColor: "#fff",
    buttonsBackground: "#282828c1",
  },
  {
    bg: "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1365x2048/6f91c645023910350769ddb5abe77465/photo-1739911013843-0380d6504480.webp)",
    bgColor: "#f5f5f5e6",
    headerBoardColor: "#ffffff3d",
    boardTextColor: "#000",
    buttonsBackground: "#ffffff3a",
  },
  {
    bg: "#0069a3",
    bgColor: "#0069a3",
    headerBoardColor: "",
    boardTextColor: "#fff",
    buttonsBackground: "#ffffff3a",
  },
  {
    bg: "#774d87",
    bgColor: "#774d87",
    headerBoardColor: "",
    boardTextColor: "#fff",
    buttonsBackground: "#ffffff3a",
  },
  {
    bg: " #00bf72",
    bgColor: "#093826b2",
    headerBoardColor: "",
    boardTextColor: "#fff",
    buttonsBackground: "#ffffff3a",
  },
  {
    bg: "#8c3c28",
    bgColor: "#800f0fa1",
    headerBoardColor: "",
    boardTextColor: "#fff",
    buttonsBackground: "#ffffff3a",
  },
];

type CreateBoardProps = {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  inset: string;
  ref: RefObject<null>;
};

export const CreateBoard = ({ setClose, inset, ref }: CreateBoardProps) => {
  const [selectedBackground, setSelectedBackground] = useState(backgrounds[0]);
  const [inputValue, setInputValue] = useState("");
  const { addBoard, boards } = boardsStore();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const boardTitle = formData.get("boardTitle") as string;

    if (boardTitle.trim() !== "") {
      addBoard(
        boardTitle,
        selectedBackground.bg,
        selectedBackground.bgColor,
        selectedBackground.headerBoardColor,
        selectedBackground.boardTextColor,
        selectedBackground.buttonsBackground
      );
      navigate(`/boards/board${Object.keys(boards).length + 1}`);
      setClose(false);
    }
  };

  return (
    <>
      {createPortal(
        <form
          ref={ref}
          onSubmit={handleSubmit}
          style={{ inset: inset }}
          className="w-[304px] h-[500px] z-99999 fixed border border-zinc-200 left-[265px] bg-white rounded-lg"
        >
          <header className="grid grid-cols-[32px_1fr_32px] relative items-center px-2 py-1 text-center">
            <p className="col-for-layout"></p>
            <h1 className="h-[40px] px-[32px] overflow-hidden text-[#44546f] text-[14px] font-semibold tracking-[-0.003em] leading-[40px] text-ellipsis whitespace-nowrap">
              Create a board
            </h1>

            <button
              type="button"
              onClick={() => setClose(false)}
              className=" hover:bg-[#DCDFE4] text-[#44546f] rounded-sm flex items-center justify-center w-[32px] h-[32px]  "
            >
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </button>
          </header>
          <section className="px-2">
            <div className="flex justify-center pb-2">
              <div
                className="w-[200px] h-[120px] bg-cover bg-center rounded-sm flex justify-center items-center"
                style={{
                  backgroundImage: selectedBackground.bg.startsWith("url(")
                    ? selectedBackground.bg
                    : "none",
                  backgroundColor: !selectedBackground.bg.startsWith("url(")
                    ? selectedBackground.bg
                    : "transparent",
                }}
              >
                <img
                  src="https://trello.com/assets/14cda5dc635d1f13bc48.svg"
                  alt="trello skeleton board"
                />
              </div>
            </div>
            <h1 className="text-[#44546f] text-[14px] font-semibold tracking-[-0.003em] leading-[40px]">
              Background
            </h1>
            <ul className="flex items-center justify-around flex-wrap">
              {backgrounds.map((background) => (
                <li key={background.bg}>
                  <button
                    type="button"
                    onClick={() => setSelectedBackground(background)}
                    className="h-12 w-20 bg-cover bg-center rounded-lg relative"
                    style={{
                      backgroundImage: background.bg.startsWith("url(")
                        ? background.bg
                        : "none",
                      backgroundColor: !background.bg.startsWith("url(")
                        ? background.bg
                        : "transparent",
                    }}
                  >
                    {background === selectedBackground && (
                      <span className="text-white absolute top-3 right-7">
                        <svg
                          width="24"
                          height="24"
                          role="presentation"
                          focusable="false"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.73534 12.3223C6.36105 11.9162 5.72841 11.8904 5.3223 12.2647C4.91619 12.639 4.89039 13.2716 5.26467 13.6777L8.87678 17.597C9.41431 18.1231 10.2145 18.1231 10.7111 17.6264C10.7724 17.5662 10.7724 17.5662 11.0754 17.2683C11.3699 16.9785 11.6981 16.6556 12.0516 16.3075C13.0614 15.313 14.0713 14.3169 15.014 13.3848L15.0543 13.3449C16.7291 11.6887 18.0004 10.4236 18.712 9.70223C19.0998 9.30904 19.0954 8.67589 18.7022 8.28805C18.309 7.90022 17.6759 7.90457 17.2881 8.29777C16.5843 9.01131 15.3169 10.2724 13.648 11.9228L13.6077 11.9626C12.6662 12.8937 11.6572 13.8889 10.6483 14.8825C10.3578 15.1685 10.0845 15.4375 9.83288 15.6851L6.73534 12.3223Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <div>
              <h1 className="text-[#44546f] text-[14px] font-semibold tracking-[-0.003em] leading-[25px] after:ml-1 after:text-red-500 after:content-['*']">
                Board Title
              </h1>

              <input
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                name="boardTitle"
                id="boardTitle"
                type="text"
                className="w-full h-10 px-2 border border-zinc-400 focus:outline-none invalid:border-red-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-500 text-[#172b4d] text-sm rounded-sm"
              />
            </div>

            <div className="flex justify-center items-center mt-3">
              <button
                disabled={inputValue.trim() === ""}
                type="submit"
                className="bg-blue-500 disabled:bg-white disabled:text-zinc-600 disabled:cursor-not-allowed text-white w-full text-center px-3 py-1.5 rounded text-sm"
              >
                Crear
              </button>
            </div>
          </section>
        </form>,
        document.body
      )}
    </>
  );
};
