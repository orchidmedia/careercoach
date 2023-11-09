import ProgressBar from '@/components/molecules/ProgressBar'
import RecommendationsPath from '@/components/organism/RecommendationsPath'
import React, { useEffect, useState } from 'react'

const Recommendations = (props: any) => {

    const [careers, setCareers]:any = useState();

    const handleSaveCareers = (careersData: any) => {
        if (careersData) {
            setCareers(careersData)
        } else {
            const localData = localStorage.getItem('recommendations')
            setCareers(JSON.parse(localData as any))
        }
    }

    useEffect(() => {
        handleSaveCareers(props?.router?.query.careers)
    }, [props?.router?.query]);
    return (
        <div>
            <ProgressBar counter={3} />
            <RecommendationsPath careers={careers} />
        </div>
    )
}
export default Recommendations