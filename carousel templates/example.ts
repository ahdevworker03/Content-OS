import type { PersonalCarousel } from "./types.ts";

/** Existing project-structure story, used only to exercise several layouts. */
export const projectStructureExample: PersonalCarousel = {
  slides: [
    {
      id: "opening",
      template: "cover",
      leadIn: "من مشروع عم يكبر",
      title: "أصعب شي ما كان كتابة الكود. كان أعرف وين أحطّه.",
      context: "عن الترتيب اللي احتجته لما كبر مشروعي",
    },
    {
      id: "question",
      template: "story",
      title: "Feature جديدة. ونفس السؤال رجع.",
      body: "المشروع كبر، وملفّاته صاروا أكتر. كنت جاهز اكتب الـ code، بس وقفت عند خطوة قبلها:",
      emphasis: "وين مكان الملف الجديد؟",
    },
    {
      id: "return",
      template: "sequence",
      leadIn: "بعد أسبوع",
      title: "لما كبر المشروع، صار الترتيب يكلّف وقت.",
      items: [
        "برجع بعد أسبوع، وبضيّع وقت لحتى اتذكّر وين الملف.",
        "بلاقي الملف بمكان ما بيوضّح ليش موجود هون.",
        "بنقله، وبعدها بعدّل الـ imports بدل ما كمّل الشغل.",
      ],
    },
    {
      id: "realization",
      template: "focus",
      leadIn: "هون فهمت شو كان ناقصني",
      title: "الترتيب مش للتجميل.",
      statement: "كل ما مكان الملف صار أوضح، قرار الإضافة صار أسهل.",
    },
    {
      id: "question-to-reader",
      template: "closing",
      question: "شو أول إشارة خلتك تعرف إن ترتيب ملفّات مشروعك ما عاد عم يساعدك؟",
    },
  ],
};
