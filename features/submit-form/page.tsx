import { SubmitForm } from "./SubmitForm";

export const metadata = {
  title: "Добавить рецепт | Gastro Mood",
  description: "Поделитесь своим кулинарным шедевром с сообществом",
};

export default function SubmitPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Новый рецепт</h1>
          <p className="text-stone-500">Поделитесь своим шедевром с сообществом Gastro Mood</p>
        </div>
        <SubmitForm />
      </div>
    </div>
  );
}

