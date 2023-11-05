import { Box } from '@mui/material';
import DropBox from './components/DropBox';
import ButtonsCandidateFlow from '@/components/molecules/ButtonsCandidateFlow';


const DropFiles = ({ documentPDF, setDocumentPDF }: any) => {
    return (
        <Box >
            <DropBox setDocumentPDF={setDocumentPDF} />
            <ButtonsCandidateFlow documentPDF={documentPDF} />
        </Box>
    )
}
export default DropFiles