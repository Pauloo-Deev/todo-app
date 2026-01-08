import React from "react";
import { Plus } from "lucide-react";

interface TaskBackgroundComponentProps {
	status: "To Do" | "Doing" | "Done";
	children: React.ReactNode;
	onAddTask: (status: "To Do" | "Doing" | "Done") => void;
	onDropTask: (taskId: string, toStatus: "To Do" | "Doing" | "Done") => void;
}

const TaskBackgroundComponent: React.FC<TaskBackgroundComponentProps> = ({
	status,
	children,
	onAddTask,
	onDropTask,
}) => {
	const styles = {
		"To Do": {
			bg: "bg-slate-50",
			border: "border-slate-200",
			title: "text-slate-800",
			accent: "bg-slate-900/5",
		},
		Doing: {
			bg: "bg-sky-50",
			border: "border-sky-200",
			title: "text-sky-800",
			accent: "bg-sky-900/5",
		},
		Done: {
			bg: "bg-emerald-50",
			border: "border-emerald-200",
			title: "text-emerald-800",
			accent: "bg-emerald-900/5",
		},
	};

	const current = styles[status];
	const [isOver, setIsOver] = React.useState(false);

	return (
		<section
			className={`
        flex flex-col
        rounded-2xl border
        ${current.bg} ${current.border}
        shadow-sm
        transition-all duration-300
        hover:shadow-md
        min-h-[560px]
      `}
		>
			{/* Header */}
			<div className="px-4 py-4 border-b border-black/5">
				<div className="flex items-start justify-between gap-3">
					<div className="flex items-center gap-2">
						<h2 className={`text-base font-semibold ${current.title}`}>
							{status}
						</h2>
					</div>

					<button
						type="button"
						onClick={() => onAddTask(status)}
						className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 bg-white/70 border border-black/10 shadow-sm hover:bg-white hover:shadow transition focus:outline-none focus:ring-2 focus:ring-slate-400/40"
					>
						<Plus size={16} />
						Add Task
					</button>
				</div>

				<p className="mt-2 text-xs text-slate-500">
					Arraste os cards ou clique para levar para próxima etapa.
				</p>
			</div>

			<div
				className="flex-1 p-4"
				onDragOver={(e) => {
					e.preventDefault();
					e.dataTransfer.dropEffect = "move";
				}}
				onDragEnter={() => setIsOver(true)}
				onDragLeave={() => setIsOver(false)}
				onDrop={(e) => {
					e.preventDefault();
					const taskId = e.dataTransfer.getData("text/plain");
					setIsOver(false);
					if (taskId) onDropTask(taskId, status);
				}}
			>
				<div
					className={`rounded-xl p-2 ${current.accent} ${
						isOver ? "ring-2 ring-slate-400/40" : ""
					}`}
				>
					<div className="space-y-3 max-h-[420px] overflow-auto pr-1">
						{children}
					</div>
				</div>
			</div>
		</section>
	);
};

export default TaskBackgroundComponent;
