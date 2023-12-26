import React, { useState, useRef } from "react";
import Link from "next/link";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Header from "../Header";

export const impression = () => {
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [rating, setRating] = useState(3);
  const router = useRouter();
  const { id } = router.query;
  const parseNumberId = Number(id);
  const allSubscriptions = api.post.getAllSubscription.useQuery();
  const detailSubscription = api.post.getDetailSubscription.useQuery({
    id: parseNumberId,
  });
  const allImpressions = api.post.getAllImpressions.useQuery();
  const deleteImpression = api.post.deleteImpression.useMutation({
    onSettled: () => {
      void allImpressions.refetch();
      void allSubscriptions.refetch();
    },
  });

  const postImpression = api.post.postImpression.useMutation();

  // 投稿関数
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ifに入れないとエラーが出るため
    if (parseNumberId && commentRef.current && rating) {
      postImpression.mutate({
        subscription_id: parseNumberId,
        comment: commentRef.current.value,
        rating: rating,
      });
      router.push(`/subscription/${parseNumberId}`);
    }
  };

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col  items-center justify-center bg-gradient-to-b from-indigo-900 to-indigo-500">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 ">
          <p className="text-lg font-extrabold tracking-tight text-gray-100 sm:text-[2rem]">
            感想登録
          </p>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-lg bg-gray-200 p-6 shadow-md"
          >
            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-bold text-gray-800"
                htmlFor="description"
              >
                感想内容
              </label>
              <textarea
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="overview"
                placeholder="感想を入力"
                ref={commentRef}
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-800">
                星いくつ？
              </label>
              <div className="flex">
                <div className="flex space-x-4">
                  <div>
                    <input
                      type="radio"
                      id="star1"
                      name="rating"
                      value="1"
                      onChange={(e) => setRating(parseInt(e.target.value, 10))}
                    />
                    <label
                      htmlFor="star1"
                      className="ml-2 text-sm font-bold text-gray-700"
                    >
                      1
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="star2"
                      name="rating"
                      value="2"
                      onChange={(e) => setRating(parseInt(e.target.value, 10))}
                    />
                    <label
                      htmlFor="star2"
                      className="ml-2 text-sm font-bold text-gray-700"
                    >
                      2
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="star3"
                      name="rating"
                      value="3"
                      onChange={(e) => setRating(parseInt(e.target.value, 10))}
                    />
                    <label
                      htmlFor="star3"
                      className="ml-2 text-sm font-bold text-gray-700"
                    >
                      3
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="star4"
                      name="rating"
                      value="4"
                      onChange={(e) => setRating(parseInt(e.target.value, 10))}
                    />
                    <label
                      htmlFor="star4"
                      className="ml-2 text-sm font-bold text-gray-700"
                    >
                      4
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="star5"
                      name="rating"
                      value="5"
                      onChange={(e) => setRating(parseInt(e.target.value, 10))}
                    />
                    <label
                      htmlFor="star5"
                      className="ml-2 text-sm font-bold text-gray-700"
                    >
                      5
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="submit"
              >
                登録する
              </button>
              <Link
                href={`/subscription/${id}`}
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
export default impression;
