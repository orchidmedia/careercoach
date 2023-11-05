import ProgressBar from '@/components/molecules/ProgressBar'
import DropFiles from '@/components/organism/UploadResumen'
import { useState } from 'react';

const initialState = {
    fileDocument: "",
};

const UploadResumen = () => {
    const [document, setDocument] = useState<any>();

    return (
        <div>
            <ProgressBar/>
            <DropFiles documentPDF={document} setDocumentPDF={setDocument}/>
        </div>
    )
}
export default UploadResumen
