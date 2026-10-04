# Architecture (high-level)

This is a **product overview** diagram. Implementation details of hosted TradingPlus are not published in this repository.

```text
┌──────────────────────────────────────────────────────────────────────┐
│                         TradingPlus Workspace                        │
│                                                                      │
│  ┌─────────────┐   ┌──────────────┐   ┌───────────────────────────┐  │
│  │ Market data │→  │ Chart engine │→  │ Indicators / overlays     │  │
│  │ (multi-mkt) │   │ (LWC-style)  │   │ Pine-compatible scripts   │  │
│  └─────────────┘   └──────────────┘   └───────────────────────────┘  │
│           │                  │                     │                 │
│           ▼                  ▼                     ▼                 │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │              Strategy & research workspace                   │    │
│  │  HQ entry · Screener (daily batch) · Yunai / CH assistants   │    │
│  └──────────────────────────────────────────────────────────────┘    │
│           │                                                          │
│           ▼                                                          │
│  ┌────────────────────┐   ┌──────────────────┐   ┌───────────────┐   │
│  │ Auth & sessions    │   │ Billing / Pro    │   │ Enterprise    │   │
│  │ (personal / org)   │   │ metering         │   │ multi-session │   │
│  └────────────────────┘   └──────────────────┘   └───────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
                │                              │
                ▼                              ▼
     https://tradingplus.org        https://tradingplus.yunai.com.cn
           (global)                        (China mirror)
```

## Layers (marketing view)

| Layer | Role |
| --- | --- |
| Data | Multi-market quotes & history (crypto, CN/HK, US, futures) |
| Chart | Fast interactive charts, overlays, drawing tools |
| Research | Screener batches, HQ entry cues, AI assistants (Yunai / CH) |
| Account | Login, Pro billing, enterprise session policy |
| Edge | Global site + China mirror for latency |

## Self-hosting

**Not open at this time.** See the main [README](../README.md#self-hosting).
