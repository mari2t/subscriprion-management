import React, { useState, useEffect, useRef } from "react";
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
  const updateSubscription = api.post.updateSubscription.useMutation();
  const deleteSubscription = api.post.deleteSubscription.useMutation({
    // これがないと関数呼び出し後画面がリフレッシュされない時がある
    onSettled: () => {
      void allSubscriptions.refetch();
    },
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const overviewRef = useRef<HTMLTextAreaElement>(null);
  const feeRef = useRef<HTMLInputElement>(null);
  const billingIntervalRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const contractedAtRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const [billingType, setBillingType] = useState("");

  const route = useRouter();

  useEffect(() => {
    if (detailSubscription.data?.billingType) {
      setBillingType(detailSubscription.data.billingType);
    }
  }, [detailSubscription.data?.billingType]);

  // 編集確定関数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedId = Array.isArray(id) ? id[0] : id;

    if (parsedId) {
      try {
        await updateSubscription.mutateAsync({
          id: parseInt(parsedId),
          name: nameRef.current?.value || detailSubscription.data?.name,
          overview:
            overviewRef.current?.value || detailSubscription.data?.overview,
          fee: feeRef.current?.value
            ? parseInt(feeRef.current.value)
            : detailSubscription.data?.fee,
          billingType: billingType,
          billingInterval: billingIntervalRef.current?.value
            ? parseInt(billingIntervalRef.current.value)
            : detailSubscription.data?.billingInterval,
          url: urlRef.current?.value || detailSubscription.data?.url,
          contracted_at: contractedAtRef.current?.value
            ? new Date(contractedAtRef.current.value)
            : detailSubscription.data?.contracted_at,
          image: imageRef.current?.value || detailSubscription.data?.image,
        });
        router.push("/");
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("IDが不正です。");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h2 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          サブスクリプション編集
        </h2>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-lg bg-white p-6 shadow-md"
        >
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-800"
              htmlFor="title"
            >
              サブスクリプション名
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="name"
              type="text"
              placeholder={detailSubscription.data?.name}
              ref={nameRef}
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-800"
              htmlFor="description"
            >
              サブスクリプション内容
            </label>
            <textarea
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="overview"
              placeholder={detailSubscription.data?.overview}
              ref={overviewRef}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-800"
              htmlFor="fee"
            >
              料金
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="fee"
              type="number"
              placeholder={`${detailSubscription.data?.fee || ""}`}
              ref={feeRef}
            />
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-800"
                htmlFor="billingType"
              >
                課金タイプ
              </label>
              <select
                id="billingType"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                value={billingType}
                onChange={(e) => setBillingType(e.target.value)}
              >
                <option value="DAILY">日ごと</option>
                <option value="MONTHLY">毎月●日</option>
                <option value="YEARLY">毎年●日</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-800"
                htmlFor="billingInterval"
              >
                {billingType === "DAILY" ? "日数" : "日付"}
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="billingInterval"
                type="number"
                placeholder={`${
                  detailSubscription.data?.billingInterval || ""
                }`}
                min={billingType !== "DAILY" ? 1 : undefined}
                max={billingType !== "DAILY" ? 31 : undefined}
                ref={billingIntervalRef}
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-800"
                htmlFor="contractedAt"
              >
                契約URL
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="url"
                type="url"
                placeholder={`${detailSubscription.data?.url || ""}`}
                ref={urlRef}
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-800"
                htmlFor="contractedAt"
              >
                契約日
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="contractedAt"
                type="date"
                placeholder={`${detailSubscription.data?.contracted_at || ""}`}
                ref={contractedAtRef}
              />
            </div>{" "}
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-800"
                htmlFor="image"
              >
                画像URL
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="image"
                type="url"
                placeholder={`${detailSubscription.data?.image || ""}`}
                ref={imageRef}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="mt-4 rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-800 focus:outline-none"
              type="submit"
            >
              確定する
            </button>
            <Link
              href={`/subscription/${id}`}
              className="mt-4 rounded-md bg-green-500 px-4 py-2 align-baseline text-sm font-bold text-white hover:bg-green-800 focus:outline-none"
            >
              キャンセル
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default DetailSubscription;
