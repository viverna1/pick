import Panel from "@/Ui/Panel";
import { twMerge } from "tailwind-merge";

export default function Minimap() {
	return (
		<Panel className="flex flex-none flex-col">
			<p>Minimap</p>
			<div className="flex items-center gap-2">
				<span className="text-xs text-theme-muted">Масштаб</span>
				<input
					className={twMerge(
						"slider-thumb h-1 w-full cursor-pointer",
						"appearance-none rounded-full bg-zinc-800",
					)}
					type="range"
				/>
			</div>
		</Panel>
	);
}
