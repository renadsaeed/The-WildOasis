
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getStaysTodayActivity } from '../../services/apiBookings'

const useTodayActivity = () => {
const {data:todayActivities , isLoading , error}=useQuery({
    queryFn: getStaysTodayActivity ,
    queryKey:['todayActivity'],
});
return {todayActivities , isLoading};
}

export default useTodayActivity
