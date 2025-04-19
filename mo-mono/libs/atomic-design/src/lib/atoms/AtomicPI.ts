export interface AtomicProgressIndicator {
    type: 'linear' | 'spinner';
    value?: number; // For linear progress indicator
    size?: number; // For spinner progress indicator
    radius?: number; // For spinner progress indicator
    mode?: 'determinate' | 'indeterminate'; // For linear & spinner progress indicator
}