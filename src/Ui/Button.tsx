import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "success" | "danger" | "warn" | "muted";

const tones: Record<ButtonVariant, { base: string; soft: string; border: string }> = {
	primary: {
		base: "var(--color-theme-primary)",
		soft: "var(--color-theme-primary-soft)",
		border: "var(--color-theme-primary-border)",
	},
	success: {
		base: "var(--color-theme-success)",
		soft: "var(--color-theme-success-soft)",
		border: "var(--color-theme-success-border)",
	},
	danger: {
		base: "var(--color-theme-danger)",
		soft: "var(--color-theme-danger-soft)",
		border: "var(--color-theme-danger-border)",
	},
	warn: {
		base: "var(--color-theme-warn)",
		soft: "var(--color-theme-warn-soft)",
		border: "var(--color-theme-warn-border)",
	},
	muted: {
		base: "var(--color-theme-muted)",
		soft: "var(--color-theme-muted-2)",
		border: "var(--color-theme-muted-border)",
	},
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	children: ReactNode;
}

export default function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
	const style = {
		"--tone": tones[variant].base,
		"--tone-soft": tones[variant].soft,
		"--tone-border": tones[variant].border,
	} as CSSProperties;

	return (
		<button
			style={style}
			className={twMerge(
				"inline-flex items-center justify-center",
				"gap-1.5 rounded-lg border px-3 py-2",
				"cursor-pointer text-xs font-medium transition-all",
				"duration-150 outline-none select-none",
				"text-theme-text",

				"text-(--tone)",
				"bg-(--tone-soft)",
				"border-(--tone-border)",
				"hover:bg-(--tone-soft)",
				"hover:border-(--tone)",
				"hover:shadow-[0_0_0_3px_color-mix(in_oklab,var(--tone)_25%,transparent)]",

				className,
			)}
			{...rest}
		>
			{children}
		</button>
	);
}
