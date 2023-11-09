import ProgressBar from '@/components/molecules/ProgressBar'
import DreamJobPront from '@/components/organism/DreamJobPront'
import React from 'react'

const DreamJob = () => {
    return (
        <div>
            <ProgressBar counter={2}/>
            <DreamJobPront />
        </div>
    )
}
export default DreamJob