import apiRoutes from "@lib/routes/apiRoutes";
import apiClient from "@lib/apiClient";
import { Tag } from "@prisma/client";

async function suggestTag(tagName: string) {
  return await apiClient.post<Tag>(apiRoutes.tagSuggestions(), {
    tagName,
  });
}

export default suggestTag;
