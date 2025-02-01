import { industries } from '@/app/data/industries'
import React from 'react'
import OnboardingForm from './_components/OnboardingForm'
import { getUserOnBoardingStatus } from '@/actions/user'
import { redirect } from 'next/dist/server/api-utils'

const OnboardingPage =async  () => {
    const {isOnboarded} = await getUserOnBoardingStatus();
    if(isOnboarded){
        redirect("/dashboard")
    }
  return (
    <main>
        <OnboardingForm industries={industries} />
    </main>
  )
}

export default OnboardingPage