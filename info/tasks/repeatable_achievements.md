# Implement **burnable achievements**

### Goal

Add a new achievement type called **burnable achievements**.

They should behave similarly to **repeatable achievements**, but with one key difference:

* progress must be accumulated **within a defined time period**
* if the user does **not** complete the required number of actions within that period, the progress is **reset to zero**

### Expected behavior

A burnable achievement should support:

* a required number of completions/actions
* a configured time window or period
* progress tracking within the current active period
* automatic reset of progress to `0` when the period ends and the requirement was not met

### Example

If an achievement requires:

* `5` completions
* within `7 days`

then:

* if the user completes all 5 within 7 days, the achievement is granted
* if the user completes only 3 within 7 days, then at the end of the 7-day period their progress resets to 0 and a new period begins

### Requirements

1. Add support for burnable achievements in the achievement model/config.
2. Reuse as much logic as possible from repeatable achievements.
3. Implement period-based progress tracking.
4. Implement automatic progress expiration/reset.
5. Make sure reset happens only for burnable achievements.
6. Update achievement status calculation so the UI/API can correctly show:

   * current progress
   * required target
   * current active period
   * whether progress will expire
7. Update admin configuration so burnable achievements can be created and edited.
8. Update user-facing interfaces to clearly indicate that:

   * this achievement is time-limited
   * progress resets if not completed in time

### Edge cases

Please handle these carefully:

* period boundary behavior
* timezone consistency
* partial progress near the end of the period
* repeated periods after a reset
* granting achievement exactly at the boundary
* interaction with repeatable achievements so existing behavior is not broken

### Deliverables

* backend implementation
* config/schema changes
* status calculation updates
* admin/UI updates where relevant
* brief documentation describing how burnable achievements work

Also include a short note explaining the proposed data model and reset strategy before implementation.
