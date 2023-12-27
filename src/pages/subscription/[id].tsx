import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { api } from "~/utils/api";
import Header from "../Header";

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
      void allImpressions.refetch();
    },
  });

  // 契約日yyyy/mm/dd形式関数
  function formatDate(dateString: Date) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月は0から始まるため、1を加える
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  }

  // 平均レーティングを計算する関数
  const calculateAverageRating = () => {
    const impressions = allImpressions.data?.filter(
      (impression) => impression.subscription_id === parseNumberId,
    );

    if (!impressions || impressions.length === 0) {
      return "評価なし";
    }

    const totalRating = impressions.reduce(
      (acc, impression) => acc + impression.rating,
      0,
    );
    return (totalRating / impressions.length).toFixed(1);
  };

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
    <>
      <Header />
      <main className="flex min-h-screen flex-col  items-center bg-gradient-to-b from-indigo-900 to-indigo-500">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 py-8 ">
          <p className="text-lg font-extrabold tracking-tight text-gray-100 sm:text-[2rem]">
            サブスクリプション詳細
          </p>
          <div className="mx-auto mt-2 w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
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
              <span className="font-extrabold text-gray-700">
                平均レーティング{" "}
              </span>
              ★{calculateAverageRating()}
            </p>

            <p className="mb-2 whitespace-pre-line text-gray-700">
              <span className="font-extrabold text-gray-700">料金 </span>¥
              {detailSubscription.data?.fee}
            </p>
            <p className="mb-2 text-gray-700">
              <span className="font-extrabold text-gray-700">課金頻度 </span>
              {detailSubscription.data?.billingType === "DAILY" &&
                `${detailSubscription.data?.billingInterval}日ごと`}
              {detailSubscription.data?.billingType === "MONTHLY" &&
                `毎月 ${detailSubscription.data?.billingInterval}日`}
              {detailSubscription.data?.billingType === "YEARLY" &&
                `毎年 ${
                  new Date(detailSubscription.data?.contracted_at).getMonth() +
                  1
                }月 ${new Date(
                  detailSubscription.data?.contracted_at,
                ).getDate()}日`}
            </p>
            <p className="mb-2 text-gray-700">
              <span className="font-extrabold text-gray-700">契約日 </span>
              {detailSubscription.data?.contracted_at
                ? formatDate(detailSubscription.data.contracted_at)
                : "日付がありません"}
            </p>
            <p className="mb-4 text-gray-700">
              <span className="font-extrabold text-gray-700">契約確認URL </span>{" "}
              {detailSubscription.data?.url}
            </p>
            <p className="mb-2 text-sm text-gray-500">
              <span className="text-sm  font-extrabold text-gray-500">
                サブスクリプション情報更新日{" "}
              </span>
              {detailSubscription.data?.updated_at
                ? formatDate(detailSubscription.data.updated_at)
                : "日付がありません"}
            </p>

            <div className="flex items-center justify-between">
              <Link
                href={`/impression/${id}`}
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              >
                感想を投稿
              </Link>
              <Link
                href={`/edit/${id}`}
                className="focus:shadow-outline rounded bg-indigo-500 px-4 py-2 font-bold text-white hover:bg-indigo-700 focus:outline-none"
              >
                編集
              </Link>

              <Link
                href="/"
                className="focus:shadow-outline rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none"
              >
                TOPへ
              </Link>
            </div>
          </div>
          <div className="mx-2 mt-2 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {allImpressions.data
              ?.filter(
                (impression) => impression.subscription_id === parseNumberId,
              )
              .map((impression) => (
                <div className="block rounded-xl bg-white/10 p-6 transition-all ">
                  <div className="flex items-center space-x-4 pt-4">
                    <div>
                      <p className="font-bold text-gray-100">
                        {impression.comment}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 items-center justify-between text-gray-200">
                    <p>レーティング: ★{impression.rating}</p>
                    <p>
                      投稿日：{" "}
                      {impression.posted_at
                        ? formatDate(impression.posted_at)
                        : "日付がありません"}
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
    </>
  );
}

export default DetailSubscription;
