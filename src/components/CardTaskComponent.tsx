import React from "react";
import { Pencil } from "lucide-react";

interface CardTaskProps {
	id: string;
	title: string;
	description?: string;
	completed: boolean;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	onEdit?: (id: string) => void;
	draggable?: boolean;
	onDragStart?: (id: string) => void;
}

const CardTaskComponent: React.FC<CardTaskProps> = ({
	id,
	title,
	description,
	completed,
	onToggle,
	onDelete,
	onEdit,
	draggable = true,
	onDragStart,
}) => {
	return (
		<article
			draggable={draggable}
			onDragStart={(e) => {
				e.dataTransfer.setData("text/plain", id);
				e.dataTransfer.effectAllowed = "move";
				onDragStart?.(id);
			}}
			className={`group bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-grab active:cursor-grabbing ${
				completed ? "opacity-70" : ""
			}`}
		>
			<div className="p-4 space-y-2">
				<h3
					className={`text-sm font-semibold ${
						completed ? "line-through text-slate-400" : "text-slate-800"
					}`}
				>
					{title}
				</h3>

				{description && (
					<p
						className={`text-xs ${
							completed ? "text-slate-400" : "text-slate-500"
						}`}
					>
						{description}
					</p>
				)}
			</div>

			<div className="flex items-center justify-between px-4 py-2 border-t bg-slate-50">
				<button
					type="button"
					className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-200 cursor-pointer transition"
					onClick={() => onToggle(id)}
					aria-label={completed ? "Mark incomplete" : "Advance status"}
					title="Avançar"
				>
					{completed ? "✓" : "→"}
				</button>

				<button
					type="button"
					className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-300 text-slate-500 hover:bg-slate-200 cursor-pointer transition"
					onClick={() => onEdit?.(id)}
					aria-label="Edit task"
					title="Editar"
				>
					<Pencil size={16} />
				</button>

				<button
					type="button"
					className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-300 text-slate-400 hover:text-red-500 hover:bg-red-50 transition hover:border-red-300"
					onClick={() => onDelete(id)}
					aria-label="Delete task"
					title="Excluir"
				>
					✕
				</button>
			</div>
		</article>
	);
};

export { CardTaskComponent };
export default CardTaskComponent;
