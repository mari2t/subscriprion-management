import React, { useState, useRef } from "react";
import Link from "next/link";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";
import Header from "./Header";

export const postSubscription = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const overviewRef = useRef<HTMLTextAreaElement>(null);
  const feeRef = useRef<HTMLInputElement>(null);
  const billingIntervalRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const contractedAtRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [billingType, setBillingType] = useState("DAILY");

  const router = useRouter();

  const postSubscription = api.post.postSubscription.useMutation();

  // 投稿関数
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ifに入れないとエラーが出るため
    if (
      nameRef.current &&
      overviewRef.current &&
      feeRef.current &&
      billingType &&
      billingIntervalRef.current &&
      urlRef.current &&
      contractedAtRef.current
    ) {
      postSubscription.mutate({
        name: nameRef.current.value,
        overview: overviewRef.current.value,
        fee: parseInt(feeRef.current.value),
        billingType: billingType,
        billingInterval: parseInt(billingIntervalRef.current.value),
        url: urlRef.current.value,
        contracted_at: new Date(contractedAtRef.current.value),
        image: imageRef.current?.value || "", // 空欄を許容
      });

      router.push("/");
    }
  };

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col  items-center justify-center bg-gradient-to-b from-indigo-900 to-indigo-500">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 ">
          <p className="text-lg font-extrabold tracking-tight text-gray-100 sm:text-[2rem]">
            サブスクリプション登録
          </p>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-lg bg-gray-200 p-6 shadow-md"
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
                placeholder="サブスクリプション名を入力"
                ref={nameRef}
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-800"
                htmlFor="description"
              >
                サブスクリプション内容
              </label>
              <textarea
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="overview"
                placeholder="概要を入力"
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
                placeholder="料金を入力"
                ref={feeRef}
              />
            </div>
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
                placeholder={
                  billingType === "DAILY" ? "日数を入力" : "日付を入力"
                }
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
                ref={contractedAtRef}
              />
            </div>{" "}
            <div className="mb-4">
              <label
                htmlFor="emoji"
                className="mb-2 block text-sm font-bold text-gray-800"
              >
                イメージ文字
              </label>
              <input
                type="text"
                id="emoji"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                placeholder="絵文字を入力"
                ref={imageRef}
                maxLength={2}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="focus:shadow-outline rounded bg-violet-500 px-4 py-2 font-bold text-white hover:bg-violet-700 focus:outline-none"
                type="submit"
              >
                登録する
              </button>
              <Link
                href="/"
                className="focus:shadow-outline rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none"
              >
                キャンセル
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
export default postSubscription;
