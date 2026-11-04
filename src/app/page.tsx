import { Suspense } from "react";
import { Banner } from "@/components/home/banner";
import {
  NewArrivals,
  NewArrivalsSkeleton,
} from "@/components/home/new-arrivals";
import { HowItWorks } from "@/components/home/how-it-works";
import { TopCategories } from "@/components/home/top-categories";

export default function Home() {
  return (
    <div>
      <Banner />
      <Suspense fallback={<NewArrivalsSkeleton />}>
        <NewArrivals />
      </Suspense>
      <HowItWorks />
      <TopCategories />
    </div>
  );
}
