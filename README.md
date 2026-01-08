# Todo App (Kanban) — React + TypeScript + Tailwind

Aplicação de tarefas estilo **Kanban** com 3 colunas (**To Do**, **Doing**, **Done**), permitindo **criar, editar, excluir**, avançar status e **arrastar e soltar** tarefas entre colunas.  
Foco em **UI/UX elegante**, componentes reutilizáveis e código limpo com **TypeScript**.

---

## ✨ Funcionalidades

- ✅ Criar tarefas via modal
- ✏️ Editar tarefas (modal pré-preenchida)
- 🗑️ Excluir tarefas
- 🔁 Avançar status (To Do → Doing → Done → To Do)
- 🧲 Drag & Drop (arrastar e soltar cards entre colunas)
- 🎬 Modal com animação de entrada/saída
- 🎨 Layout moderno com Tailwind CSS
- ♿ Melhorias de acessibilidade (labels, aria, foco)

---

## 🧰 Tecnologias

- **React**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (ícones)

---

## 📸 Preview

> Adicione aqui prints do projeto (recomendado)

- `./docs/preview-1.png`
- `./docs/preview-2.png`

---

## 🚀 Como rodar localmente

### 1) Clonar o repositório

```bash
git clone <URL_DO_SEU_REPO>
cd todo-app
```

2. Instalar dependências

# Todo App (Kanban) — React + TypeScript + Tailwind

Aplicação de tarefas estilo **Kanban** com 3 colunas (**To Do**, **Doing**, **Done**), permitindo **criar, editar, excluir**, avançar status e **arrastar e soltar** tarefas entre colunas.  
Foco em **UI/UX elegante**, componentes reutilizáveis e código limpo com **TypeScript**.

---

## ✨ Funcionalidades

- ✅ Criar tarefas via modal
- ✏️ Editar tarefas (modal pré-preenchida)
- 🗑️ Excluir tarefas
- 🔁 Avançar status (To Do → Doing → Done → To Do)
- 🧲 Drag & Drop (arrastar e soltar cards entre colunas)
- 🎬 Modal com animação de entrada/saída
- 🎨 Layout moderno com Tailwind CSS
- ♿ Melhorias de acessibilidade (labels, aria, foco)

---

## 🧰 Tecnologias

- **React**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (ícones)

---

## 📸 Preview

> Adicione aqui prints do projeto (recomendado)

- `./docs/preview-1.png`
- `./docs/preview-2.png`

---

## 🚀 Como rodar localmente

### 1) Clonar o repositório

```bash
git clone <URL_DO_SEU_REPO>
cd todo-app
```

### 2) Instalar dependências

```bash
npm install
```

### 3) Rodar o projeto

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```

_(ou a porta exibida no terminal)_

---

## 🗂️ Estrutura do projeto (resumo)

```text
src/
 ├─ components/
 │   ├─ HeaderComponent
 │   ├─ FooterComponent
 │   ├─ TaskBackgroundComponent   # Colunas + Drop Zones
 │   ├─ CardTaskComponent         # Cards + Drag + Edit
 │   └─ ModalFormComponent        # Create/Edit com animações
 ├─ App.tsx                       # Estado principal e regras do board
 └─ main.tsx
```

---

## 💡 Próximas melhorias

- Persistência de dados (LocalStorage / Firebase / API)
- Reordenação manual de cards dentro da mesma coluna
- Sistema de prioridades
- Filtros e busca de tarefas
- Datas de entrega e notificações

---

## 📝 Licença

Este projeto é livre para fins educacionais e evolução pessoal.
