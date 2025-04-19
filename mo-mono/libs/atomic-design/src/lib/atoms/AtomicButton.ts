/**
 * Atomic Design - Button Component
 * **AtomicButton** BTn inspired by Atomic Design principles.
 * @interface AtomicButton
 * 
 */
export type ButtonType = 
    'primary' | 
    'secondary' | 
    'tertiary' | 
    'danger' | 
    'success' |
    'raised' |
    'outline' |
    'text' |
    'link' |
    'icon' |
    'icon-link' |
    'icon-text' |
    'flat' |
    'floating-action-button'
export interface AtomicButton {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    type?: ButtonType;
    icon?: string;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    loadingText?: string;
    loadingIcon?: string;
    disableRipple?: boolean;
    size?: 'small' | 'medium' | 'large';
    disabledInteractive?: boolean;
}