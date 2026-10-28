import type { ReactNode, HTMLAttributes } from "react";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}

export default function Panel({ children, className = "", ...rest }: PanelProps) {
	return (
		<div
			className={[
				"flex-1 bg-theme-bg-elev p-3",
				"rounded-xl border border-theme-border",
				className,
			].join(" ")}
			{...rest}
		>
			{children}
		</div>
	);
}
