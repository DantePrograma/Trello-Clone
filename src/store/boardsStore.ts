import { create } from "zustand";

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

export type BoardType = {
  boardTitle: string;
  tasks: Record<string, Task>;
  columns: Record<string, ColumnType>;
  columnOrder: string[];
  boardBackground: string;
  boardColor: string;
  headerBoardColor: string;
  boardTextColor: string;
  buttonsBackground: string;
};

type BoardsStoreType = {
  currentBoardId: string | null;
  currentBoard: BoardType | null;
  setCurrentBoard: (boardId: string | null) => void;
  boards: Record<string, BoardType>;
  updateBoard: (boardId: string, newBoard: BoardType) => void;
  addBoard: (
    boardTitle: string,
    boardBackground: string,
    boardColor: string,
    headerBoardColor: string,
    boardTextColor: string,
    buttonsBackground: string
  ) => void;
  updateBoardTitle: (newBoardTitle: string, boardId: string) => void;
};

export const boardsStore = create<BoardsStoreType>((set) => ({
  boards: {
    // board1: {
    //   boardTitle: "Board 1",
    //   tasks: {},
    //   columns: {},
    //   columnOrder: [],
    //   boardBackground:
    //     "url(https://www.concoursvehicles.co.uk/wp-content/uploads/2019/06/Porsche-911-GT2-RS-HD-Desktop-Wallpaper.jpg)",
    //   boardColor: "#232323cd",
    //   headerBoardColor: "#4e4e4ea6",
    //   boardTextColor: "#fff",
    //   buttonsBackground: "",
    // },
    // board2: {
    //   boardTitle: "Board 2",
    //   tasks: {},
    //   columns: {},
    //   columnOrder: [],
    //   boardBackground:
    //     "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1365x2048/818bb4fbb39509d4a6f7db9d0d50d454/photo-1735370436237-779239d71e8e.webp)",
    //   boardColor: "#141617c9",
    //   headerBoardColor: "#0000003d",
    //   boardTextColor: "#fff",
    //   buttonsBackground: "",
    // },
    // board3: {
    //   boardTitle: "Board 3",
    //   tasks: {},
    //   columns: {},
    //   columnOrder: [],
    //   boardBackground:
    //     "url(https://www.concoursvehicles.co.uk/wp-content/uploads/2019/06/Porsche-911-GT2-RS-HD-Desktop-Wallpaper.jpg)",
    //   boardColor: "#232323cd",
    //   headerBoardColor: "#4e4e4ea6",
    //   boardTextColor: "#fff",
    //   buttonsBackground: "",
    // },
    // board4: {
    //   boardTitle: "Board 4",
    //   tasks: {},
    //   columns: {},
    //   columnOrder: [],
    //   boardBackground:
    //     "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1365x2048/818bb4fbb39509d4a6f7db9d0d50d454/photo-1735370436237-779239d71e8e.webp)",
    //   boardColor: "#141617c9",
    //   headerBoardColor: "#0000003d",
    //   boardTextColor: "#fff",
    //   buttonsBackground: "",
    // },
    // board5: {
    //   boardTitle: "Board 5",
    //   tasks: {},
    //   columns: {},
    //   columnOrder: [],
    //   boardBackground:
    //     "url(https://www.concoursvehicles.co.uk/wp-content/uploads/2019/06/Porsche-911-GT2-RS-HD-Desktop-Wallpaper.jpg)",
    //   boardColor: "#232323cd",
    //   headerBoardColor: "#4e4e4ea6",
    //   boardTextColor: "#fff",
    //   buttonsBackground: "",
    // },
    // board6: {
    //   boardTitle: "Board 6",
    //   tasks: {},
    //   columns: {},
    //   columnOrder: [],
    //   boardBackground:
    //     "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1365x2048/818bb4fbb39509d4a6f7db9d0d50d454/photo-1735370436237-779239d71e8e.webp)",
    //   boardColor: "#141617c9",
    //   headerBoardColor: "#0000003d",
    //   boardTextColor: "#fff",
    //   buttonsBackground: "",
    // },
  },
  currentBoardId: null, // Guardar el ID actual
  currentBoard: null,

  setCurrentBoard: (boardId: string | null) =>
    set((state) => ({
      currentBoardId: boardId,
      currentBoard: boardId ? state.boards[boardId] : null,
    })),

  updateBoard: (boardId, newBoard) =>
    set((state) => {
      const updatedBoards = {
        ...state.boards,
        [boardId]: newBoard,
      };

      return {
        boards: updatedBoards,
        currentBoard:
          state.currentBoardId === boardId ? newBoard : state.currentBoard,
      };
    }),
  addBoard: (
    boardTitle,
    boardBackground,
    boardColor,
    headerBoardColor,
    boardTextColor,
    buttonsBackground
  ) =>
    set((state) => {
      const newBoard = {
        boardTitle,
        tasks: {},
        columns: {},
        columnOrder: [],
        boardBackground,
        boardColor,
        headerBoardColor,
        boardTextColor,
        buttonsBackground,
      };

      const boardId = `board${Object.keys(state.boards).length + 1}`;

      return {
        boards: {
          ...state.boards,
          [boardId]: newBoard,
        },
      };
    }),
  updateBoardTitle: (newBoardTitle, boardId) =>
    set((state) => {
      const updatedBoards = {
        ...state.boards,
        [boardId]: {
          ...state.boards[boardId],
          boardTitle: newBoardTitle,
        },
      };

      return {
        boards: updatedBoards,
      };
    }),
}));
