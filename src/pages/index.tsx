import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  // デフォルト記載　参考のため残しておく
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const allSubscriptions = api.post.getAllSubscription.useQuery();

  // 現在の総課金金額計算関数
  function calculateTotalBilling(
    contractedAt: Date,
    frequency: number,
    fee: number,
  ): number {
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - contractedAt.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const billingCycles = Math.floor(diffDays / frequency);

    return billingCycles * fee + fee;
  }

  return (
    <>
      <Head>
        <title>Subscription Management</title>
        <meta name="description" content="Subscription Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#6a70dc]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(265,100%,70%)]">Subscription</span>{" "}
            Management App
          </h1>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {allSubscriptions.data?.map((subscription) => (
              <Link
                href={`/subscription/${subscription.id}`}
                key={subscription.id}
              >
                <div className="block rounded-xl bg-white/10 p-6 transition-all duration-300 hover:bg-white/20">
                  <img
                    src={subscription.image || "/image/default-image.jpg"} // 画像がない場合のデフォルト画像
                    alt={subscription.name}
                    className="h-16 w-16 space-x-4 rounded-full "
                  />
                  <div className="flex items-center space-x-4 pt-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {subscription.name}
                      </h3>
                      <p className="text-gray-400">{subscription.overview}</p>
                    </div>
                  </div>
                  <div className="mt-4 items-center justify-between text-gray-300">
                    <p>料金: ¥{subscription.fee}</p>
                    <p>課金頻度: {subscription.frequency}日ごと</p>
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
                        subscription.frequency,
                        subscription.fee,
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              href="/postSubscription"
              className="rounded-md bg-violet-900 px-6 py-4 font-medium text-gray-300 duration-300 hover:bg-violet-900/50"
            >
              サブスクリプションを登録する
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
