import React from "react";

interface HeaderProps {
	title?: string;
	subtitle?: string;
}

export const HeaderComponent: React.FC<HeaderProps> = ({
	title = "Todo App",
	subtitle = "Organize suas tarefas com foco e clareza.",
}) => {
	return (
		<header className="sticky top-0 z-50">
			<div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
				<div className="backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
					<div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center">
								<span className="text-white font-bold text-lg">✓</span>
							</div>

							<div className="leading-tight">
								<h1 className="text-white text-2xl font-semibold tracking-tight">
									{title}
								</h1>
								<p className="text-slate-200/80 text-sm">{subtitle}</p>
							</div>
						</div>

						<div className="hidden sm:flex items-center gap-2">
							<span className="text-slate-200/70 text-xs">
								Kanban • To Do • Doing • Done
							</span>
						</div>
					</div>
					<div className="h-px bg-white/10" />
				</div>
			</div>
		</header>
	);
};

export default HeaderComponent;
