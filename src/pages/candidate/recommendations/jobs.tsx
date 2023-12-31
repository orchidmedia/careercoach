import ProgressBar from '@/components/molecules/ProgressBar'
import JobsBoard from '@/components/organism/JobsBoard/JobsBoard'
import React from 'react'

export const Jobs = () => {
  return (
    <div>
        <ProgressBar counter={4} />
        <JobsBoard/>
    </div>
  ) 
}
export default Jobs