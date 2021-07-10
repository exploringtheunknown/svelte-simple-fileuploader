interface FileUploaderOptions {
    enabled?: boolean | true;
    dropEnabled?: boolean | true;
    allowedFileTypes?: string | undefined;
    imageCover?: boolean | false;
}

let uploaderArea;
let uploaderOptions;
let originalBorderStyle;
let originalCursorStyle;

const handeMouseOver = () => {
    uploaderArea.style.border = '1px #ccc dashed';
    uploaderArea.style.cursor = 'pointer';
}

const handleMouseOut = ()  => {
    uploaderArea.style.border = originalBorderStyle;
    uploaderArea.style.cursor = originalCursorStyle;
}

const handleUpload = (files) => {
    uploaderArea.dispatchEvent(new CustomEvent('filesUploaded', {
        detail: files
    }))

    if(uploaderOptions.imageCover && files && files.length > 0 && files[0].type.startsWith('image')) {
        const srcUrl = URL.createObjectURL(files[0]);
        uploaderArea.style.backgroundImage = `url('`+srcUrl+`')`;
    }
}

const handleMouseDown = (event) => {
    if(event.target != uploaderArea) {
        event.stopPropagation();
        return;
    }

    const f = document.createElement('input');
    f.style.display = 'none'
    f.type = 'file';
    f.name = 'file';
    f.accept = uploaderOptions.allowedFileTypes;
    f.addEventListener('mousedown', handleUpload);
    uploaderArea.appendChild(f);
    f.onchange = () => handleUpload(f.files);
    f.click();
}

const handleDrop = (event) => {
    const dt = event.dataTransfer;
    const files = dt.files;
    handleUpload(files);
}

const preventDefault = (e) => {
    e.preventDefault();
}

export default function fileUploader (node: HTMLElement, options: FileUploaderOptions) : unknown {
    uploaderArea = node;
    uploaderOptions = options;

    originalBorderStyle = window.getComputedStyle(node).border;
    originalCursorStyle = window.getComputedStyle(node).cursor;

    node.addEventListener('mouseover', handeMouseOver);
    node.addEventListener('mouseout', handleMouseOut);
    node.addEventListener('mousedown', handleMouseDown);
    node.addEventListener('dragenter', handeMouseOver);
    node.addEventListener('dragleave', handleMouseOut);
    node.addEventListener('drop', handleDrop);

    window.addEventListener('dragover', preventDefault, false);
    window.addEventListener('drop', preventDefault, false);

    return {
        destroy() {
            node.removeEventListener('mouseover', handeMouseOver);
            node.removeEventListener('mouseout', handleMouseOut);
            node.removeEventListener('mousedown', handleMouseDown);
            node.removeEventListener('dragenter', handeMouseOver);
            node.removeEventListener('dragleave', handleMouseOut);
            node.removeEventListener('drop', handleDrop);
        }
    }
}