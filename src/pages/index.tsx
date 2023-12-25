import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  const allSubscriptions = api.post.getAllSubscription.useQuery();

  // 現在の総課金金額計算関数
  function calculateTotalBilling(
    contractedAt: Date,
    billingType: string,
    billingInterval: number,
    fee: number,
  ): number {
    const currentDate = new Date();
    let billingSums = 0;

    // 課金タイプ表示関数
    switch (billingType) {
      case "DAILY":
        const diffTimeDaily = currentDate.getTime() - contractedAt.getTime();
        const diffDays = Math.floor(diffTimeDaily / (1000 * 60 * 60 * 24));
        billingSums = Math.floor(diffDays / billingInterval);
        break;
      case "MONTHLY":
        const months =
          (currentDate.getFullYear() - contractedAt.getFullYear()) * 12 +
          currentDate.getMonth() -
          contractedAt.getMonth();
        if (currentDate.getDate() >= billingInterval) {
          billingSums = months + 1;
        } else {
          billingSums = months;
        }
        break;
      case "YEARLY":
        const years = currentDate.getFullYear() - contractedAt.getFullYear();
        if (
          currentDate.getMonth() > contractedAt.getMonth() ||
          (currentDate.getMonth() === contractedAt.getMonth() &&
            currentDate.getDate() >= contractedAt.getDate())
        ) {
          billingSums = years + 1;
        } else {
          billingSums = years;
        }
        break;
      default:
        throw new Error("Invalid billing type");
    }

    return billingSums * fee;
  }

  return (
    <>
      <Head>
        <title>Subscription Management</title>
        <meta name="description" content="Subscription Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col  items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#6a70dc]">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 ">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-200 sm:text-[4rem]">
            Subscription Management App
          </h1>
          <p className="text-lg font-extrabold tracking-tight text-gray-200 sm:text-[2rem]"></p>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {allSubscriptions.data?.map((subscription) => (
              <Link
                href={`/subscription/${subscription.id}`}
                key={subscription.id}
              >
                <div className="block rounded-xl bg-white/10 p-6 transition-all duration-300 hover:bg-white/20">
                  <p className="text-5xl text-white">
                    {subscription.image || "　"}
                  </p>
                  <div className="flex items-center space-x-4 pt-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {subscription.name}
                      </h3>
                      <p className="text-gray-300">{subscription.overview}</p>
                    </div>
                  </div>
                  <div className="mt-4 items-center justify-between text-gray-400">
                    <p>料金: ¥{subscription.fee}</p>
                    <p>
                      課金頻度:
                      {subscription.billingType === "DAILY" &&
                        `${subscription.billingInterval}日ごと`}
                      {subscription.billingType === "MONTHLY" &&
                        `毎月 ${subscription.billingInterval}日`}
                      {subscription.billingType === "YEARLY" &&
                        `毎年 ${
                          new Date(subscription.contracted_at).getMonth() + 1
                        }月 ${new Date(
                          subscription.contracted_at,
                        ).getDate()}日`}
                    </p>
                    <p>
                      契約日:{" "}
                      {new Date(
                        subscription.contracted_at,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-4 items-center justify-between text-gray-300">
                    {" "}
                    <p>
                      現在の総課金金額: ¥
                      {calculateTotalBilling(
                        subscription.contracted_at,
                        subscription.billingType,
                        subscription.billingInterval,
                        subscription.fee,
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="">
            <Link
              href="/postSubscription"
              className="focus:shadow-outline rounded bg-violet-700 px-4 py-2 font-bold text-white hover:bg-violet-900 focus:outline-none"
            >
              サブスクリプションを登録する
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
