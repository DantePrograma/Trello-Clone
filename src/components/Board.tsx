import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";
import { ColumnContainer } from "./ColumnContainer";
import { boards, BoardType, ColumnType, Task } from "../initialData";
import { LateralMenu } from "./LateralMenu";
import { CreateColumn } from "./CreateColumn";

export const Board = () => {
  const [data, setData] = useState<BoardType>(boards["board2"]);

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
      const newColumnOrder = [...data.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newData = {
        ...data,
        columnOrder: newColumnOrder,
      };
      setData(newData);
      return;
    }

    const currentColumn = data.columns[source.droppableId];
    const targetColumn = data.columns[destination.droppableId];

    if (currentColumn === targetColumn) {
      const newTaskIds = [...currentColumn.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...currentColumn,
        taskIds: newTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [currentColumn.id]: newColumn,
        },
      };

      setData(newData);
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
      ...data,
      columns: {
        ...data.columns,
        [currentColumn.id]: newStart,
        [targetColumn.id]: newFinish,
      },
    };

    setData(newData);
  };

  // add or delete tasks or columns functions

  const createColumn = (columnTitle: string) => {
    const columnsLength = data.columnOrder.length + 1;
    const columnId = `column-${columnsLength.toString()}`;
    const newColumn: Record<string, ColumnType> = {
      [columnId]: {
        id: columnId,
        title: columnTitle,
        taskIds: [],
      },
    };
    const newData = {
      ...data,
      columns: {
        ...data.columns,
        ...newColumn,
      },
      columnOrder: [...data.columnOrder, columnId],
    };

    setData(newData);
  };

  const createTask = (columnId: string, content: string) => {
    const tasksLength = Object.keys(data.tasks).length + 1;
    const taskId = `task${tasksLength.toString()}`;
    const newTask: Record<string, Task> = {
      [taskId]: {
        id: taskId,
        title: content,
        completed: false,
      },
    };
    const newData = {
      ...data,
      tasks: {
        ...data.tasks,
        ...newTask,
      },
      columns: {
        ...data.columns,
        [columnId]: {
          ...data.columns[columnId],
          taskIds: [...data.columns[columnId].taskIds, taskId],
        },
      },
    };

    setData(newData);
  };

  const updateTask = (taskId: string) => {
    const newTask = data.tasks[taskId];

    const isTaskCompleted = newTask.completed;
    if (isTaskCompleted) {
      newTask.completed = false;
    } else {
      newTask.completed = true;
    }

    const newData = {
      ...data,
      tasks: {
        ...data.tasks,
        [taskId]: newTask,
      },
    };

    setData(newData);
  };

  return (
    <div className="h-screen bg-[url('https://tramvaj.rs/wp-content/uploads/2016/12/Coffee-wallpaper-hd-wallpapers-download.jpg')] bg-cover bg-center font-primary w-full grid grid-cols-[250px_minmax(900px,_1fr)]">
      <nav className="nachei text-white h-full">
        <LateralMenu />
      </nav>

      <main className="flex flex-col">
        <div className="h-[65px] flex gap-1.5 items-center border-b border-b-gray-600 bg-blue-900"></div>

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
                  {data.columnOrder.map((col, index) => (
                    <ColumnContainer
                      updateTask={updateTask}
                      index={index}
                      key={data.columns[col].id}
                      Column={data.columns[col]}
                      createTask={createTask}
                      Tasks={data.columns[col].taskIds.map(
                        (taskId) => data.tasks[taskId]
                      )}
                    />
                  ))}
                  {provided.placeholder}

                  <div className="w-[272px] ">
                    <CreateColumn createColumn={createColumn} />
                  </div>
                </ol>
              )}
            </Droppable>
          </DragDropContext>
        </section>
      </main>
    </div>
  );
};
