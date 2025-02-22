import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnBoardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

import React from "react";
import Dashboard from "./_components/Dashboard";

const IndustryInsightsPage = async () => {
  const { isOnboarded } = await getUserOnBoardingStatus();
  const insights = await getIndustryInsights();

  if (!isOnboarded) {
    redirect("/onboarding");
  }
  return <div className="container mx-auto ">
    <Dashboard insights={insights} />
  </div>;
};

export default IndustryInsightsPage;
