import devRaw from "../data/carousel.json";
import { USE_WORKSPACE_DATA } from "./config";
import { mapWorkspaceCarousel } from "./mapWorkspaceCarousel";
import type { Carousel } from "../types";

/**
 * Loads the carousel the renderer should display.
 *
 * Workspace mode (default) fetches the Content Model JSON written by Workflow 03
 * at `production/workspace/carousel.json`. Vite serves the workspace directory
 * as static assets (see vite.config.ts `publicDir`), so `/carousel.json` is
 * available in dev, on the `/export` route, and in production builds.
 *
 * If the workspace carousel cannot be fetched or mapped, the loader falls back
 * to the bundled sample data in `src/data/carousel.json` so the Studio and
 * export route never render nothing.
 */
export async function loadCarousel(): Promise<Carousel> {
  if (USE_WORKSPACE_DATA) {
    try {
      const res = await fetch("/carousel.json");
      if (!res.ok) {
        throw new Error(
          `Failed to load workspace carousel: ${res.status} ${res.statusText}`,
        );
      }
      const raw = await res.json();
      const carousel = mapWorkspaceCarousel(raw);
      if (carousel.slides.length > 0) {
        return carousel;
      }
      console.warn(
        "[loadCarousel] Workspace carousel contains no slides; falling back to sample data.",
      );
      return devRaw as Carousel;
    } catch (err) {
      console.warn(
        "[loadCarousel] Failed to load workspace carousel; falling back to sample data.",
        err,
      );
      return devRaw as Carousel;
    }
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