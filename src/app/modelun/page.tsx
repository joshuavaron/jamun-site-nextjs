import { getAllCommittees } from "@/lib/committees";
import ModelUNPageContent from "./ModelUNPageContent";

export default function ModelUNPage() {
  const committees = getAllCommittees();

  return <ModelUNPageContent committees={committees} />;
}
