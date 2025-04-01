import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { boardsStore } from "../store/boardsStore";
import { ColumnType, Task } from "../initialData";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ColContainer } from "./ColContainer";
import { CreateCol } from "./CreateCol";

type BoardProps = {
  boardId: string;
};

export const Board = ({ boardId }: BoardProps) => {
  const {
    currentBoard,
    currentBoardId,
    updateBoard,
    setCurrentBoard,
    updateBoardTitle,
  } = boardsStore();
  const [openTitleModal, setOpenTitleModal] = useState(false);

  const [title, setTitle] = useState(currentBoard?.boardTitle);

  const initialTitle = useRef(currentBoard?.boardTitle);

  useEffect(() => {
    setCurrentBoard(boardId);
    setTitle(currentBoard?.boardTitle);
    initialTitle.current = currentBoard?.boardTitle;
  }, [boardId, setCurrentBoard, currentBoard?.boardTitle]);

  if (!currentBoard || !currentBoardId) return <div>Board not found</div>;

  //drag and drop functions

  const onDragEnd = (event: DropResult<string>) => {
    const { destination, source, draggableId, type } = event;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = [...currentBoard.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newData = {
        ...currentBoard,
        columnOrder: newColumnOrder,
      };
      updateBoard(boardId, newData);
      return;
    }

    const currentColumn = currentBoard.columns[source.droppableId];
    const targetColumn = currentBoard.columns[destination.droppableId];

    if (currentColumn === targetColumn) {
      const newTaskIds = [...currentColumn.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...currentColumn,
        taskIds: newTaskIds,
      };

      const newData = {
        ...currentBoard,
        columns: {
          ...currentBoard.columns,
          [currentColumn.id]: newColumn,
        },
      };

      updateBoard(boardId, newData);
      return;
    }

    //moving a tasks to a another column
    const startTaskIds = [...currentColumn.taskIds];
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...currentColumn,
      taskIds: startTaskIds,
    };
    const finishTaskIds = [...targetColumn.taskIds];
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...targetColumn,
      taskIds: finishTaskIds,
    };

    const newData = {
      ...currentBoard,
      columns: {
        ...currentBoard.columns,
        [currentColumn.id]: newStart,
        [targetColumn.id]: newFinish,
      },
    };

    updateBoard(boardId, newData);
  };

  // add or delete tasks or columns functions

  const createColumn = (columnTitle: string) => {
    const columnsLength = currentBoard.columnOrder.length + 1;
    const columnId = `column-${columnsLength.toString()}`;
    const newColumn: Record<string, ColumnType> = {
      [columnId]: {
        id: columnId,
        title: columnTitle,
        taskIds: [],
      },
    };
    const newData = {
      ...currentBoard,
      columns: {
        ...currentBoard.columns,
        ...newColumn,
      },
      columnOrder: [...currentBoard.columnOrder, columnId],
    };

    updateBoard(boardId, newData);
  };

  const createTask = (columnId: string, content: string) => {
    const tasksLength = Object.keys(currentBoard.tasks).length + 1;
    const taskId = `task${tasksLength.toString()}`;
    const newTask: Record<string, Task> = {
      [taskId]: {
        id: taskId,
        title: content,
        completed: false,
      },
    };
    const newData = {
      ...currentBoard,
      tasks: {
        ...currentBoard.tasks,
        ...newTask,
      },
      columns: {
        ...currentBoard.columns,
        [columnId]: {
          ...currentBoard.columns[columnId],
          taskIds: [...currentBoard.columns[columnId].taskIds, taskId],
        },
      },
    };

    updateBoard(boardId, newData);
  };

  const updateTask = (taskId: string) => {
    const newTask = currentBoard.tasks[taskId];

    const isTaskCompleted = newTask.completed;
    if (isTaskCompleted) {
      newTask.completed = false;
    } else {
      newTask.completed = true;
    }

    const newData = {
      ...currentBoard,
      tasks: {
        ...currentBoard.tasks,
        [taskId]: newTask,
      },
    };

    updateBoard(boardId, newData);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const boardTitle = formData.get("boardTitle") as string;

    if (boardTitle.trim() !== "" && title) {
      updateBoardTitle(title, currentBoardId);
      setOpenTitleModal(false);
    } else {
      setTitle(initialTitle.current);
      setOpenTitleModal(false);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.form?.requestSubmit(); // Envia el formulario respetando validaciones
  };

  return (
    <main className="flex flex-col w-full">
      <div
        style={{
          background: currentBoard.headerBoardColor,
          // borderBottom: `1px solid ${currentBoard?.boardTextColor}`,
        }}
        className="h-[65px] shadow-[0px_0.5px_3px_0px_#242424bd]"
      >
        <div className="w-full h-full flex items-center specialHeaderBackground2 pl-2">
          {openTitleModal ? (
            <form className="" onSubmit={handleSubmit}>
              <input
                style={{
                  width: title ? `${title?.length + 2}ch` : "2ch",
                }}
                className="text-[#172B4D] bg-white text-lg font-bold outline-none rounded-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-500 py-1 px-2 "
                autoFocus
                name="boardTitle"
                id="boardTitle"
                onBlur={handleBlur}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </form>
          ) : (
            <button onClick={() => setOpenTitleModal(true)}>
              <h1 className="text-white text-lg font-bold py-1 px-2 hover:bg-[#ffffff29] rounded-sm">
                {title}
              </h1>
            </button>
          )}
        </div>
      </div>

      <section className="grow relative">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <ol
                className="bottom-0 left-0 top-0 overflow-x-auto overflow-y-auto pt-2 pl-2 absolute right-0 select-none whitespace-nowrap flex "
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {currentBoard.columnOrder.map((col, index) => (
                  <ColContainer
                    updateTask={updateTask}
                    index={index}
                    key={currentBoard.columns[col].id}
                    Column={currentBoard.columns[col]}
                    createTask={createTask}
                    Tasks={currentBoard.columns[col].taskIds.map(
                      (taskId) => currentBoard.tasks[taskId]
                    )}
                  />
                ))}
                {provided.placeholder}

                <div className="w-[272px]">
                  <CreateCol createColumn={createColumn} />
                </div>
              </ol>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </main>
  );
};
