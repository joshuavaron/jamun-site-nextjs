import { getAllResources } from "@/lib/resources";
import ResourcesPageContent from "./ResourcesPageContent";

export default function ResourcesPage() {
  const resources = getAllResources();

  return <ResourcesPageContent resources={resources} />;
}
