import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { api } from "~/utils/api";

function DetailSubscription() {
  const router = useRouter();
  const { id } = router.query;
  const parseNumberId = Number(id);
  const allSubscriptions = api.post.getAllSubscription.useQuery();
  const detailSubscription = api.post.getDetailSubscription.useQuery({
    id: parseNumberId,
  });
  const allImpressions = api.post.getAllImpressions.useQuery();
  const deleteImpression = api.post.deleteImpression.useMutation({
    // これがないと関数呼び出し後画面がリフレッシュされない時がある
    onSettled: () => {
      void allSubscriptions.refetch();
    },
  });

  //　課金タイプ関数
  const getBillingPeriod = (billingType: string | undefined) => {
    switch (billingType) {
      case "DAILY":
        return "日ごと";
      case "MONTHLY":
        return "毎月";
      case "YEARLY":
        return "毎年";
      default:
        return "";
    }
  };

  // 削除関数
  const handleImpressionDelete = (id: number) => {
    if (window.confirm("本当に削除しますか？")) {
      try {
        deleteImpression.mutate({ id: id });
        router.push(`/subscription/${parseNumberId}`);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#6a70dc]">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 ">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-200 sm:text-[4rem]">
          Subscription Management App
        </h1>
        <p className="text-lg font-extrabold tracking-tight text-gray-200 sm:text-[2rem]">
          サブスクリプション登録
        </p>
        <div className="mx-auto mt-2 w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
          <p className="mb-2 text-5xl text-gray-900">
            {detailSubscription.data?.image || "　"}
          </p>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            {detailSubscription.data?.name}
          </h1>

          <p className="mb-4 whitespace-pre-line text-gray-700">
            {detailSubscription.data?.overview}
          </p>
          <p className="mb-2 text-gray-700">
            課金頻度:
            {detailSubscription.data?.billingType === "DAILY" &&
              `${detailSubscription.data?.billingInterval}日ごと`}
            {detailSubscription.data?.billingType === "MONTHLY" &&
              `毎月 ${detailSubscription.data?.billingInterval}日`}
            {detailSubscription.data?.billingType === "YEARLY" &&
              `毎年 ${
                new Date(detailSubscription.data?.contracted_at).getMonth() + 1
              }月 ${new Date(
                detailSubscription.data?.contracted_at,
              ).getDate()}日`}
          </p>
          <div className="mb-8 text-gray-700">
            契約日:{" "}
            {detailSubscription.data?.contracted_at
              ? new Date(detailSubscription.data.contracted_at).toDateString()
              : "日付がありません"}
          </div>

          <div className="flex items-center justify-between">
            <Link
              href={`/edit/${id}`}
              className="focus:shadow-outline rounded bg-violet-500 px-4 py-2 font-bold text-white hover:bg-violet-700 focus:outline-none"
            >
              編集する
            </Link>
            <Link
              href={`/impression/${id}`}
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              感想を投稿する
            </Link>
            <Link
              href="/"
              className="focus:shadow-outline rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none"
            >
              TOPへ戻る
            </Link>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allImpressions.data
            ?.filter(
              (impression) => impression.subscription_id === parseNumberId,
            )
            .map((impression) => (
              <div className="block rounded-xl bg-white/10 p-6 transition-all ">
                <div className="flex items-center space-x-4 pt-4">
                  <div>
                    <p className="text-gray-100">{impression.comment}</p>
                  </div>
                </div>
                <div className="mt-4 items-center justify-between text-gray-400">
                  <p>レーティング: ★{impression.rating}</p>
                  <p>
                    投稿日：{" "}
                    {new Date(impression.posted_at).toLocaleDateString()}
                  </p>
                  <button
                    className="mt-4 rounded-md bg-red-400 p-2 font-bold text-white hover:bg-red-500 focus:outline-none"
                    onClick={() =>
                      handleImpressionDelete(impression.impression_id)
                    }
                  >
                    感想を削除する
                  </button>
                </div>
              </div>
            ))}
        </div>{" "}
      </div>
    </main>
  );
}

export default DetailSubscription;
