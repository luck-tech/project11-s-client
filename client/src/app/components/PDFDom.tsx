"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type ContentType = {
  color: "pink" | "blue" | "green";
  title: string;
  content: string;
};

type ContentTitle =
  | "今回の裁判内容"
  | "A主張内容"
  | "B主張内容"
  | "A最終主張内容"
  | "B最終主張内容"
  | "話し合いの内容"
  | "AI裁判官 暫定判決"
  | "AI裁判官 最終判決";

type TrialData = {
  defendant_claim: string;
  defendant_final_claim: string;
  discussion_content: string;
  final_judgment: string;
  plaintiff_claim: string;
  plaintiff_final_claim: string;
  provisional_judgment: string;
  subject: string;
  trial_id: string;
};

const predefinedData: Array<{
  color: "pink" | "blue" | "green";
  title: ContentTitle;
}> = [
  { color: "green", title: "今回の裁判内容" },
  { color: "pink", title: "A主張内容" },
  { color: "blue", title: "B主張内容" },
  { color: "green", title: "AI裁判官 暫定判決" },
  { color: "green", title: "話し合いの内容" },
  { color: "pink", title: "A最終主張内容" },
  { color: "blue", title: "B最終主張内容" },
  { color: "green", title: "AI裁判官 最終判決" },
];

const formatTrialData = (data: TrialData): ContentType[] => {
  const fieldMap: Record<ContentTitle, string> = {
    今回の裁判内容: data.subject,
    A主張内容: data.plaintiff_claim,
    B主張内容: data.defendant_claim,
    "AI裁判官 暫定判決": data.provisional_judgment,
    話し合いの内容: data.discussion_content,
    A最終主張内容: data.plaintiff_final_claim,
    B最終主張内容: data.defendant_final_claim,
    "AI裁判官 最終判決": data.final_judgment,
  };

  return predefinedData.map((item) => ({
    color: item.color,
    title: item.title,
    content: fieldMap[item.title],
  }));
};

async function getPDFContents(id: string) {
  const res = await fetch(`https://project7.uni-bo.net/api/trial/to_pdf/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trial_id: id }),
  });

  if (!res.ok) {
    throw new Error(`failed get pdf ${res.status}`);
  }

  return await res.json();
}

const PDFDom = () => {
  const { id }: { id: string } = useParams();
  const [contents, setContents] = useState<ContentType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const contentsData: TrialData = await getPDFContents(id);
        console.log(contentsData);
        const formattedContents = formatTrialData(contentsData);
        setContents(formattedContents);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div
      id="pdf-id"
      className="w-[1400px] h-[787px] bg-[#0F1515] border-[5px] border-theme-green py-16 px-8"
    >
      <div className="h-full flex flex-col">
        <Image
          src={"/pdf-title.png"}
          alt="title"
          width={200}
          height={48}
          className="mb-10"
        />
        <ul className="divide-[#4f4f4f] divide-y-4 flex-1 content-center">
          <div className="col-span-4 row-span-1 grid grid-cols-4 gap-x-4 pb-14">
            {contents.slice(0, 4).map((item, i) => (
              <PdfParts
                key={i}
                color={item.color}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
          <div className="col-span-4 row-span-1 grid grid-cols-4 gap-x-4 pt-14">
            {contents.slice(4, 8).map((item, i) => (
              <PdfParts
                key={i}
                color={item.color}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default PDFDom;

const PdfParts = ({
  color,
  title,
  content,
}: {
  color: "pink" | "blue" | "green";
  title: string;
  content: string;
}) => {
  return (
    <li
      className={`bg-theme-${color} bg-opacity-30 pt-6 pb-8 pl-6 pr-10 rounded-s-[10px] rounded-e-[120px] text-center flex flex-col justify-center`}
    >
      <h2 className={`text-theme-${color} font-bold text-xl pb-4`}>{title}</h2>
      <p className="text-sm leading-normal">{content}</p>
    </li>
  );
};
