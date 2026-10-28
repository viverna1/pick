import type { CSSProperties } from "react";
import Panel from "@/Ui/Panel";
import { twMerge } from "tailwind-merge";

interface ColorProps {
	color: string;
}

export default function Color({ color }: ColorProps) {
	const style = {
		"--color": color,
	} as CSSProperties;

	return (
		<Panel style={style} className="flex flex-row gap-3 md:flex-col">
			<div
				className={twMerge(
					color ? "bg-(--color)" : "bg-checkerboard",
					"aspect-2/5 h-full w-auto",
					"rounded-lg border border-theme-border",
					"md:aspect-3/1 md:h-auto md:w-full",
				)}
			></div>
			<div className="flex flex-1 flex-col">
				<div className="flex flex-none gap-3 rounded-lg p-1 px-2">
					<span className="flex-none">HEX</span>
					<span className="flex-1">{color ? color : "-"}</span>
					<span className="flex-none">
						<button>C</button>
					</span>
				</div>
			</div>
		</Panel>
	);
}
