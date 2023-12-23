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

  const deleteSubscription = api.post.deleteSubscription.useMutation({
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="mx-auto mt-10 w-full max-w-2xl rounded-md bg-white p-6 shadow-md">
        <img
          src={detailSubscription.data?.image || "/image/default-image.jpg"} // 画像がない場合のデフォルト画像
          alt={detailSubscription.data?.name}
          className="h-16 w-16 space-x-4 rounded-full "
        />
        <h1 className="mb-4 text-3xl font-bold">
          {detailSubscription.data?.name}
        </h1>
        <div className="mb-8 text-sm text-gray-500">
          <span>{detailSubscription.data?.contracted_at.toDateString()}</span>{" "}
        </div>
        <p className="whitespace-pre-line text-gray-700">
          {detailSubscription.data?.overview}
        </p>
        <p className="whitespace-pre-line text-gray-700">
          {getBillingPeriod(detailSubscription.data?.billingType)}
        </p>
        <p className="whitespace-pre-line text-gray-700">
          {detailSubscription.data?.billingInterval}
        </p>
        <Link
          href={`/edit/${id}`}
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          編集する
        </Link>
        <Link
          href="/"
          className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white"
        >
          キャンセル
        </Link>
      </div>
    </main>
  );
}

export default DetailSubscription;
