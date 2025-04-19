import { AtomicButton } from "../atoms/AtomicButton.js";
import { AtomicInput } from "../atoms/AtomicInput.js";

export interface MolecularSearch {
    input: AtomicInput;
    button: AtomicButton;
    onSearch: (value: string) => void;
    onClear: () => void;
    loading?: boolean;
    error?: boolean;
    errorMessage?: string;
    className?: string;    
}