"use client";

export default function Error({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string }; 
  reset: () => void; 
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
      <p className="text-red-600 text-center">
        {error.message || "Что-то пошло не так"}
      </p>
      <button 
        onClick={reset} 
        className="btn-secondary"
        aria-label="Повторить попытку"
      >
        Повторить
      </button>
    </div>
  );
}

