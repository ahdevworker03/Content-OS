# Instagram Carousel — When a latency alert is really a query-cardinality problem

## Slide 1

**Purpose:** Open on the mismatch between the noisy alert and its source.
**Layout:** `personal-cover`

**Title:**

الـ alert كان عم يروح ويرجع…

**Accent thought:**

بس المشكلة كانت بالـ query

## Slide 2

**Purpose:** Show the real staging symptom and clarify what an alert instance means.
**Layout:** `personal-trigger`

**Title:** شو كان عم يصير؟

**Body:**

على staging، الـ latency alert كان عم ينتقل بين FIRING وRESOLVED كل شوي.

وبنفس الوقت كان عم يطلع أكتر من alert instance (تنبيه مستقل).

**Question panel:** وين كانت المشكلة؟

## Slide 3

**Purpose:** Explain how request-specific labels created multiple query results without claiming they caused the state switching.
**Layout:** `personal-friction`

**Title:** ليه صار في أكتر من alert instance؟

**Sequence:**

1. بعد الـ JSON parsing، ضلّت labels مرتبطة بكل request جوّا الـ query.
2. هالـ labels خلّت الـ query ترجع أكتر من series (سلسلة زمنية).
3. كل series صارت alert instance مستقلة.
4. فبدل نتيجة وحدة، صار عنا عدة نتائج عم تتقيّم لحالها.

## Slide 4

**Purpose:** Show the query correction and explain aggregation in plain language.
**Layout:** `personal-decision`

**Title:** الحل كان نقلّل الـ labels قبل التجميع

**Context:**

خلّينا `responseTime` بس قبل الـ `unwrap` والـ aggregation (تجميع القيم):

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

بالـ staging read rule، النتيجة صارت aggregate series وحدة.

**Note:**

هيدا هو التحقق الموثّق تحديداً، وما عم نعمّمه على باقي الـ rules.

## Slide 6

**Purpose:** Separate the query fix from actual application performance.
**Layout:** `personal-belief`

**Title:** وهالشي ما يعني إن الـ app صار أسرع

**Quote:**

ما غيّرنا الـ thresholds ولا الـ pending / keep-firing settings.

## Slide 7

**Purpose:** Preserve the approved alert thresholds without presenting them as measurements.
**Layout:** `personal-takeaway`

**Title:** الـ thresholds بقوا نفسها.

**Detail:**

Read P95 فوق 500 ms

Mutation P95 فوق 800 ms

## Slide 8

**Purpose:** Explain the threshold metric without implying improved application performance.
**Layout:** `personal-takeaway`

**Title:** الـ P95 هون مقياس للـ latency.

**Detail:**

والـ P95 هون هو مقياس للـ latency: تقريباً 95% من الطلبات بتكون بزمن استجابة أقل منه.

هيدي thresholds للـ alert، مش قياسات بتثبت إن الـ response time تحسّن.

## Slide 9

**Purpose:** Give the reader a reusable debugging check grounded in this incident.
**Layout:** `personal-takeaway`

**Title:** شو أخدت من هالمشكلة؟

**Detail:**

بهالحالة، كثرة الـ alert instances كانت من query cardinality (عدد الـ series المختلفة)، مش من bug بالمشروع.

صار عندي check إضافي: شو الـ labels والـ series اللي الـ query عم ترجعها؟

## Slide 10

**Purpose:** Invite peer discussion.
**Layout:** `personal-closing`

**Question:**

صار معك alert كانت المشكلة فيه من الـ query نفسها، مش من التطبيق؟
