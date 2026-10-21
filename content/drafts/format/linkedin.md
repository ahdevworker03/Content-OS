On staging, a latency alert kept switching between FIRING and RESOLVED.

At first, it looked like an application issue. We were also getting repeated alert emails and multiple alert instances.

The problem turned out to be in the LogQL query.

After JSON parsing, request-specific labels were still being kept, so the query returned multiple series and produced multiple alert instances.

The fix was small:

```logql
| keep responseTime
| unwrap responseTime
```

By keeping only responseTime before the unwrap and aggregation, the corrected staging read rule produced one aggregate series.

We applied the same query change to the staging and production read and mutation queries. But I’m keeping the verified result narrow: the runbook specifically confirms the single-series result for the staging read rule.

The alert thresholds did not change: read P95 above 500 ms and mutation P95 above 800 ms.
And this fix does not show that application response time improved. It fixed the alert-query cardinality.

For me, the useful part was realizing that a noisy alert does not always point back to the application. Sometimes the query itself is creating the noise.
Have you run into an alert where the query turned out to be the real problem?
