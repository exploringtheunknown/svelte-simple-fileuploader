declare type FileUploaderOptions = {
    enabled?: boolean;
    dropEnabled?: boolean;
    implicitStyling?: boolean;
    allowedFileTypes?: string;
    imageCover?: boolean;
    borderStyle?: string;
};
declare type HandleUploadedFilesPropsEventType = CustomEvent & {
    class: string;
    onfilesUploaded: (event: CustomEvent) => Promise<void>;
    id: string;
};
declare function fileUploader(node: HTMLElement, options: FileUploaderOptions): {
    destroy(): void;
};

export { FileUploaderOptions, HandleUploadedFilesPropsEventType, fileUploader };
