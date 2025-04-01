import { Route, Routes } from "react-router";
import { boardsStore } from "../store/boardsStore";
import { LateralMenu } from "./LateralMenu";
import { PreBoard } from "./PreBoard";
import { Home } from "./Home";

export const Layout = () => {
  const { currentBoard } = boardsStore();

  // const initialBackground = "#30a63c";

  return (
    <div
      className="h-screen bg-cover bg-center font-primary w-full flex overflow-hidden"
      style={{
        backgroundImage: currentBoard?.boardBackground.startsWith("url(")
          ? currentBoard.boardBackground
          : "none",
        backgroundColor:
          currentBoard && !currentBoard?.boardBackground.startsWith("url(")
            ? currentBoard.boardBackground
            : "transparent",
      }}
    >
      <LateralMenu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards/:boardId" element={<PreBoard />} />
      </Routes>
    </div>
  );
};
