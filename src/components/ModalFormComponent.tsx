import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { X } from "lucide-react";

export type TaskStatus = "To Do" | "Doing" | "Done";

export interface CreateTaskPayload {
	title: string;
	description?: string;
	status: TaskStatus;
}

interface ModalFormComponentProps {
	isOpen: boolean;
	defaultStatus?: TaskStatus;

	// Edit mode
	mode?: "create" | "edit";
	initialValues?: Partial<CreateTaskPayload>;

	onClose: () => void;
	onCreate: (payload: CreateTaskPayload) => void;
}

const ModalFormComponent: React.FC<ModalFormComponentProps> = ({
	isOpen,
	defaultStatus = "To Do",
	mode = "create",
	initialValues,
	onClose,
	onCreate,
}) => {
	const titleRef = useRef<HTMLInputElement | null>(null);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState<TaskStatus>(defaultStatus);
	const [touched, setTouched] = useState(false);

	const [mounted, setMounted] = useState(false);
	const [visible, setVisible] = useState(false);

	const titleError = useMemo(() => {
		if (!touched) return "";
		if (!title.trim()) return "O título é obrigatório.";
		if (title.trim().length < 3) return "Use pelo menos 3 caracteres.";
		return "";
	}, [title, touched]);

	useEffect(() => {
		if (isOpen) {
			setMounted(true);

			setVisible(false);

			setTitle(initialValues?.title ?? "");
			setDescription(initialValues?.description ?? "");
			setStatus((initialValues?.status as TaskStatus) ?? defaultStatus);
			setTouched(false);

			const tIn = window.setTimeout(() => {
				setVisible(true);
				titleRef.current?.focus();
			}, 20);

			return () => window.clearTimeout(tIn);
		}

		setVisible(false);

		const t = window.setTimeout(() => {
			setMounted(false);
			setTouched(false);
		}, 180);

		return () => window.clearTimeout(t);
	}, [isOpen, defaultStatus, initialValues]);

	const handleRequestClose = useCallback(() => {
		setTouched(false);
		onClose();
	}, [onClose]);

	useEffect(() => {
		if (!isOpen) return;

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") handleRequestClose();
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [isOpen, handleRequestClose]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setTouched(true);

		if (!title.trim() || title.trim().length < 3) return;

		onCreate({
			title: title.trim(),
			description: description.trim() ? description.trim() : undefined,
			status,
		});

		onClose();
	};

	if (!mounted) return null;

	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-10"
			role="dialog"
			aria-modal="true"
			aria-label={mode === "edit" ? "Editar tarefa" : "Criar tarefa"}
		>
			<button
				type="button"
				className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/45 backdrop-blur-sm"
				onClick={handleRequestClose}
				aria-label="Fechar modal"
			/>

			<div
				className={`relative w-full max-w-xl will-change-transform will-change-opacity transition-all duration-200 ease-out ${
					visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
				}`}
			>
				<div className="rounded-2xl bg-white/95 shadow-2xl  overflow-hidden ring-1 ring-black/5">
					{/* Header */}
					<div className="px-6 py-4 flex items-start justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900">
						<div>
							<h2 className="text-white text-lg font-semibold tracking-tight">
								{mode === "edit" ? "Editar tarefa" : "Nova tarefa"}
							</h2>
							<p className="text-slate-200/80 text-sm">
								{mode === "edit"
									? "Atualize os dados da tarefa."
									: "Preencha os dados e adicione ao seu quadro."}
							</p>
						</div>

						<button
							type="button"
							onClick={handleRequestClose}
							className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-white/30"
							aria-label="Fechar"
						>
							<X size={18} />
						</button>
					</div>

					<form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
						<div className="space-y-2">
							<label className="text-sm font-medium text-slate-700">
								Título <span className="text-red-500">*</span>
							</label>
							<input
								ref={titleRef}
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Ex.: Estudar Tailwind / Fazer deploy / Revisar PR..."
								className={`w-full rounded-xl border bg-slate-50/70 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 ${
									titleError
										? "border-red-300 focus:ring-2 focus:ring-red-400/30"
										: "border-slate-200 focus:ring-2 focus:ring-slate-400/30"
								}`}
							/>
							{titleError && (
								<p className="text-xs text-red-600">{titleError}</p>
							)}
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-slate-700">
								Descrição (opcional)
							</label>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Detalhes rápidos para lembrar depois..."
								rows={4}
								className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-relaxed outline-none transition focus:ring-2 focus:ring-slate-400/30 resize-none placeholder:text-slate-400"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-slate-700">
								Status
							</label>

							<div className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 p-1">
								<div className="grid grid-cols-3 gap-1">
									{(["To Do", "Doing", "Done"] as TaskStatus[]).map((s) => {
										const isActive = status === s;

										const dot =
											s === "To Do"
												? "bg-slate-400"
												: s === "Doing"
												? "bg-sky-500"
												: "bg-emerald-500";

										return (
											<button
												key={s}
												type="button"
												onClick={() => setStatus(s)}
												aria-pressed={isActive}
												className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-slate-400/30 ${
													isActive
														? "bg-white shadow text-slate-900"
														: "text-slate-600 hover:bg-white/60"
												}`}
											>
												<span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
												<span>{s}</span>
											</button>
										);
									})}
								</div>
							</div>

							<p className="text-xs text-slate-500">
								Dica: escolha em qual coluna a tarefa deve entrar.
							</p>
						</div>

						<div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100 mt-2 pt-4">
							<button
								type="button"
								onClick={handleRequestClose}
								className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-slate-400/30"
							>
								Cancelar
							</button>

							<button
								type="submit"
								className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 hover:brightness-110 transition shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400/30"
							>
								{mode === "edit" ? "Salvar alterações" : "Criar tarefa"}
							</button>
						</div>
					</form>
				</div>

				<div className="relative z-10">
					<p className="mt-3 text-center text-xs text-slate-200/80">
						Dica: pressione <span className="font-semibold">ESC</span> para
						fechar.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ModalFormComponent;
