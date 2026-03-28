# Auto-Grant Achievements

## Description

An achievement with the `auto_grant = true` flag is awarded to the user **automatically** — without submitting a claim or requiring administrator approval — at the moment when all of its prerequisites are satisfied.

It is used for rewards granted upon completion of an achievement chain.

## How it works

1. An administrator approves a regular claim (`approve_claim`).
2. After the result is recorded, `_process_auto_grants(session, group_id, user_id)` is called.
3. The function loads all active `auto_grant` achievements and calculates their status for the user.
4. If the status is `AVAILABLE`, the achievement is granted via `upsert_gua_approved()`, and an `ADMIN_GRANTED` event is logged with `{"reason": "auto_grant"}`.
5. The cycle repeats until no new grants are made (to support chained cascades).
6. Everything happens within the same transaction as the original approval.

## YAML Configuration

```yaml
- code: chain_complete
  title: Chain Complete
  category: health
  rarity: EPIC
  auto_grant: true          # ← auto-grant flag
  points: 100
  prerequisites:
    - code: step_one
      min_level: 1
    - code: step_two
      min_level: 1
    - code: step_three
      min_level: 1
```

## Interface Behavior

| Location                              | Behavior                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------- |
| Telegram bot, `/achievements` catalog | Shows `⚡` after the title                                                       |
| Telegram bot, achievement list        | Shows `⚡` before the title in the button                                        |
| Telegram bot, detail card             | Line “Auto-grant: ⚡ Yes” + no “Claim” button                                    |
| Notification on auto-grant            | Separate message to the user and to the group with `⚡`                          |
| Web interface, card                   | Badge `⚡ Auto` in the meta row                                                  |
| Web interface, profile page           | Badge `⚡ Auto` + status “⚡ Granted automatically” instead of the “Claim” button |
| Web interface, admin form             | Checkbox “⚡ Auto-grant”                                                         |
| Telegram bot, admin panel             | Button “⚡ Auto: ON/OFF” + line “Auto-grant” in details                          |

## Limitations

* An `auto_grant` achievement should not have prerequisites that are themselves `auto_grant` in long cascades — this is theoretically supported, but it is best avoided to simplify debugging.
* Auto-grant is triggered only when a claim is approved through the bot. A direct grant via `/grant` does **not** trigger auto-grant.
