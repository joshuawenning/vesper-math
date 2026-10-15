# Optional free language models for Elian

Decision: document options first. The current on-device tutor remains the default. No LLM SDK, model download, API route, credential, or external chat transmission has been added.

## Options

| Option                          | What is free                                                           | Tradeoff                                                                                                  | Fit for Vesper Math                                                                                                                                                                                         |
| ------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Groq free tier                  | A limited hosted inference quota                                       | Account and server-side key required; quotas and model availability can change; messages leave the device | A practical optional service for a Vercel-hosted app if the owner accepts the provider’s terms and limits. Never promise unlimited free use.                                                                |
| WebLLM                          | Browser inference with open model weights; no hosted inference API fee | Initial model download, browser storage, WebGPU compatibility, memory and battery use                     | An opt-in desktop experiment, loaded only after explicit consent. Keep it out of the initial page bundle and use a worker so generation does not block the interface. Test phones before offering it there. |
| Ollama on the player’s computer | Local inference without a hosted token bill                            | Installation, a downloaded model, suitable hardware, and local service configuration                      | Useful for personal/local deployments. A Vercel server cannot reach a player’s localhost service. Do not expose a local inference port publicly to make that work.                                          |

“Free” describes inference fees or a current service tier. Hardware, electricity, hosting, account requirements, model licenses, and download costs can still apply.

## Recommended boundary

Keep the existing deterministic engine responsible for generating quizzes, calculating answers, checking equivalence, scoring, recording discoveries, and limiting mathematical input. A language model may help phrase an explanation or continue a math conversation; it must not decide whether an answer is correct or directly modify a save.

For an optional hosted service, add a separate server endpoint with a fixed provider URL and environment-only secret. Never expose the key through NEXT_PUBLIC variables, save exports, logs, client JavaScript, or preferences. Avoid a user-supplied URL proxy. Apply request size limits, bounded conversation history, output limits, cancellation, timeouts, and a real shared rate limiter appropriate to serverless hosting. Use the verified tutor as the fallback for errors and exhausted quotas. Do not present generated explanations as verified calculations.

Before sending a message, clearly explain that chat will leave the device, name the provider, and require an explicit opt-in. Keep player records out of requests unless necessary and disclosed. The existing private on-device mode must continue to work without a key or provider connection. Safeguards need adversarial tests; a math-only system prompt is not a security boundary.

For WebLLM, show the model download size, supported-device check, loading progress, cancellation and removal controls before download. Import the runtime only after opt-in and keep a single worker-backed engine. No model should download automatically when a player opens Elian’s modal.

## Small implementation plan after a provider is chosen

1. Define an explanation-only adapter receiving the current math topic, a bounded conversation, and a verified explanation when available.
2. Keep quiz commands and answer submissions in the existing local tutor; send only eligible conversational turns to the optional adapter.
3. Make opt-in and fallback states clear in Settings, without adding setup controls to the main adventure.
4. Validate mathematical examples, refusal behavior, privacy, cancellations, provider failures, quota exhaustion, and slow devices before rollout.

## Official references

Reviewed October 15, 2026. Recheck terms and quotas when selecting a service.

- [Groq rate limits and free-plan limits](https://console.groq.com/docs/rate-limits)
- [Groq billing FAQs](https://console.groq.com/docs/billing-faqs)
- [WebLLM overview](https://webllm.mlc.ai/docs/index.html)
- [WebLLM getting started](https://webllm.mlc.ai/docs/user/get_started.html)
- [Ollama API compatibility documentation](https://github.com/ollama/ollama/blob/main/docs/api/openai-compatibility.mdx)
