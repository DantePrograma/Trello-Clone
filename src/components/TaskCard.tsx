import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../initialData";
import { CheckedCircle } from "../icons/CheckedCircle";
import { UncheckedCircle } from "../icons/UncheckedCircle";
import { Tooltip } from "./Tooltip";

type TaskProps = {
  Task: Task;
  index: number;
  updateTask: (taskId: string) => void;
};

export const TaskCard = ({ Task, index, updateTask }: TaskProps) => {
  return (
    <Draggable draggableId={Task.id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="border-2 border-white min-h-[36px] mb-2 flex gap-1 rounded-lg py-1 px-2 
             bg-white hover:border-2 hover:border-blue-400 shadow-2xl items-center"
        >
          {Task.completed ? (
            <Tooltip text="Mark as incomplete">
              <button
                onClick={() => updateTask(Task.id)}
                className="hover:cursor-pointer"
              >
                <CheckedCircle />
              </button>
            </Tooltip>
          ) : (
            <Tooltip text="Mark as completed">
              <button
                onClick={() => updateTask(Task.id)}
                className="hover:cursor-pointer"
              >
                <UncheckedCircle />
              </button>
            </Tooltip>
          )}
          <p
            className="text-sm text-[#172b4d] break-words w-[calc(100%-25px)]
 whitespace-normal"
          >
            {Task.title}
          </p>
        </div>
      )}
    </Draggable>
  );
};

// ${
//             snapshot.isDragging && "rotate-6 transition duration-700"
//           }
