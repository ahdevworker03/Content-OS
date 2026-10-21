# Instagram Carousel — When a latency alert is really a query-cardinality problem

## Slide 1

**Purpose:** Open on the mismatch between the noisy alert and its source.
**Layout:** `personal-cover`

**Header label:** DEBUGGING ALERTS

**Lead-in:** على بيئة التجربة (staging)

**Title:**

التنبيه كان يطلع ويختفي…

**Accent thought:**

بس السبب كان بطريقة الـ query

## Slide 2

**Purpose:** Show the real staging symptom and clarify what an alert instance means.
**Layout:** `personal-trigger`

**Title:** شو كان عم يصير؟

**Body:**

على staging، تنبيه وقت استجابة التطبيق كان يطلع كـ FIRING (شغّال)، وبعدين يرجع RESOLVED (انحلّ).

وبنفس الوقت، كل نتيجة من الـ query كانت تطلع كتنبيه لحالها (alert instance).

**Question panel:** ليش صار في تنبيهات كتيرة؟

## Slide 3

**Purpose:** Explain how request-specific labels created multiple query results without claiming they caused the state switching.
**Layout:** `personal-friction`

**Title:** كيف طلعت كل هالتنبيهات؟

**Sequence:**

1. بعد ما قرينا تفاصيل الـ logs من JSON، ضلّت مع كل طلب (request) تفاصيل خاصة فيه (labels).
2. الـ query اعتبرت كل مجموعة تفاصيل نتيجة لحالها، فطلع أكتر من تنبيه مستقل.

## Slide 4

**Purpose:** Show the query correction and explain aggregation in plain language.
**Layout:** `personal-decision`

**Title:** خفّفنا التفاصيل اللي كانت تقسّم النتائج

**Context:**

خلّينا بس `responseTime`، وحوّلناه لقيمة فينا نحسبها باستخدام `unwrap`:

**Evidence (LogQL):**

```logql
| keep responseTime
| unwrap responseTime
```

**Caption:** من runbook تبع المشروع

## Slide 5

**Purpose:** State exactly what was verified and keep the evidence scoped to one rule.
**Layout:** `personal-realization`

**Title:** شو تأكدنا منه؟

**Statement:**

بقاعدة تنبيه قراءة الـ data على staging، تأكدنا إن النتيجة صارت وحدة مجمّعة.

**Note:**

هيدا هو الشي اللي تأكدنا منه؛ ما عم نعمّمه على باقي قواعد التنبيه.

## Slide 6

**Purpose:** Separate the query fix from actual application performance.
**Layout:** `personal-belief`

**Title:** ترتيب التنبيه ما يعني إن التطبيق صار أسرع

**Quote:**

ما غيّرنا اديش لازم الحالة تضل قبل ما يطلع التنبيه، ولا اديش بيضل ظاهر بعد ما تروح المشكلة.

## Slide 7

**Purpose:** Explain P95 without implying improved application performance.
**Layout:** `personal-takeaway`

**Title:** شو يعني P95؟

**Detail:**

P95 هو وقت الاستجابة اللي حوالي 95% من الطلبات بتكون أسرع منه. استخدمناه كحدّ لتفعيل التنبيه، مش كقياس بيقول إن التطبيق صار أسرع.

## Slide 8

**Purpose:** Preserve the approved alert thresholds without presenting them as measurements.
**Layout:** `personal-takeaway`

**Title:** حدود التنبيه ضلّت نفسها

**Detail:**

تنبيه قراءة الـ data: إذا تجاوز P95 الـ 500 ms

تنبيه تعديل الـ data: إذا تجاوز P95 الـ 800 ms

## Slide 9

**Purpose:** Give the reader a reusable debugging check grounded in this incident.
**Layout:** `personal-takeaway`

**Title:** شو منفتّش عليه إذا كثرت التنبيهات؟

**Detail:**

بهالحالة، الـ query كانت عم تقسّم النتيجة حسب تفاصيل كل request، مش بسبب bug بالتطبيق.

سؤال بيساعد: ليش الـ query عم تطلع نتيجة لحالها لكل طلب؟

## Slide 10

**Purpose:** Invite peer discussion.
**Layout:** `personal-closing`

**Question:**

صار معك تنبيه عم يتكرر، وبالأخير طلع السبب بطريقة حسابه مش من التطبيق؟

## Instagram Caption

كثرة التنبيهات خلتني فكّر إن المشكلة من التطبيق، بس بهالحالة السبب طلع من الـ query وكيف كانت عم تقسّم النتائج حسب تفاصيل كل request.

بعد ما خلّينا responseTime بس قبل unwrap، قاعدة قراءة الـ data على staging رجعت نتيجة مجمّعة وحدة. هيدا ما بيعني إن التطبيق صار أسرع، وما عم نعمّم النتيجة على باقي قواعد التنبيه.

صار معك تنبيه تكرر، وبالأخير طلع السبب بطريقة حسابه مش من التطبيق؟
