import ProgressBar from '@/components/molecules/ProgressBar'
import MoreInsightsUpdate from '@/components/organism/MoreInsightsUpdate/MoreInsightsUpdate'
import React from 'react'

export const MoreInsights = () => {
  return (
    <div>
        <ProgressBar counter={2} />
        <MoreInsightsUpdate />
    </div>
  )
}
export default MoreInsights