export type InputType =
    'text' |
    'email' |
    'password' |
    'number' |
    'tel' |
    'url' |
    'text-area' |
    'search' |
    'select' |
    'color' |
    'date' |
    'datetime-local' |
    'month';
export interface AtomicInput {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    type?: InputType;
    disabled?: boolean;
    className?: string;
    error?: boolean;
    errorMessage?: string;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    floatLabel?: boolean;
    autoComplete?: string;
}