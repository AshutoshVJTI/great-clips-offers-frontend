import CouponSearch from "@/components/coupon-search";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  return (
    <>
    <CouponSearch />
    <Analytics />
    </>
  );
}
