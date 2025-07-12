## 🧾 Context
I'm developing a modern, responsive e-commerce using **Next.js 15, TailwindCSS, Zustand**, and the project follows the App Pages Router architecture (`/src`).

---

## 🔍 Objective
You (IA) should help me with:

- Reusable, accessible and optimized components
- Responsive design with TailwindCSS
- Global state management with Zustand
- Good UX/UI practices and clean code structure

---


## ✨ Best practices I want to follow

- Clean and modular code
- Decoupled and reusable components
- Avoid duplicate logic
- Use Zustand only for global UI and shared data
- Smooth transitions and animations
- Follow design system patterns that I made in the global @theme (tokens: `text-black-100`, `bg-white-100`, etc.)

---

## 📩 How you should respond

- Always use **Tailwind** for styles
- Use **Zustand** for global states (UI, cart, filters, etc.)
- Explain your reasoning if the task is complex
- Prioritize readability and reuse of components
- Keep file and directory names consistent
- You can suggest improvements if you see optimization opportunities

---

## ⚠️ What to avoid

- Don't use Redux or Context API
- Don't use `useEffect` where `useMemo` or `useCallback` are more appropriate
- Don't mix CSS animations with Framer Motion
- Do not use extra libraries unless extremely necessary

---

With these guidelines, help me build, improve and optimize this complex and scalable e-commerce.