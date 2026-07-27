import devRaw from "../data/carousel.json";
import { USE_WORKSPACE_DATA } from "./config";
import { mapWorkspaceCarousel } from "./mapWorkspaceCarousel";
import type { Carousel } from "../types";

export async function loadCarousel(): Promise<Carousel> {
  if (USE_WORKSPACE_DATA) {
    const res = await fetch("../workspace/carousel.json");

    if (!res.ok) {
      throw new Error(
        `Failed to load workspace carousel: ${res.status} ${res.statusText}`,
      );
    }

    const raw = await res.json();
    return mapWorkspaceCarousel(raw);
  }

  if (
    !devRaw ||
    typeof devRaw !== "object" ||
    !Array.isArray((devRaw as Record<string, unknown>).slides)
  ) {
    throw new Error("Invalid dev carousel.json: missing slides array");
  }

  return devRaw as Carousel;
}
