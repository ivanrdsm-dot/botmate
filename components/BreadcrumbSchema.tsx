import JsonLd from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";

export default function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return <JsonLd data={breadcrumbLd(items)} />;
}
