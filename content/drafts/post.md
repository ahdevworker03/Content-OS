# Canonical Content

## Core Idea

Request-specific labels retained in the latency alert queries multiplied alert instances and contributed to repeated FIRING/RESOLVED emails. In this incident, the noisy alert behavior came from query cardinality, not an application latency defect.

## Trigger

Staging latency alerts repeatedly changed between FIRING and RESOLVED and generated many alert instances. The investigation traced the behavior to request-specific labels retained after parsing structured logs in the LogQL queries.

## Reasoning

The parsed log stream still carried request-specific labels into the latency aggregation. Those labels produced multiple alert series and instances where the intended result was one aggregate series. The repeated notifications therefore pointed to the shape of the alert query result, rather than establishing that application code caused the alert flapping.

The correction kept `responseTime` after JSON parsing and before unwrapping and aggregation:

```logql
| keep responseTime
| unwrap responseTime
```

This collapsed the request-specific labels from the query result. The captured operational record says the correction was applied to staging and production read and mutation latency queries, while the corrected staging read rule was specifically observed to produce one aggregate series.

## Key Points

- Many alert instances and repeated FIRING/RESOLVED emails can result from request-specific labels retained in an alert query.
- In this case, investigating the query's retained labels identified the alert-cardinality defect; changing application code or alert thresholds was not the chosen fix.
- The correction preserved the approved thresholds and saved pending/keep-firing semantics.
- The runbook records read P95 alerting above 500 ms and mutation P95 alerting above 800 ms. These are alert thresholds, not reported measurements of response times.

## Supported Examples and Sources

- The recorded LogQL correction is `| keep responseTime` followed by `| unwrap responseTime`. Source: `content/ideas/2026-10-13-markab-latency-alert-cardinality/query-fragment.logql` and Markab `docs/operations/step-65-observability-runbook.md`, “Latency alert query correction.”
- The runbook states that the correction was applied to staging and production read/mutation latency queries and that the corrected staging read rule produces one aggregate series.
- The captured idea records the original staging FIRING/RESOLVED email flapping and the investigation finding that request-specific labels multiplied alert instances. Source: `content/ideas/2026-10-13-markab-latency-alert-cardinality/idea.json`.

## Claims, Uncertainty, and Factual Boundaries

- The evidence supports query cardinality as the cause of the multiple alert instances and repeated notifications in this incident. It does not establish that all latency alert flapping is caused by cardinality.
- The alert-query correction addressed aggregation and alert instances. No improvement in application response time was reported.
- The runbook reports one aggregate series for the corrected staging read rule. It does not state that each of the other three corrected rules was separately verified to produce one aggregate series.
- The available query fragment does not include the complete LogQL expression or the full alert rules; do not reconstruct those details from this excerpt.
- The 500 ms and 800 ms values are the preserved read and mutation alert thresholds, not measured latency results.

## Intended Takeaway

When latency alert notifications look noisy, the retained labels in the query can be part of the problem. In this example, checking query cardinality revealed why the alerts multiplied without treating the behavior as an application latency defect or changing the approved thresholds.

## CTA Intent

Invite peers to discuss whether they have encountered noisy alert instances caused by query labels or result cardinality.

## Wording to Preserve

- “request-specific labels”
- “FIRING/RESOLVED”
- `| keep responseTime` followed by `| unwrap responseTime`
- The distinction between an alert-query cardinality defect and an application latency defect
