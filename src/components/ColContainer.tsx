import { Draggable, Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "./TaskCard";
import { ColumnType, Task } from "../initialData";
import { Add } from "../icons/Add";
import { useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type ColumnProps = {
  Column: ColumnType;
  index: number;
  Tasks: Task[];
  createTask: (columnId: string, content: string) => void;
  updateTask: (taskId: string) => void;
};

export const ColContainer = ({
  Column,
  index,
  Tasks,
  createTask,
  updateTask,
}: ColumnProps) => {
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const enableEditing = () => {
    setOpenCreateTaskModal(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setOpenCreateTaskModal(false);
  };

  const onKeyDow = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDow);
  useOnClickOutside(formRef, disableEditing);

  const handleSubmit = (formData: FormData) => {
    const taskContent = formData.get("taskContent") as string;

    if (taskContent.trim() !== "") {
      createTask(Column.id, taskContent);
      inputRef.current?.focus();
    } else {
      setOpenCreateTaskModal(false);
    }
  };

  return (
    <Draggable draggableId={Column.id} index={index}>
      {(provided, snapshot) => (
        <li
          className="p-1"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            className={`max-h-auto ${
              snapshot.isDragging
                ? "transition duration-100 rotate-4 bg-gradient-to-r from-[#F1F2F4] via-[#F1F2F4]/80  to-transparent opacity-70"
                : ""
            } shadow-2xl bg-[#F1F2F4] transition duration-150 mr-1 relative flex flex-col gap-2 rounded-2xl w-[260px] flex-shrink-0`}
          >
            <div
              {...provided.dragHandleProps}
              className="rounded-2xl absolute h-[30px] w-full "
            ></div>
            <Droppable droppableId={Column.id} type="task">
              {(provided, snapshot) => (
                <div
                  className={`h-full p-1.5 rounded-2xl border-2 ${
                    snapshot.isDraggingOver ? " border-blue-400 " : ""
                  } border-[#F1F2F4] transition duration-200  `}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div className="h-[35px] ">
                    <p className="text-sm pt-2 pb-2.5 pl-2.5 font-semibold text-[#172b4d]">
                      {Column.title}
                    </p>
                  </div>
                  <div className="h-[calc(100%-30px)] flex flex-col">
                    {Tasks.map((task, index) => (
                      <TaskCard
                        key={task.id}
                        Task={task}
                        index={index}
                        updateTask={updateTask}
                      />
                    ))}
                  </div>
                  {provided.placeholder}

                  {openCreateTaskModal ? (
                    <form action={handleSubmit} ref={formRef}>
                      <textarea
                        ref={inputRef}
                        name="taskContent"
                        id="taskContent"
                        className="py-2 px-3 w-full bg-white shadow-2xl rounded-lg text-sm  text-[#172b4d] border border-white focus:border-blue-400 focus:ring-1 focus:ring-blue-500 
             focus:outline-none disabled:opacity-50 disabled:pointer-events-none 
             resize-none overflow-hidden"
                        autoFocus
                        placeholder="Task content"
                        rows={2} // Establece una altura inicial mínima
                        onInput={(e) => {
                          e.currentTarget.style.height = "auto"; // Restablece la altura para calcular el nuevo tamaño
                          e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Ajusta la altura al contenido
                        }}
                      />

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="submit"
                          className="bg-[#0c66e4]  text-sm font-medium text-white py-1.5 px-3 rounded-[3px] "
                        >
                          Add task
                        </button>

                        <button
                          className="text-gray-600 p-1 rounded hover:bg-zinc-300 transition duration-100"
                          onClick={() => {
                            setOpenCreateTaskModal(false);
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
                              d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="w-full">
                      <button
                        onClick={enableEditing}
                        className="flex items-center gap-1.5 w-[100%] p-2 rounded-lg transition duration-100 hover:bg-blue-100 text-gray-500 hover:text-[#172b4d] "
                      >
                        <Add />
                        <span className="text-sm font-semibold">
                          Add new task
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>
        </li>
      )}
    </Draggable>
  );
};
