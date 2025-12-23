import { getAllCommittees } from "@/lib/committees";
import CommitteesPageContent from "./CommitteesPageContent";

export default function CommitteesPage() {
  const committees = getAllCommittees();

  return <CommitteesPageContent committees={committees} />;
}
