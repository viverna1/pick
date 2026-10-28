import {
	useState,
	useRef,
	useEffect,
	useCallback,
	type Dispatch,
	type SetStateAction,
	type ChangeEvent,
	type DragEvent,
} from "react";

import Panel from "@/Ui/Panel";
import Button from "@/Ui/Button";
import { ImageIcon } from "@/Ui/Icons";
import { Key } from "@/Ui/Key";

interface ViewProps {
	color: string;
	setColor: Dispatch<SetStateAction<string>>;
}

// Функция для генерации случайного HEX-цвета
export const getRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

export default function View({ color, setColor }: ViewProps) {
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const acceptFile = useCallback((f: File | null | undefined) => {
		if (!f || !f.type.startsWith("image/")) return;
		setFile(f);
		setPreview(URL.createObjectURL(f));
	}, []);

	useEffect(() => {
		return () => {
			if (preview) URL.revokeObjectURL(preview);
		};
	}, [preview]);

	// Клик по label
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		acceptFile(e.target.files?.[0]);
		e.target.value = "";
	};

	// Drag + Drop
	const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};
	const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		setIsDragging(false);
	};
	const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		setIsDragging(false);
		acceptFile(e.dataTransfer.files?.[0]);
	};

	// Ctrl+V
	useEffect(() => {
		const onPaste = (e: ClipboardEvent) => {
			const item = Array.from(e.clipboardData?.items ?? []).find((i) =>
				i.type.startsWith("image/"),
			);
			if (item) acceptFile(item.getAsFile());
		};
		window.addEventListener("paste", onPaste);
		return () => window.removeEventListener("paste", onPaste);
	}, [acceptFile]);

	return (
		<Panel className="flex items-center justify-center">
			{preview ? (
				<img src={preview} alt="preview" className="min-h-40" />
			) : (
				<label
					htmlFor="image-upload"
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					className={[
						"flex aspect-video cursor-pointer flex-col items-center justify-center gap-1 p-5",
						"rounded-xl border border-theme-border transition-colors",
						"hover:border-theme-primary hover:shadow-[0_0_4px_1px] hover:shadow-theme-primary",
						isDragging ? "border-theme-primary shadow shadow-theme-primary" : "",
					].join(" ")}
				>
					<ImageIcon size={40} className="mb-1 text-theme-muted" />

					<span>Перетащите изображение сюда</span>

					<span className="text-sm text-theme-muted">
						или <span className="text-theme-primary underline">выберите файл</span>, либо вставьте
						через <Key>Ctrl</Key> + <Key>V</Key>
					</span>

					<input
						id="image-upload"
						ref={inputRef}
						type="file"
						accept="image/*"
						className="sr-only"
						onChange={handleChange}
					/>
				</label>
			)}
			<Button
				onClick={() => {
					setColor(getRandomColor());
				}}
			>
				Color
			</Button>
		</Panel>
	);
}
