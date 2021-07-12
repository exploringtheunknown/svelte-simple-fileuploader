export declare type FileUploaderOptions = {
    enabled?: boolean;
    dropEnabled?: boolean;
    implicitStyling?: boolean;
    allowedFileTypes?: string;
    imageCover?: boolean;
    borderStyle?: string;
};
export declare type HandleUploadedFilesPropsEventType = CustomEvent & {
    class: string;
    onfilesUploaded: (event: CustomEvent) => Promise<void>;
    id: string;
};
export default function fileUploader(node: HTMLElement, options?: FileUploaderOptions): {
    destroy(): void;
};
