---
name: arabic-technical-language
description: Use this skill when writing or rewriting Arabic technical content that mixes Arabic with English developer terms. It decides which technical words should stay in English, which words should be Arabic, and how to keep the language natural, clear, and not awkwardly translated.
---

# Arabic Technical Language Skill

## Purpose

Write Arabic technical content with natural English technical terms.

This skill prevents Arabic content from sounding:

- over-translated
- awkward
- inconsistent
- too formal
- too English-heavy
- too academic
- disconnected from how Arab developers actually speak

The goal is to make the content technically clear while still sounding natural for Arabic-speaking Computer Science students and junior developers.

---

## Core Rule

Use Arabic for normal explanation.

Use English for developer terms that Arab developers commonly say in English.

Good:

> المشكلة طلعت من الـ validation، مش من الـ API.

Bad:

> المشكلة طلعت من التحقق، مش من واجهة برمجة التطبيقات.

The second version is understandable, but it sounds translated and unnatural in student/developer content.

---

## When to Use This Skill

Use this skill for:

- Arabic Instagram carousels about programming
- Arabic technical captions
- Reel scripts about coding
- Story text about debugging or projects
- Arabic X posts about software development
- rewriting technical Arabic that sounds too formal
- deciding whether to keep a term in English or translate it

Use it especially when the content includes:

- frontend
- backend
- APIs
- databases
- React
- TypeScript
- Node.js
- Express
- Prisma
- PostgreSQL
- deployment
- testing
- authentication
- validation
- architecture
- UI/UX
- Git/GitHub

---

## Main Decision Rule

For every technical term, ask:

```text id="a9jvtz"
Would an Arab CS student or junior developer naturally say this word in English while explaining the problem?
```

If yes, keep it in English.

If no, use Arabic.

---

## Terms to Usually Keep in English

Keep these terms in English because translating them often sounds unnatural.

### General Development

- code
- bug
- error
- debug
- debugging
- deploy
- deployment
- terminal
- command
- script
- package
- dependency
- version
- environment
- environment variables
- config
- repo
- branch
- commit
- pull request
- merge
- build
- runtime
- compiler
- logs

Examples:

> فتحت الـ terminal ورجعت شغّلت command وحدة وحدة.

> المشكلة ما كانت من الكود، كانت من environment variable ناقص.

> عملت commit بعد ما تأكدت إنو tests كلهم عم يمرقوا.

---

### Frontend

- frontend
- backend
- full-stack
- UI
- UX
- layout
- responsive
- component
- props
- state
- hook
- route
- page
- form
- input
- modal
- sidebar
- dashboard
- table
- grid
- card
- dropdown
- button
- loading state
- error state

Examples:

> كنت مفكرها مشكلة CSS، بس طلعت من layout الصفحة.

> الـ component كان عم يستقبل props ناقصة.

> المشكلة ظهرت بس على tablet، فاضطريت أراجع responsive layout.

---

### React / TypeScript

- React
- TypeScript
- JavaScript
- JSX
- TSX
- component
- props
- state
- hook
- useEffect
- useState
- type
- interface
- enum
- generic
- strict mode
- build error
- type error

Examples:

> بالبداية كنت شايف state و props نفس الشي تقريباً.

> TypeScript مسكني type error كنت ممكن ما انتبهله بالـ JavaScript.

> المشكلة طلعت من useEffect عم يشتغل بوقت غلط.

---

### Backend / API

- backend
- API
- REST API
- endpoint
- request
- response
- controller
- service
- repository
- middleware
- validation
- authentication
- authorization
- token
- session
- cookie
- JWT
- status code
- 404
- 409
- payload
- body
- query params
- route

Examples:

> الـ request كان واصل، بس الـ endpoint عم يرجّع 404.

> المشكلة طلعت من validation قبل ما توصل للـ service.

> فهمت الفرق بين authentication و authorization لما بلشت أضيف roles.

---

### Database

- database
- PostgreSQL
- Prisma
- schema
- model
- migration
- query
- transaction
- relation
- index
- seed
- soft delete
- enum
- constraint
- unique constraint
- foreign key
- decimal
- timestamp

Examples:

> الـ migration اشتغلت، بس Prisma Client كان بعده قديم.

> المشكلة كانت من relation بين rental و vehicle.

> فهمت أهمية transaction لما صار عندي تحديثين لازم ينجحوا سوا.

---

### Testing

- test
- tests
- unit test
- integration test
- E2E
- mock
- fixture
- assertion
- test case
- regression
- coverage
- Vitest
- Playwright
- Supertest

Examples:

> كتبت unit test للـ selector قبل ما أربطه بالـ UI.

> integration test هون أهم لأن المشكلة مرتبطة بالـ database.

> هالـ regression كان ممكن ما أنتبهله بدون test.

---

### Architecture / Project Structure

- architecture
- feature-based structure
- module
- layer
- service layer
- repository layer
- controller
- route
- domain model
- separation of concerns
- refactor
- monorepo
- workspace
- package
- shared library
- design system

Examples:

> لما المشروع كبر، بلشت أفهم ليش architecture مش موضوع شكلي.

> فصلت logic بالـ service layer بدل ما خليها كلها بالـ controller.

> refactor الملف كان ضروري لأنه صار صعب أفهمه.

---

### UI / Product

- UI
- UX
- dashboard
- sidebar
- navbar
- card
- table
- filters
- empty state
- loading state
- error state
- modal
- responsive
- breakpoint
- spacing
- alignment
- hierarchy
- visual density
- design system

Examples:

> المشكلة ما كانت بس بالـ spacing، كانت بالـ visual hierarchy.

> الـ dashboard كان شغال، بس مش مريح بصرياً على desktop.

> empty state مهم لأنه بيشرح للمستخدم شو يعمل بعدين.

---

## Terms to Usually Use in Arabic

Use Arabic for normal explanation words.

### General Words

- مشكلة
- خطأ
- فكرة
- تجربة
- مشروع
- خطوة
- سبب
- نتيجة
- حل
- طريقة
- جزء
- صفحة
- ملف
- صورة
- زر
- جدول
- قائمة
- شاشة
- مستخدم
- بيانات
- قرار
- تعديل
- تحسين
- ترتيب
- شرح
- مثال
- ملاحظة
- فرق
- حالة
- قيمة
- تاريخ
- رقم
- مبلغ
- عقد
- سيارة
- زبون

Examples:

Good:

> المشكلة كانت من طريقة ترتيب البيانات.

Bad:

> الـ problem كانت من طريقة ترتيب الـ data.

Good:

> عدّلت الملف ورجعت جرّبت الصفحة.

Bad:

> عملت edit للـ file ورجعت جرّبت الـ page.

---

## Mixed Language Balance

A sentence should not become half English unless needed.

Good:

> كنت عم جرّب أعمل deploy، بس الـ environment variables ما كانوا مظبوطين.

Bad:

> I was عم جرّب deploy بس the environment variables كانوا wrong.

Good:

> المشكلة طلعت من الـ API response، لأنه البيانات الراجعة ناقصة.

Bad:

> الـ issue طلعت من الـ API response because the returned data ناقصة.

Keep the sentence structure Arabic.

Use English only for technical terms.

---

## Article Prefix Rule

When using English technical terms inside Arabic, usually add:

```text id="07fsyo"
الـ
```

Examples:

- الـ API
- الـ component
- الـ endpoint
- الـ database
- الـ layout
- الـ dashboard
- الـ middleware
- الـ validation
- الـ migration
- الـ response
- الـ request

Good:

> الـ endpoint كان شغال، بس الـ response ناقص.

Bad:

> endpoint كان شغال، بس response ناقص.

Exception:
Do not force `الـ` when the term is used like a product name or tool name.

Good:

> React ساعدني أفهم components بطريقة أوضح.

Good:

> Prisma خلاني أتعامل مع database بطريقة أسهل.

Usually avoid:

> الـ React
> الـ Prisma

Unless it sounds natural in the sentence.

---

## Product / Tool Names

Keep product and technology names in English.

Examples:

- React
- TypeScript
- JavaScript
- Node.js
- Express
- PostgreSQL
- Prisma
- Tailwind
- Vite
- Git
- GitHub
- Vercel
- Docker
- Playwright
- Vitest
- Supabase
- Figma
- VS Code
- Linux
- Ubuntu

Good:

> لما بلشت أستعمل Prisma، فهمت العلاقة بين schema و database أكتر.

Bad:

> لما بدأت باستخدام بريزما، فهمت العلاقة بين المخطط وقاعدة البيانات أكثر.

The bad version is too translated.

---

## Avoid Awkward Translations

Avoid translating common technical terms into unnatural Arabic.

Bad translations:

- واجهة برمجة التطبيقات for API
- نقطة النهاية for endpoint
- خطاف for hook
- خاصيات for props
- حالة for state in React context
- ترحيل for migration in Prisma/database context
- مستودع for repository in code architecture context
- تحكم for controller
- خدمة for service layer when it sounds unclear
- وسيط for middleware
- مصادقة for authentication if the audience usually says authentication
- تفويض for authorization if the audience usually says authorization

Preferred:

- API
- endpoint
- hook
- props
- state
- migration
- repository
- controller
- service
- middleware
- authentication
- authorization

Important:
Arabic translations can be correct academically, but this skill optimizes for natural developer content, not formal textbooks.

---

## When Arabic Translation Is Acceptable

Use Arabic when the term is common and natural.

Good Arabic terms:

- قاعدة بيانات
- بيانات
- مشروع
- مستخدم
- صلاحيات
- تسجيل الدخول
- ملف
- صفحة
- جدول
- قائمة
- عقد
- دفعة
- مبلغ
- حالة
- نتيجة
- خطأ
- اختبار
- تجربة
- تحسين
- أداء
- حماية
- أمان

Examples:

Good:

> قاعدة البيانات كانت سليمة، بس الـ query كانت راجعة بيانات ناقصة.

Good:

> المشكلة ظهرت لما المستخدم حاول يسجّل الدخول.

Good:

> حسّنت ترتيب الصفحة لأن الجدول كان صعب ينقرأ.

---

## Authentication / Authorization Rule

For casual technical content, keep:

- authentication
- authorization

But when explaining to a beginner, you can add a simple Arabic explanation.

Good:

> هون فهمت الفرق بين authentication و authorization:
> authentication يعني مين أنت.
> authorization يعني شو مسموح تعمل.

Bad:

> المصادقة والتفويض هما مفهومان أساسيان في أنظمة الأمان الحديثة.

The bad version is formal and textbook-like.

---

## Database Rule

Use Arabic for “database” only when it feels normal.

Both can work:

> قاعدة البيانات رجّعت نتيجة غلط.

> الـ database رجّعت نتيجة غلط.

Choose based on sentence flow.

Usually prefer Arabic when the sentence is general:

> المشكلة كانت من قاعدة البيانات.

Prefer English when attached to technical context:

> الـ database schema كان ناقصه constraint.

---

## Testing Rule

Use English for specific testing types.

Good:

> unit test

Good:

> integration test

Good:

> E2E test

Use Arabic for general explanation:

> الاختبار ساعدني أتأكد إنو التعديل ما كسر شي.

Good mixed sentence:

> كتبت integration test لأن المشكلة مرتبطة بالـ database والـ API سوا.

---

## UI Rule

Keep UI/UX terms in English when they are design concepts.

Good:

> المشكلة كانت بالـ visual hierarchy.

Good:

> الـ spacing بين العناصر مش ثابت.

Good:

> empty state لازم يشرح للمستخدم شو يعمل.

Use Arabic for obvious visual words:

> الزر مش واضح.

> الجدول صعب ينقرأ.

> الصفحة فيها ازدحام.

---

## Money / Business Terms

For the vehicle rental platform or business content, prefer natural Arabic for business terms.

Use Arabic:

- عقد
- سيارة
- زبون
- دفعة
- مبلغ
- مصروف
- صيانة
- إيجار
- تقرير
- حالة
- متأخر
- مدفوع
- غير مدفوع

Keep English only when it is part of code/product structure:

- Rental model
- Payment module
- Expense table
- Maintenance status
- enum
- dashboard

Good:

> الزبون دفع جزء من المبلغ، فكان لازم الـ Payment module يحسب الباقي صح.

Bad:

> الـ customer دفع part من الـ amount.

---

## Grammar Around English Terms

Treat English technical terms as fixed units.

Good:

> الـ component كان طويل.

Good:

> الـ components كانوا كتار.

Good:

> الـ API رجّع response ناقص.

Good:

> الـ tests مرقوا.

Avoid forcing Arabic pluralization on English terms.

Bad:

> كومبوننتات
> تيستات
> إندبوينتات

These may be used casually in speech, but written content looks cleaner when English terms stay English.

Preferred:

> components
> tests
> endpoints

---

## Consistency Rule

Once a term is chosen, keep it consistent in the same content item.

Bad:

> API
> واجهة برمجة التطبيقات
> endpoint service interface

Good:

> API
> endpoint
> request
> response

Do not switch between Arabic and English versions of the same technical term unless explaining the meaning.

---

## Explanation Rule

When the reader may not know the English term, explain it simply instead of translating it awkwardly.

Good:

> الـ middleware هو كود بيمرّ عليه الـ request قبل ما يوصل للـ controller.

Good:

> الـ migration هي الطريقة اللي منغيّر فيها شكل قاعدة البيانات بشكل منظّم.

Good:

> الـ schema هو الشكل اللي بيحكي كيف البيانات مرتبة.

Avoid:

> الوسيط هو برمجية وسيطة تقوم بمعالجة الطلب قبل وصوله إلى المتحكم.

---

## Before / After Examples

### Example 1

Bad:

> واجهت مشكلة في واجهة برمجة التطبيقات عند إرسال الطلب إلى نقطة النهاية.

Good:

> صار عندي مشكلة بالـ API لما بعت request على الـ endpoint.

---

### Example 2

Bad:

> يجب فهم الخاصيات والحالة عند العمل مع رياكت.

Good:

> بالبداية كنت ملخبط بين props و state بـ React.

---

### Example 3

Bad:

> قمت بإنشاء ترحيل جديد لتعديل مخطط قاعدة البيانات.

Good:

> عملت migration جديدة حتى عدّل database schema.

---

### Example 4

Bad:

> فشل الاختبار الوحدوي بسبب قيمة غير صحيحة.

Good:

> الـ unit test فشل لأن القيمة الراجعة كانت غلط.

---

### Example 5

Bad:

> أضفت وسيطاً للتحقق من صلاحية الرمز.

Good:

> أضفت middleware يتأكد من الـ token قبل ما يكمل الـ request.

---

## Writing Patterns

### Pattern 1: Technical Problem

```text id="nnayag"
صار معي [مشكلة] بالـ [technical term].

كنت مفكر السبب [assumption].

بس بعد ما فتحت [logs / response / database / file]، طلع السبب [real cause].
```

Example:

> صار معي 404 بالـ login request.
> كنت مفكر المشكلة من backend route.
> بس بعد ما فتحت Network tab، طلع الـ frontend عم يطلب port غلط.

---

### Pattern 2: Concept Became Clear

```text id="b14hj7"
ما فهمت [technical term] منيح إلا لما [real project moment].

قبلها كنت شايفه [old view].

بعدها فهمت إنو [simple explanation].
```

Example:

> ما فهمت transaction منيح إلا لما صار عندي rental update لازم يغيّر أكتر من جدول سوا.
> قبلها كنت شايفها concept نظري.
> بعدها فهمت إنها بتحمي البيانات من إنها تصير بنص حالة غلط.

---

### Pattern 3: Simple Explanation

```text id="6rw8nd"
[technical term] ببساطة يعني [simple explanation].

مش [wrong assumption].

هو أقرب لـ [practical mental model].
```

Example:

> authorization ببساطة يعني شو مسموح تعمل بعد ما تسجّل دخول.
> مش نفس authentication.
> authentication بتأكد مين أنت، authorization بتحدد صلاحياتك.

---

## Review Checklist

Before accepting Arabic technical content, check:

- Are English technical terms kept when natural?
- Are normal words kept in Arabic?
- Is the sentence structure Arabic?
- Is there too much English?
- Is there awkward textbook translation?
- Are terms consistent?
- Are React/backend/database/testing terms used naturally?
- Is the explanation clear for a CS student?
- Does the text sound like a real Arab developer/student would write it?
- Is the tone still student-builder, not teacher-like?

If the content sounds translated, rewrite it.

---

## Rewriting Instruction

When rewriting Arabic technical content:

1. Keep natural English developer terms.
2. Replace awkward Arabic technical translations with common English terms.
3. Replace unnecessary English normal words with Arabic.
4. Keep sentence structure Arabic.
5. Add simple explanations when a term may be unclear.
6. Keep terminology consistent.
7. Avoid textbook Arabic.
8. Preserve the student-builder voice.

---

## Output Standard

The final writing should feel like:

> Arabic explanation with natural developer English.

Not:

> English sentence with Arabic pieces.

Not:

> Formal Arabic textbook translation.

Not:

> Random Arabic-English mixing.

The best result is the kind of sentence an Arabic-speaking CS student would actually write while explaining what happened in a project.
