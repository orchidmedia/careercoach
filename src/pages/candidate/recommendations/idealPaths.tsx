import ProgressBar from '@/components/molecules/ProgressBar'
import RecommendationsIdealList from '@/components/organism/RecommendationsIdealList'
import React from 'react'

const IdealPaths = (props:any) => {
  return (
    <div>
      <ProgressBar counter={2}/>
      <RecommendationsIdealList data={props?.router?.query}/>
    </div>
  )
}
export default IdealPaths