# My Feed

Route `/#feed` is the default no-hash landing page and brand-link destination. `/#work` remains the activity/project management page. This is a frontend prototype with no login service or backend changes.

## Direction

Operate/Read extension of the existing GrowthIQ identity. An editorial stream leads; task management supports it in a narrow right panel. Question composer at the top, filterable mixed feed, bookmarks, compact work/draft/project shortcuts. No task table on the home page. Mobile stacks the supporting panel below the feed.

## Behavior and data

`my-feed.js` / `my-feed.css` use the existing captured market signals and links to Jabil/Thermo results. Radar digest is an archive example, not generated from a user's subscription. Expert replies are not fabricated; Ask Domain Expert is available as a supporting entry point. Live personalized delivery, ranking, unseen counts and timestamps are not simulated.

Filters: For you, Markets, Research, Radar and Saved. Bookmarks persist locally under `growthiq-feed-saved-v1`; storage failure is disclosed. Question drafts survive local filter/save rerenders. Submitting a question or choosing Explore the implications transfers editable text to Ask GrowthIQ through a scoped custom event. It does not run research or send an API request.

Supporting work and projects come from the My Work snapshot adapter, including browser-saved records. Project shortcuts select the matching project at `/#work`; activity shortcuts select details there. Captured research provides a fallback when no local question exists. My Work's examples and limitations remain unchanged.

## Mainline handoff

Use the mainline auth/router for post-login routing. Replace fixtures and local storage with confirmed feed/project/activity contracts, preserving explicit provenance and actual status meanings. Feed item IDs must be stable. Do not add endpoints or invent expert replies. Source styles inherit GrowthIQ theme variables; no global redesign.
