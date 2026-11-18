# npm audit and withdrawn advisory — 19 November 2026, Asia/Shanghai

The 18 November production deployment failed because npm audit reported 20 high-severity package entries derived from GHSA-fc5q-39xc-vjpf (picomatch). GitHub's advisory API reports `withdrawn_at` 2026-11-18T15:38:56Z. npm's audit response continued reporting the same advisory on 19 November; the audited lockfile reports picomatch 2.3.2 and 4.0.7 as development dependencies. The report also includes two moderate findings associated with satori; these remain open and are not declared fixed.

The dependency audit still runs on every release. To handle this specific cross-registry mismatch, its fail-closed check accepts a high-severity result only when every high-severity dependency path terminates at this exact advisory AND GitHub's advisory API verifies that exact identifier as withdrawn at runtime. API failure, an active advisory, malformed audit, unknown or circular path, other high advisory, or any critical advisory fails the release. The ordinary audit report and moderate count remain visible. This does not patch picomatch or declare it invulnerable; do not feed untrusted glob patterns to development tooling. Remove this special case once npm no longer reports the withdrawn advisory.

Sources: https://github.com/advisories/GHSA-fc5q-39xc-vjpf and https://api.github.com/advisories/GHSA-fc5q-39xc-vjpf .
