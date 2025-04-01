export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type ColumnType = {
  id: string;
  title: string;
  taskIds: string[];
};

type BoardType = {
  tasks: Record<string, Task>;
  columns: Record<string, ColumnType>;
  columnOrder: string[];
  boardBackground: string;
};

export const boards: Record<string, BoardType> = {
  board1: {
    tasks: {
      task1: { id: "task1", title: "Task 1", completed: false },
      task2: { id: "task2", title: "Task 2", completed: false },
      task3: { id: "task3", title: "Task 3", completed: true },
      task4: { id: "task4", title: "Task 4", completed: false },
      task5: { id: "task5", title: "Task 5", completed: true },
      task6: { id: "task6", title: "Task 6", completed: false },
      task7: { id: "task7", title: "Task 7", completed: false },
      task8: { id: "task8", title: "Task 8", completed: true },
      task9: { id: "task9", title: "Task 9", completed: false },
      task10: { id: "task10", title: "Task 10", completed: true },
      task11: { id: "task11", title: "Task 11", completed: false },
      task12: { id: "task12", title: "Task 12", completed: false },
      task13: { id: "task13", title: "Task 13", completed: true },
      task14: { id: "task14", title: "Task 14", completed: false },
      task15: { id: "task15", title: "Task 15", completed: false },
      task16: { id: "task16", title: "Task 16", completed: true },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "Column 1",
        taskIds: ["task1", "task2", "task3", "task7", "task8"],
      },
      "column-2": {
        id: "column-2",
        title: "Column 2",
        taskIds: ["task4", "task5", "task6", "task9", "task10"],
      },
      "column-3": {
        id: "column-3",
        title: "Column 3",
        taskIds: ["task11", "task12", "task13"],
      },
      "column-4": {
        id: "column-4",
        title: "Column 4",
        taskIds: ["task14", "task15", "task16"],
      },
    },
    columnOrder: ["column-1", "column-2", "column-3", "column-4"],
    boardBackground:
      "https://tramvaj.rs/wp-content/uploads/2016/12/Coffee-wallpaper-hd-wallpapers-download.jpg",
  },
  board2: {
    tasks: {
      task1: { id: "task1", title: "Task 1", completed: false },
      task2: { id: "task2", title: "Task 2", completed: false },
      task3: { id: "task3", title: "Task 3", completed: true },
      task4: { id: "task4", title: "Task 4", completed: false },
      task5: { id: "task5", title: "Task 5", completed: true },
      task6: { id: "task6", title: "Task 6", completed: false },
      task7: { id: "task7", title: "Task 7", completed: false },
      task8: { id: "task8", title: "Task 8", completed: true },
      task9: { id: "task9", title: "Task 9", completed: false },
      task10: { id: "task10", title: "Task 10", completed: true },
      task11: { id: "task11", title: "Task 11", completed: false },
      task12: { id: "task12", title: "Task 12", completed: false },
      task13: { id: "task13", title: "Task 13", completed: true },
      task14: { id: "task14", title: "Task 14", completed: false },
      task15: { id: "task15", title: "Task 15", completed: false },
      task16: { id: "task16", title: "Task 16", completed: true },
      task17: { id: "task17", title: "Task 17", completed: false },
      task18: { id: "task18", title: "Task 18", completed: true },
      task19: { id: "task19", title: "Task 19", completed: false },
      task20: { id: "task20", title: "Task 20", completed: true },
      task21: { id: "task21", title: "Task 21", completed: false },
      task22: { id: "task22", title: "Task 22", completed: true },
      task23: { id: "task23", title: "Task 23", completed: false },
      task24: { id: "task24", title: "Task 24", completed: true },
      task25: { id: "task25", title: "Task 25", completed: false },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "Column 1",
        taskIds: ["task1", "task2", "task3", "task7", "task8"],
      },
      "column-2": {
        id: "column-2",
        title: "Column 2",
        taskIds: ["task4", "task5", "task6", "task9", "task10"],
      },
      "column-3": {
        id: "column-3",
        title: "Column 3",
        taskIds: ["task11", "task12", "task13"],
      },
      "column-4": {
        id: "column-4",
        title: "Column 4",
        taskIds: ["task14", "task15", "task16"],
      },
      "column-5": {
        id: "column-5",
        title: "Column 5",
        taskIds: ["task17", "task18", "task19"],
      },
      "column-6": {
        id: "column-6",
        title: "Column 6",
        taskIds: ["task20", "task21"],
      },
      "column-7": {
        id: "column-7",
        title: "Column 7",
        taskIds: ["task22", "task23", "task24"],
      },
      "column-8": {
        id: "column-8",
        title: "Column 8",
        taskIds: ["task25"],
      },
    },
    columnOrder: [
      "column-1",
      "column-2",
      "column-3",
      "column-4",
      "column-5",
      "column-6",
      "column-7",
      "column-8",
    ],
    boardBackground:
      "https://wallpapers.com/images/hd/blue-aesthetic-moon-df8850p673zj275y.jpg",
  },
};
