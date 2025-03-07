import { useEffect, useRef, useState } from "react";
import { Add } from "../icons/Add";

type CreateColumnProps = {
  createColumn: (columnTitle: string) => void;
};

export const CreateColumn = ({ createColumn }: CreateColumnProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const createButtonRef = useRef<HTMLButtonElement | null>(null); // 🆕 Ref para el botón de creación

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        closeButtonRef.current &&
        !closeButtonRef.current.contains(event.target as Node) &&
        createButtonRef.current && // 🆕 Evita que se cierre al hacer clic en "Create Column"
        !createButtonRef.current.contains(event.target as Node)
      ) {
        setOpenModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (openModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [openModal]);

  return (
    <div className="w-[272px] p-1">
      {openModal ? (
        <div className="bg-[#F1F2F4] p-2 rounded-lg">
          <textarea
            ref={inputRef}
            className="py-2 px-3 w-full bg-white shadow-2xl rounded-sm text-sm  text-[#172b4d] border border-white focus:border-blue-400 focus:ring-1 focus:ring-blue-500 
             focus:outline-none disabled:opacity-50 disabled:pointer-events-none 
             resize-none overflow-hidden"
            autoFocus
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            placeholder="Task content"
            rows={1} // Establece una altura inicial mínima
            onInput={(e) => {
              e.currentTarget.style.height = "auto"; // Restablece la altura para calcular el nuevo tamaño
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Ajusta la altura al contenido
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Evita el salto de línea
                if (columnTitle.trim() !== "") {
                  createColumn(columnTitle);
                  setColumnTitle("");
                }
              }
            }}
          />

          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => {
                if (columnTitle.trim() !== "") {
                  createColumn(columnTitle);
                  setColumnTitle("");
                } else {
                  setOpenModal(false);
                  setColumnTitle("");
                }
              }}
              className="bg-[#0c66e4]  text-sm font-medium text-white py-1.5 px-3 rounded-[3px] "
            >
              Create Column
            </button>

            <button
              ref={closeButtonRef}
              className="text-gray-600 p-1 rounded hover:bg-zinc-300 transition duration-100"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <svg
                width="24"
                height="24"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-1.5 w-[272px] p-3 rounded-[12px] bg-white/25 text-white text-sm font-semibold"
          >
            <span>
              <Add />
            </span>
            Create column
          </button>
        </div>
      )}
    </div>
  );
};
