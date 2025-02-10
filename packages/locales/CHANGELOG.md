# Changelog

## [1.2.0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/locales-v1.1.0...locales-v1.2.0) (2025-02-10)


### Features

* Abstract identity components, use in canvases, easier pool metrics access ([#2479](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2479)) ([3dd021b](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/3dd021be779485875b0976cca70ec36bd293b370))
* Backing terminology for nomination list items ([#2449](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2449)) ([adcbc97](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/adcbc9784e31588e92d81cce56ff3554bf9b7895))
* Easier access to validator metrics ([#2450](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2450)) ([12379a5](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/12379a5f041d742b67a70672fa093379ee8cf397))
* Enhance graphs, add validator rewards, pool reward history graphs ([#2462](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2462)) ([ccda2cb](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/ccda2cbaeac8075e8a6650410538f9f0ae9885d5))
* Force plugins in production environment, promote tips to UI ([#2458](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2458)) ([fb1d3b3](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/fb1d3b39e136a6c16c7946900aa7447c3d126ceb))
* Implement browser language detection using navigator.language ([#2494](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2494)) ([f526f8e](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/f526f8ef060774810972b9596138d007633779a3))
* Pool performance & join candidates from Staking API, fallbacks, UI enhancements ([#2457](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2457)) ([73f198c](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/73f198c7956bfbd1cbb47780bcfac8e10d15d689))
* Validator performance charts from Staking API ([#2466](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2466)) ([6215f47](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/6215f4731505e95bf78ffe826f57918b99e7a6a5))
* Validator ranks from Staking API, stop historical era point scraping ([#2480](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2480)) ([abe0b1c](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/abe0b1c097dc89b60fd2c540fe84f66f69a2b6c4))

## [1.1.0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/locales-v1.0.0...locales-v1.1.0) (2025-01-16)


### Features

* Add 100% validator commission prompt. ([#2358](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2358)) ([01294ae](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/01294aed9a437a26fe5543f8abb48ae5a0023cec))
* Disable dual staking ([#2368](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2368)) ([e94d92d](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e94d92d27fee4739a1f349a4c5ed897cae24fa1a))
* **fix:** Abstract `LeavePool`, use as depositor unbond ([#2370](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2370)) ([a97eaaf](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/a97eaaf1591a0306d6de760ee6f74875fb4d52de))
* **fix:** Fix prettier organize imports, lint. ([#2340](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2340)) ([441caf7](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/441caf7069b7d9a59116c05a88e82748e7b31388))
* Nominator Rewards from Staking API, discontinue Subscan nominator rewards ([#2365](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2365)) ([5e36d3a](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/5e36d3ae97177b19fc4875a891958b70186b0781))
* normalise title w. polkadot ([e163a0f](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e163a0fa411764e335e9e5a858f8ba1bc2140f62))
* **refactor:** Locales to package, fixes and structural improvements. ([#2338](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2338)) ([b9efa04](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/b9efa04f90839b13d6276c2209229d6adfe330f4))
* **refactor:** Migrate to ESLint 9 ([#2342](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2342)) ([43db0c0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/43db0c0259de34f7ce989de4b7596011e8a22000))
* **refactor:** Remove semi ([#2356](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2356)) ([4c10b19](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/4c10b192612f557128b3eb23af68a24a993f41e7))
* Spanish functionality & English corrections ([#2422](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2422)) ([46cde96](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/46cde9698855126fbca1b0193b4ca3d11ed8c506))
* Use `useCanFastUnstake` query ([#2377](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2377)) ([0d99cbb](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/0d99cbb7156c30a047b4db32187977c1bc7b42c4))
