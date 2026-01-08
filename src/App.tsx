import React, { useMemo, useState } from "react";

import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import TaskBackgroundComponent from "./components/TaskBackgroundComponent";
import { CardTaskComponent } from "./components/CardTaskComponent";
import ModalFormComponent, {
	CreateTaskPayload,
	TaskStatus,
} from "./components/ModalFormComponent";

type Task = {
	id: string;
	title: string;
	description?: string;
	status: TaskStatus;
	completed: boolean;
};

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalStatus, setModalStatus] = useState<TaskStatus>("To Do");
	const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
	const [modalInitialValues, setModalInitialValues] = useState<{
		title: string;
		description?: string;
		status: TaskStatus;
	} | null>(null);

	const [tasks, setTasks] = useState<Task[]>([
		{
			id: "1",
			title: "Sample Task",
			description: "Description Sample Task",
			status: "To Do",
			completed: false,
		},
		{
			id: "2",
			title: "Another Task",
			description: "Description Another Task",
			status: "Doing",
			completed: false,
		},
		{
			id: "3",
			title: "Completed Task",
			description: "Description Completed Task",
			status: "Done",
			completed: true,
		},
	]);

	const openModalForStatus = (status: TaskStatus) => {
		// create mode
		setEditingTaskId(null);
		setModalInitialValues(null);

		setModalStatus(status);
		setIsModalOpen(true);
	};

	const handleSubmitTask = (payload: CreateTaskPayload) => {
		// Editar
		if (editingTaskId) {
			setTasks((prev) =>
				prev.map((t) =>
					t.id === editingTaskId
						? {
								...t,
								title: payload.title,
								description: payload.description,
								status: payload.status,
								completed: payload.status === "Done",
						  }
						: t
				)
			);

			setEditingTaskId(null);
			setModalInitialValues(null);
			return;
		}

		// Criar
		const id =
			typeof crypto !== "undefined" && "randomUUID" in crypto
				? crypto.randomUUID()
				: String(Date.now());

		setTasks((prev) => [
			{
				id,
				title: payload.title,
				description: payload.description,
				status: payload.status,
				completed: payload.status === "Done",
			},
			...prev,
		]);
	};

	const handleToggle = (id: string) => {
		setTasks((prev) =>
			prev.map((t) => {
				if (t.id !== id) return t;

				let nextStatus: TaskStatus;

				if (t.status === "To Do") nextStatus = "Doing";
				else if (t.status === "Doing") nextStatus = "Done";
				else nextStatus = "To Do";

				return {
					...t,
					status: nextStatus,
					completed: nextStatus === "Done",
				};
			})
		);
	};

	const handleDropTask = (taskId: string, toStatus: TaskStatus) => {
		setTasks((prev) =>
			prev.map((t) =>
				t.id === taskId
					? { ...t, status: toStatus, completed: toStatus === "Done" }
					: t
			)
		);
	};

	const openEditModal = (taskId: string) => {
		const t = tasks.find((x) => x.id === taskId);
		if (!t) return;

		setModalInitialValues({
			title: t.title,
			description: t.description,
			status: t.status,
		});
		setEditingTaskId(taskId);
		setModalStatus(t.status);
		setIsModalOpen(true);
	};

	const handleDelete = (id: string) => {
		setTasks((prev) => prev.filter((t) => t.id !== id));
	};

	const tasksByStatus = useMemo(() => {
		return {
			"To Do": tasks.filter((t) => t.status === "To Do"),
			Doing: tasks.filter((t) => t.status === "Doing"),
			Done: tasks.filter((t) => t.status === "Done"),
		} as Record<TaskStatus, Task[]>;
	}, [tasks]);

	return (
		<div className="min-h-screen flex flex-col justify-between">
			<HeaderComponent />

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
				<TaskBackgroundComponent
					status="To Do"
					onAddTask={openModalForStatus}
					onDropTask={handleDropTask}
				>
					{tasksByStatus["To Do"].map((t) => (
						<CardTaskComponent
							key={t.id}
							id={t.id}
							title={t.title}
							description={t.description}
							completed={t.completed}
							onToggle={handleToggle}
							onEdit={openEditModal}
							onDelete={handleDelete}
						/>
					))}
				</TaskBackgroundComponent>

				<TaskBackgroundComponent
					status="Doing"
					onAddTask={openModalForStatus}
					onDropTask={handleDropTask}
				>
					{tasksByStatus.Doing.map((t) => (
						<CardTaskComponent
							key={t.id}
							id={t.id}
							title={t.title}
							description={t.description}
							completed={t.completed}
							onToggle={handleToggle}
							onEdit={openEditModal}
							onDelete={handleDelete}
						/>
					))}
				</TaskBackgroundComponent>

				<TaskBackgroundComponent
					status="Done"
					onAddTask={openModalForStatus}
					onDropTask={handleDropTask}
				>
					{tasksByStatus.Done.map((t) => (
						<CardTaskComponent
							key={t.id}
							id={t.id}
							title={t.title}
							description={t.description}
							completed={t.completed}
							onToggle={handleToggle}
							onEdit={openEditModal}
							onDelete={handleDelete}
						/>
					))}
				</TaskBackgroundComponent>
			</div>

			<ModalFormComponent
				isOpen={isModalOpen}
				defaultStatus={modalStatus}
				mode={editingTaskId ? "edit" : "create"}
				initialValues={modalInitialValues ?? undefined}
				onClose={() => {
					setIsModalOpen(false);
					setEditingTaskId(null);
					setModalInitialValues(null);
				}}
				onCreate={handleSubmitTask}
			/>

			<FooterComponent />
		</div>
	);
}

export default App;
