export declare type FileUploaderOptions = {
    enabled?: boolean;
    dropEnabled?: boolean;
    implicitStyling?: boolean;
    allowedFileTypes?: string;
    imageCover?: boolean;
    borderStyle?: string;
}

export declare type HandleUploadedFilesPropsEventType = CustomEvent & {
	class: string;
	onfilesUploaded: (event: CustomEvent) => Promise<void>;
	id: string;
};

export function fileUploader(node: HTMLElement, options: FileUploaderOptions) {

    const originalBorderStyle = window.getComputedStyle(node).border;
    const originalCursorStyle = window.getComputedStyle(node).cursor;
    
    const handeMouseOver = () => {
        node.style.border = options.borderStyle ?? '1px #ccc dashed';
        node.style.cursor = 'pointer';
    }
    
    const handleMouseOut = ()  => {
        node.style.border = originalBorderStyle;
        node.style.cursor = originalCursorStyle;
    }

    const handleUpload = (files?: FileList) => {
        node.dispatchEvent(
            new CustomEvent('filesUploaded', {
                detail: files
            })
        );
    
        if (
            options.imageCover &&
            files &&
            files.length > 0 &&
            files[0].type.startsWith('image')
        ) {
            const srcUrl = URL.createObjectURL(files[0]);
            node.style.backgroundImage = `url('` + srcUrl + `')`;
        }
    };
    
    const handleMouseDown = (event: MouseEvent) => {
        if (event.target != node) {
            event.stopPropagation();
            return;
        }
    
        const f = document.createElement('input');
        f.style.display = 'none';
        f.type = 'file';
        f.name = 'file';
        f.accept = options.allowedFileTypes;
        f.addEventListener('mousedown', () => handleUpload());
        node.appendChild(f);
        f.onchange = () => handleUpload(f.files);
        f.click();
    };
    
    const handleDrop = (event: DragEvent) => {
        const dt = event.dataTransfer;
        const files = dt.files;
        handleUpload(files);
    };
    
    const preventDefault = (e: DragEvent) => {
        e.preventDefault();
    };

    if (options.implicitStyling) {
        node.addEventListener('mouseover', handeMouseOver);
        node.addEventListener('mouseout', handleMouseOut);
        node.addEventListener('dragenter', handeMouseOver);
        node.addEventListener('dragleave', handleMouseOut);
    }
    

	node.addEventListener('mousedown', handleMouseDown);
	node.addEventListener('drop', handleDrop);

	window.addEventListener('dragover', preventDefault, false);
	window.addEventListener('drop', preventDefault, false);

	return {
		destroy() {
            if (options.implicitStyling) {
                node.removeEventListener('mouseover', handeMouseOver);
                node.removeEventListener('mouseout', handleMouseOut);
                node.removeEventListener('dragenter', handeMouseOver);
                node.removeEventListener('dragleave', handleMouseOut);
            }
			node.removeEventListener('mousedown', handleMouseDown);
			node.removeEventListener('drop', handleDrop);
		}
	};
}