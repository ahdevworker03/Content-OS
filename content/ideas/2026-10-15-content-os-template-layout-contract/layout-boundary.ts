// Adapter mapping: production/renderer/src/renderer/mapWorkspaceCarousel.ts
case "story":
  return {
    layout: "story",
    title: slide.title ?? "",
    body: slide.body ?? "",
  };

// Renderer routing: production/renderer/src/renderer/SlideRenderer.tsx
case "story":
  return <PersonalStory slide={slide} />;
