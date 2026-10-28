import { useState } from "react";
import Panel from "@/Ui/Panel";
import Button from "@/Ui/Button";

type Player = "X" | "O";
type SquareValue = Player | null;

interface SquareProps {
	value: SquareValue;
	onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
	return (
		<button
			className="-mr-px -mb-px aspect-square min-w-0 flex-1 overflow-hidden border text-center text-xl font-bold"
			onClick={onSquareClick}
		>
			{value}
		</button>
	);
}

interface BoardProps {
	className?: string;
	xIsNext: boolean;
	squares: SquareValue[];
	onPlay: (nextSquares: SquareValue[]) => void;
}

function Board({ className = "", xIsNext, squares, onPlay }: BoardProps) {
	function handleClick(i: number) {
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = "X";
		} else {
			nextSquares[i] = "O";
		}
		onPlay(nextSquares);
	}

	const winner = calculateWinner(squares);
	let status: string;
	if (winner) {
		status = "Winner: " + winner;
	} else {
		status = "Next: " + (xIsNext ? "X" : "O");
	}

	return (
		<div className={"flex min-h-0 flex-1 flex-col gap-3 " + className}>
			<div>{status}</div>
			<div className="flex aspect-square min-h-0 w-full max-w-full flex-1 flex-col">
				<div className="flex flex-1">
					<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
					<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
					<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
				</div>
				<div className="flex flex-1">
					<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
					<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
					<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
				</div>
				<div className="flex flex-1">
					<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
					<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
					<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
				</div>
			</div>
		</div>
	);
}

export default function TicTakToe() {
	const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares: SquareValue[]) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove: number) {
		setCurrentMove(nextMove);
	}

	const moves = history.map((_squares, move) => {
		return (
			<li key={move}>
				<Button onClick={() => jumpTo(move)} className="aspect-square h-6 rounded-md p-1">
					{move}
				</Button>
			</li>
		);
	});

	return (
		<Panel className="flex flex-none flex-col gap-3">
			<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			<ol className="flex gap-1">{moves}</ol>
		</Panel>
	);
}

function calculateWinner(squares: SquareValue[]): Player | null {
	const lines: number[][] = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}
