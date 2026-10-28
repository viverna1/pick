import { useState } from "react";

import View from "./View";
import Minimap from "./Minimap";
import Color from "./Color";
import TicTakToe from "@/Widgets/TicTakToe";

export default function Main() {
  const [color, setColor] = useState<string>("");
  return (
    <div className="flex flex-1 flex-col gap-(--gap) md:flex-row">
      <View color={color} setColor={setColor} />
      <div className="flex flex-row w-auto h-40 gap-(--gap) md:flex-col md:w-80 md:h-auto">
        <Minimap />
        <Color color={color} />
        <TicTakToe />
      </div>
    </div>
  );
}
