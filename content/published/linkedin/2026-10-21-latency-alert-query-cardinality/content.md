On staging, a latency alert kept switching between FIRING and RESOLVED, and we were getting repeated alert emails and multiple alert instances.

Investigation traced the issue to the LogQL query. After JSON parsing, request-specific labels were still being kept, so the query returned multiple series and produced multiple alert instances.

The fix was to keep only `responseTime` before unwrapping and aggregation:

```logql
| keep responseTime
| unwrap responseTime
```

The corrected staging read rule produced one aggregate series. We applied the same query change to the staging and production read and mutation queries, but the runbook specifically confirms the single-series result for the staging read rule.

The alert thresholds stayed the same: read P95 above 500 ms and mutation P95 above 800 ms. This fixed the alert-query cardinality; it does not show that application response time improved.

This was a useful reminder that noisy alerts do not always point to an application issue. Sometimes the query itself creates the noise. Have you run into an alert where the query turned out to be the problem?
