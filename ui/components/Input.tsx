import { cn } from "@ui/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export function Input({ className, label, error, id, leftIcon, ...props }: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).slice(2)}`;

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-stone-700">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
            {leftIcon}
          </div>
        )}
        <input 
          id={inputId}
          className={cn(
            "input-field",
            leftIcon && "pl-10",
            error && "border-red-300 focus:border-red-400",
            className
          )} 
          {...props} 
        />
      </div>
      {error && <p className="text-xs text-red-600" role="alert">{error}</p>}
    </div>
  );
}

