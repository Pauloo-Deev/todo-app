import React from "react";

const FooterComponent: React.FC = () => {
	return (
		<footer className="mt-auto">
			<div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
				<div className="backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
					<div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
						<p className="text-slate-200/80">
							© 2026 Todo App. Todos os direitos reservados.
						</p>

						<div className="hidden sm:flex items-center gap-4 text-slate-200/70">
							<span>Produtividade</span>
							<span>Organização</span>
							<span>Foco</span>
						</div>
					</div>

					<div className="h-px bg-white/10" />
				</div>
			</div>
		</footer>
	);
};

export default FooterComponent;
