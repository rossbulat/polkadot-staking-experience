# Changelog

## [1.9.0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/app-v1.8.0...app-v1.9.0) (2025-02-10)


### Features

* Abstract identity components, use in canvases, easier pool metrics access ([#2479](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2479)) ([3dd021b](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/3dd021be779485875b0976cca70ec36bd293b370))
* Add pool commission label to `Pool` canvas ([#2478](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2478)) ([9bd440a](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/9bd440ad45a5a47f2eda2e522a3b0e510ac4410f))
* Backing terminology for nomination list items ([#2449](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2449)) ([adcbc97](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/adcbc9784e31588e92d81cce56ff3554bf9b7895))
* Easier access to validator metrics ([#2450](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2450)) ([12379a5](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/12379a5f041d742b67a70672fa093379ee8cf397))
* Enhance graphs, add validator rewards, pool reward history graphs ([#2462](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2462)) ([ccda2cb](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/ccda2cbaeac8075e8a6650410538f9f0ae9885d5))
* Force plugins in production environment, promote tips to UI ([#2458](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2458)) ([fb1d3b3](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/fb1d3b39e136a6c16c7946900aa7447c3d126ceb))
* Global token price provider ([#2495](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2495)) ([1839d8f](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/1839d8fda077ff06e9849c9632b9b8b59a0d5afe))
* Pool performance & join candidates from Staking API, fallbacks, UI enhancements ([#2457](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2457)) ([73f198c](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/73f198c7956bfbd1cbb47780bcfac8e10d15d689))
* **refactor:** Enhance accent colors, unify primary & secondary colors ([#2500](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2500)) ([cd80af7](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/cd80af7d2740d5920a2fb088216659a1615aa2ad))
* **refactor:** graph colors to CSS, remove JS based config ([#2502](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2502)) ([befad34](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/befad3486f128074877d1a53540d0c08fde75068))
* **refactor:** Init `ui-graphs`, replace pie chart with pure CSS `Pie` component ([#2496](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2496)) ([98adc49](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/98adc49a7dfb423d422b77f200b32aacb45b198c))
* **refactor:** List components to `ui-core` ([#2465](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2465)) ([01d5c77](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/01d5c7705a51e8cbcb96fd77ef5f710aaa75d470))
* **refactor:** Misc updates & renames ([#2461](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2461)) ([ea3d4c3](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/ea3d4c3e796e09bfff3da659f5816416129ff933))
* **refactor:** Refactor stat cards to `ui-` packages, remove legacy code ([#2499](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2499)) ([26ae9d5](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/26ae9d5e8cb4fc9bd62c07c6a6bf3d8241afca42))
* **refactor:** Simplify bond buttons, unify "Unstake" term for nominators and pools ([#2467](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2467)) ([90bd894](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/90bd894af33ba276f29d50d054dbad5d550c72b0))
* **ux:** Get theme values directly from CSS, discontinue network colors ([#2501](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2501)) ([b8630d1](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/b8630d1291b9e39a83a6cd98eb7da8f5ed128bf2))
* **ux:** Plug role identities into `Pools` canvas, improve identity handling ([#2481](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2481)) ([dd576b5](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/dd576b58eb10c2855ab51d67b283f7c783c2d101))
* **ux:** Use Cloud icon for favicon & app icon ([#2503](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2503)) ([2324eec](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/2324eec09f2cfcd6c986cda6d1364b2bdc173b13))
* Validator performance charts from Staking API ([#2466](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2466)) ([6215f47](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/6215f4731505e95bf78ffe826f57918b99e7a6a5))
* Validator ranks from Staking API, stop historical era point scraping ([#2480](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2480)) ([abe0b1c](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/abe0b1c097dc89b60fd2c540fe84f66f69a2b6c4))


### Bug Fixes

* batch call test ([#2447](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2447)) ([6f4f9ae](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/6f4f9ae861bca36e4252cf76301ee6633b434acd))

## [1.8.0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/app-v1.7.0...app-v1.8.0) (2025-01-16)


### Features

* Add 100% validator commission prompt. ([#2358](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2358)) ([01294ae](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/01294aed9a437a26fe5543f8abb48ae5a0023cec))
* Disable dual staking ([#2368](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2368)) ([e94d92d](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e94d92d27fee4739a1f349a4c5ed897cae24fa1a))
* **fix:** Abstract `LeavePool`, use as depositor unbond ([#2370](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2370)) ([a97eaaf](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/a97eaaf1591a0306d6de760ee6f74875fb4d52de))
* **fix:** Ensure unclaimed payouts are ints ([#2336](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2336)) ([9b59277](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/9b59277365ae06a88ad9f8ce8d70de113169717d))
* **fix:** Fix prettier organize imports, lint. ([#2340](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2340)) ([441caf7](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/441caf7069b7d9a59116c05a88e82748e7b31388))
* **fix:** Remove left pool from state ([#2373](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2373)) ([4b823b9](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/4b823b9108b7502f0a40ed4c08da3197dd4f343c))
* **fix:** use compact prefix ([#2374](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2374)) ([f923419](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/f923419f04637b8fcf8e1026ce394cbc3dc0b58c))
* Historical pool rewards to Staking API, replace Subscan ([#2376](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2376)) ([9233131](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/9233131dfc4cb2781f719b80c825adc4fbc6c94c))
* init `ui-structure`, `consts`, `styles` packages, migrate Structure kit ([#2330](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2330)) ([6d15f49](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/6d15f49460315940ec7a2502a2dca238f72c401f))
* Init monorepo, `app` and `ui-buttons` packages ([#2327](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2327)) ([09c8daa](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/09c8daa701596e65143799497c1116242358560f))
* Init Staking API GraphQL Plugin, discontinue Binance Spot ([#2332](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2332)) ([297b1d4](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/297b1d463a770fcd213d9e9083e85446ce6fa834))
* **light client:** Use wss boot nodes only ([#2345](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2345)) ([02e778d](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/02e778d1731c405cb9ff955b49fc6a91645f3cdc))
* Nominator Rewards from Staking API, discontinue Subscan nominator rewards ([#2365](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2365)) ([5e36d3a](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/5e36d3ae97177b19fc4875a891958b70186b0781))
* normalise title w. polkadot ([e163a0f](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e163a0fa411764e335e9e5a858f8ba1bc2140f62))
* **refactor:** `ui-structure` to `ui-core`, handle multiple exports ([#2411](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2411)) ([21d6d87](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/21d6d876826cdea76cc85ea1db1ad0df56afe3c8))
* **refactor:** Add assets package, move svgs to package ([#2361](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2361)) ([15c08b1](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/15c08b1f224cad6578575eae67cc03fe0947d938))
* **refactor:** Initialise `ui-overlay` package, restructure components ([#2409](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2409)) ([70a81bf](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/70a81bfafbe0dff74b4a6c5053b9842d86d43dea))
* **refactor:** Locales to package, fixes and structural improvements. ([#2338](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2338)) ([b9efa04](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/b9efa04f90839b13d6276c2209229d6adfe330f4))
* **refactor:** Migrate to ESLint 9 ([#2342](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2342)) ([43db0c0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/43db0c0259de34f7ce989de4b7596011e8a22000))
* **refactor:** Modal close refactor, helmet async, rm react-scroll ([#2412](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2412)) ([7977231](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/797723187060e8e32e696c81cc8aa0c899507708))
* **refactor:** Move CardHeader to `core-ui` ([#2423](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2423)) ([8793f3a](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/8793f3a4f6c1aed50797df4b7d493ffa5a43b8fc))
* **refactor:** Pool rewards to controller, pool types to `types` package ([#2344](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2344)) ([437ffe4](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/437ffe4cca9ac23fe412cec68f59ee095f1e195f))
* **refactor:** Remove semi ([#2356](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2356)) ([4c10b19](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/4c10b192612f557128b3eb23af68a24a993f41e7))
* **refactor:** Rm `useSize` hook, `lodash` deps ([#2341](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2341)) ([a03169b](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/a03169bab77b74f1d2dc1b16aef7405babb30185))
* **refactor:** Simplify `ui-core` structure ([#2414](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2414))t ([b9f42d2](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/b9f42d2c3c776fbc833e4fea36aefba0cdbbb737))
* **refactor:** Use `@lottiefiles/dotlottie-react` ([#2413](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2413)) ([01fbcd8](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/01fbcd815db5fa51b2facecbf2f8be302a4264b6))
* **refactor:** Use Staking API for validator era points ([#2417](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2417)) ([9e1b37f](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/9e1b37f1f032173700ce8cfacb18460143070db0))
* Refetch token price if online status is true ([#2337](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2337)) ([c87a8f2](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/c87a8f2d6cff43b72c817c170fa83ced6d2786b9))
* Revise footer ([#2408](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2408)) ([30e739e](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/30e739ed1ca7bebcc2ca6c4b4ebee2e54b2d2e77))
* Support options refresh with Discord and Mail ([#2331](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2331)) ([0700594](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/07005940dc45a1921d530e18c5c49efd0f4c4d61))
* Tx subscriptions to `TxSubmission` ([#2372](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2372)) ([04308d4](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/04308d45f9d8bec4ef29695767b2b982485c1ffc))
* Use `useCanFastUnstake` query ([#2377](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2377)) ([0d99cbb](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/0d99cbb7156c30a047b4db32187977c1bc7b42c4))
* use latest validator assets ([#2375](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2375)) ([b2a8af1](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/b2a8af1ff57fa8412efe67d08e1233e6eeea50ac))
* Use pool points for unbonding / leaving pool ([#2369](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2369)) ([e1c3a08](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e1c3a085b458a34f4559a9f43e947fbe610ef600))


### Bug Fixes

* average dip ([374e07f](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/374e07f27530b3b1de8e04615c89d3e91c6ce9c8))
* Manage pools formatting error ([#2363](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2363)) ([eedef20](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/eedef2048720e31f6bf51d5bc36239eeb071f6bf))
* Proxy support logic for Polkadot API ([#2359](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2359)) ([a6a37f1](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/a6a37f1ff061d82de42a54dcd504f6b80b62e739))
* theme Selectable buttons ([#2334](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2334)) ([20b33e5](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/20b33e5ef485dde1b2d92f57ddf3044e7add9afe))

## [1.7.0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.6.0...v1.7.0) (2024-11-08)


### Features

* **fix:** Render timeleft on `end` time update ([#2320](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2320)) ([fd7c52b](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/fd7c52b1d38d7ca29686f6a59db5a6f14205731e))
* Logo and font update ([#2269](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2269)) ([96b952f](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/96b952fc95e0c6b687574c507506e06cde6ed0b1))
* **refactor:** Abstract `useTimeleft` ([#2321](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2321)) ([950081f](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/950081fafc6b05bde7bbbbcd47d05d2810e6f301))
* **refactor:** Generalise `useSize` hook ([#2312](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2312)) ([51ec08a](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/51ec08aa057d46a87099eb125e13b955e515abcb))
* **refactor:** Initialise PAPI, ws & smoldot support, fetch network consts, tests ([#2318](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2318)) ([a670f90](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/a670f9018e7949685fdbb1101c750f5a4878f374))
* **refactor:** Update `withProviders` ([#2314](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2314)) ([d43bd60](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/d43bd604f777952ca0fe77035f0b6bfe9f1a1d23))
* **refactor:** Update Release Please ([#2268](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2268)) ([9b52f6d](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/9b52f6d3ba919b30df71fb45a4afe2f161d0f787))
* **refactor:** Update to latest w3ux utils ([#2283](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2283)) ([fa4df58](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/fa4df58066e19381687299151b2f055ebdd4d689))
* **refactor:** Use `useOnResize`, remove `lodash.throttle`. ([#2313](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2313)) ([5d012c0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/5d012c06c71176e5ff398dc2e2f73d0f735edaf4))
* **refactor:** Use latest `@w3ux/utils`, rm `@polkadot/keyring` ([#2262](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2262)) ([a5c969f](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/a5c969f5b476600cda7da4bdf64f6089cea3eef9))
* **refactor:** Use new Polkicon from `@w3ux/polkicon` ([#2315](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2315)) ([be74cd5](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/be74cd52aa9f741e6f882302751b23db09a249fc))
* **refactor:** Use re-exported `[@polkadot](https://github.com/polkadot)` utils. ([#2267](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2267)) ([63d0b55](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/63d0b55ce117a3835cb27f170d71291ca5cbb4cb))
* Replace `maxElectingVoters` const with `counterForNominators` storage ([#2319](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2319)) ([f55229f](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/f55229f101977f82904504cdc9bde577710eebfb))
* simplify pool item UI ([#2238](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2238)) ([fdfcaf0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/fdfcaf0cbab26bc23b505ead99e05fb5f8f0d456))
* Wallet Connect support ([#2276](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2276)) ([388b882](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/388b882fa20464a3a0effeb7d1295b65819d0283))


### Bug Fixes

* era subscription bug ([6bbc917](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/6bbc9177f6ed60c7eeaf94e66921ebc0a3e91e76))
* other account duplicate when added to extension ([#2272](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2272)) ([72d2412](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/72d241294ad0972329f86a8fc5abc6ea49443be2))
* people status on identity sync ([#2236](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2236)) ([52f7998](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/52f7998c75f16c43b69ec4811f135fc9b62551de))

## [1.6.0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.5.0...v1.6.0) (2024-08-01)


### Features

* Activate People Chain and re-enable identities ([#2198](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2198)) ([2a6a624](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/2a6a6245037a52e4a2666712d77c48cc7eabd3c6))
* Check if Polkadot app is at least generic version ([#2191](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2191)) ([4aea706](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/4aea706af315d816c0c31003b46b5139937b0b98))
* Generic Ledger app support ([#2181](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2181)) ([e4b2c0c](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e4b2c0cc13490605a148578f4f79cbd809042d66))
* Misc styling ([#2157](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2157)) ([e5f2537](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e5f2537e35b791565f4e652db622ce48b0722a33))
* New ledger app tx support ([#2165](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2165)) ([71b218f](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/71b218fc6a8f087f31e66a4499d540cf03d2a768))
* Nominee decentralization: How decentralized is your nomination? ([#2185](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2185)) ([7dd170a](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/7dd170a7a50cf1e6b41c5f68d65fcf9743acc8da))
* **refactor:** `@substrate/connect` updates ([#2196](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2196)) ([0a868b6](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/0a868b6c16cc0d0485ea8771c18e70a84ec1639a))
* **refactor:** Abstract state bootstrapping & subscriptions from Api ([#2193](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2193)) ([8accc8b](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/8accc8bc5ba0ac8c39bfd0b5815ad85fd3b08991))
* **refactor:** Controller renames ([#2194](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2194)) ([e2a6829](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e2a682948ba3e19032b753135b8dc684d1eaf84e))
* **refactor:** disable identities on networks where People Chain is being used ([#2183](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2183)) ([e5edec2](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e5edec27f20c3a26d1c3398195311ccd49cfd57e))
* **refactor:** People chain on Polkadot - disable identities on Relay Chain ([#2192](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2192)) ([6097a12](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/6097a12b36177fbf84f1cf565233d3f36b72a6d9))
* **refactor:** Remove pre-paged rewards deprecation logic ([#2197](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2197)) ([c4fada1](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/c4fada1e5a616b48fe5c3327c14282eff8f13d75))
* **refactor:** Use `merkelise-metadata` for Ledger signing, discontinue metadata service ([#2195](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2195)) ([907ea60](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/907ea603d062af4b0fdaee762e69d106da08b0ac))
* update favicon ([#2162](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2162)) ([830b126](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/830b1266b2becbd2d5782c3721b6252b8a9803ba))
* update header logo ([#2161](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2161)) ([e640d21](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e640d210003afcd67760e7ab63457e3aff3bbfa9))


### Bug Fixes

* ledger hardware patch ([#2186](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2186)) ([038219f](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/038219f4305c48aca3bf6209b0727e05da98d76c))
* vault payload ([b431d78](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/b431d78c07c12723a976be6f997d061d505321f8))


## [1.5.0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.4.4...v1.5.0) (2024-06-12)


### Features

* **refactor:** Remove pre-paged rewards code (part 1) ([#2101](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2101)) ([6fa02f9](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/6fa02f9d394930d6f339d46dfc227fc0c70795ad))
* **refactor:** Tidy up `TxMeta` context ([#2130](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2130)) ([95468bf](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/95468bfcee68759560d5ea46b399d7c1756c3eaf))
* **refactor:** Use `@w3ux/types` types ([#2156](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2156)) ([6db115a](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/6db115a317b1ab3a8eb67e2c0cd08302af8da512))


## [1.4.4](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.4.3...v1.4.4) (2024-04-23)


### Features

* **refactor:** Use package.json version ([#2097](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2097)) ([2b9cf15](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/2b9cf1526c6f829a9514dcebfd1f9f6140ee4c5d))


### Bug Fixes

* Get local active accounts on network switch ([#2098](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2098)) ([a20df19](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/a20df19e2d0d9b70a87ab2a34d5972bbc74c22d2))
* Paged rewards payout fixes ([#2095](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2095)) ([6cb4d49](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/6cb4d4971130e2e9f676cbc6a1a18465f1f0a09b))
* prevent polkagate snap popup unless explicitly connected ([#2099](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2099)) ([96e27ba](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/96e27ba741e29a8165fef37225ea3433fde4f378))


## [1.4.3](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.4.2...v1.4.3) (2024-04-22)


### Features

* remove over subscribed ([#2092](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2092)) ([5c17a3a](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/5c17a3af0f049333b69e4c0364a092d905a438a7))


### Bug Fixes

* More over subscribed fixes ([#2094](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2094)) ([2c438e0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/2c438e0681d538cdabdf7357f85340c88d71e890))


## [1.4.2](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.4.1...v1.4.2) (2024-04-22)


### Features

* Runtime upgrade 1,002,000 fixes ([#2090](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2090)) ([3b0bfb3](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/3b0bfb380510cea5a882ddd3e72b9fa60184ec7d))


## [1.4.1](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.4.0...v1.4.1) (2024-04-18)


### Features

* Enable paged rewards on Kusama, disable `missing_identity` ([#2088](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2088)) ([dda72ef](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/dda72efb2f6569ecca99c67258d8ab732371f07b))



## [1.4.0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.3.1...v1.4.0) (2024-04-18)


### Features

* **refactor:** Network as arg for vault & ledger account API ([#2083](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2083)) ([6a01661](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/6a01661ae6cc03eb8c8bc8bc0448b5435a583ca3))
* **refactor:** Use `stringToBigNumber` from `@w3ux/utils` ([#2085](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2085)) ([4425227](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/44252276b95519fc87be89646917eb5fb55680f4))
* **refactor:** Use formatAccountSs58 util ([#2084](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2084)) ([ebcc9c6](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/ebcc9c66babf6b2ce6b3959bf66041d899d2c795))
* **refactor:** VaultAccountsProvider to w3ux ([#2082](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2082)) ([a26cda7](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/a26cda7597e05b53f846ae0e535163ca890e4783))


### Bug Fixes

* Fix free balances (Overview & Nominate) ([#2075](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2075)) ([44c6bcd](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/44c6bcdd94b1bb15b8c80c6cd06bf3f6acc90aab))
* **manage-nominations:** Revert changes behavior in Manage nominations ([#2077](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2077)) ([a5bc9e9](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/a5bc9e91dee0a4412b449158d8eeca34c5d20e05))
* **pools:** don't unsubscribe from ActivePools  ([#2080](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2080)) ([7f3d3a6](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/7f3d3a62425c0502291d13695bec435fb3f69b67))
* Search filters fix ([#2087](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2087)) ([adfd8ec](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/adfd8ec5659082877fac872f841754d78296b449))
* Show border bottom only if dashboard tips is shown ([#2076](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2076)) ([459da24](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/459da2477b5f1e032cf974ccb819be85a7a682be))
* use transient prop for styled components ([#2081](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2081)) ([f2a0d73](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/f2a0d73a172d815cd8d12207320947b82a24dc99))


## [1.3.1](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.3.0...v1.3.1) (2024-04-09)


### Features

* **ux:** Simplify pool list, fetch performance on More ([#2070](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2070)) ([fb5008d](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/fb5008d0ebae166943ee6b3749f4c350758c9315))


## [1.3.0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.2.1...v1.3.0) (2024-04-08)


### Features

* Create pool canvas ([#2061](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2061)) ([de3ad50](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/de3ad50ed2eda49a0378a26c22fb8a48fdc9e305))
* Join pool progress bar on performance fetch. ([#2064](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2064)) ([e5027ff](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e5027fffc3151dbdf0c4b7cce09f37aaeb184971))
* Open `JoinPool` canvas immediately,  preloader, prioritise low member pools. ([#2059](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2059)) ([5360eaa](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/5360eaa17ef08b6b602d21967d9174f2eed9cf83))
* Pool performance data to batches. Per-page fetching, pool join subset. ([#2057](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2057)) ([965d3e1](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/965d3e182c77e0b6d46c2d1c603e74a30cd7be92))
* **refactor:** Persist all imported accounts active pools. ([#2066](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2066)) ([1a1847d](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/1a1847deb0d4763b893335293c85dbe8d3f330b1))
* Simple pool join & call to action UI ([#2050](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2050)) ([6d04429](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/6d0442947b4322ec949bbb88e82b24720dce4143))
* Start nominating canvas ([#2062](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2062)) ([0208d5f](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/0208d5fc5658bc375eeef3aa853954c05290796f))
* use `bondedPool.memberCounter`, deprecate `nomination_pool/pool` Subscan call ([#2054](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2054)) ([b536faf](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/b536faf8fc410c8291dea84fa2b96189ab2c8e76))
* **ux:** `JoinPool`:  Inline sync for provided pool ([#2067](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2067)) ([e146bfc](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e146bfcb15df96cd0a10fe1d268e3eab343ef1d1))
* **ux:** Disconnect from extension ([#2069](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2069)) ([c5c2ecb](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/c5c2ecb54d31b59cc4db3bdb20b55e48cc01160a))
* **ux:** Improve Join Pool preloader ([#2063](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2063)) ([69d716e](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/69d716e2e99a6f32e45407362d951352fd6a884f))
* **ux:** Pool display polishes, pre-release fixes ([#2065](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2065)) ([89e5f98](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/89e5f98dd146d4838b9580a857eddfa73090762f))
* **ux:** use secondary accent color for status UI ([#2055](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2055)) ([bf16d80](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/bf16d80a661ca1d1cd0cf038bcff4525fbff19c8))


### Bug Fixes

* Search bar initial value on Pools/Validators page ([#2032](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2032)) ([c4749c6](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/c4749c6e7ca338a9f3fd3299ebb53bbf45c3de07))
* Fixes an issue where Polkagate Snap enablement would also enable other extensions .


## [1.2.1](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.2.0...v1.2.1) (2024-03-14)


### Features

* Deprecate Canny.io in favour of Polkadot Support ([#2018](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2018)) ([c8e3c4e](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/c8e3c4ea84c643fa3b2e35f3bf932ec8d23cba57))
* **refactor:** Instantiatable Apis ([#2023](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2023)) ([574ab62](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/574ab62ad6e9e9081e90466339a69337d0fb5999))
* Remove Parity RPC endpoint from westend ([#2019](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2019)) ([54ecbbe](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/54ecbbeb66382d86c59641c90bafa2239574a214))
* **ux:** Remove controller deprecation prompt ([#2026](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2026)) ([76f964b](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/76f964bdfbab2791a02ce420cb1a3f52b1f6d1d2))


### Bug Fixes

* check BalancesController unsub before calling ([#2016](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2016)) ([13d0ebd](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/13d0ebd5f9c2481e9c211925b7cf97293c29f10a))
* Ensure signer fallback on corrupt source ([#2021](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2021)) ([26e1793](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/26e179389a2c8b8823e743a6ae1ae89f26a66744))
* fast unstake eligibility based on bonding, not nominating ([#2025](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2025)) ([44a19c1](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/44a19c13b58f40ced422a4402a15ce8a3a591871))
* Fix errornous unclaimed payouts from Subscan ([#2028](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2028)) ([7a4f172](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/7a4f172c176eb7767b957487347bfc0e197fa490))
* Misc Subscan payout fixes ([#2027](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2027)) ([4081c0a](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/4081c0a938aee6ffdadd5683789fb010051fb533))
* updated typo in modals file ([#2022](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2022)) ([621ff1b](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/621ff1b218410c2aa314680a1d0852bfd8f911a0))


## [1.2.0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.1.7...v1.2.0) (2024-03-04)


### Features

* **refactor:** Overlay to kit ([#1994](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1994)) ([e1cd02f](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e1cd02fca5dece54e412dbd4625c9108bbe1c394))
* **refactor:** remove react ([#1996](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1996)) ([b202039](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/b202039b32f504da66dbd10bb57a2f2e383f3004))
* **refactor:** Softer offline events ([#2013](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2013)) ([5ddb614](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/5ddb61435bbf4a0223c4023b6ab0e15c22dbb476))
* **refactor:** stricter validator operator svgs ([#1986](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1986)) ([058cb24](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/058cb24dd52e41ebc254522e162c9ba55cb74b5b))
* **refactor:** use @w3ux/extension-assets and @w3ux/validator-assets ([#1987](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1987)) ([f0b5eaa](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/f0b5eaa82b8fdeda0793d376f4c18a05358201dd))
* **refactor:** use @w3ux/utils ([#1988](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1988)) ([70b02ff](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/70b02ffa860a3e230417f9a4b91f1745ac36de8f))
* **refactor:** Use w3ux components ([#1995](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1995)) ([d2d928d](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/d2d928df5945abd73efda33775c02c457b8f948b))
* **ux:** add `txVersionNotSupported`, check major version instead of minor ([#1993](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1993)) ([07bcbef](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/07bcbef1db97f967c9ea3128d89837151632e354))
* **ux:** Add dedicated withdraw prompt for active unlock chunks ([#2011](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2011)) ([e2d4b1c](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e2d4b1c13ae9d78764b2c4efe7bef13eb8030a33))
* **ux:** Update detect SubWallet in SubWallet in-app browser ([#1983](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1983)) ([#1984](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1984)) ([d1325a0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/d1325a0ceab7216907df44316fe1a0b7c71a9b06))


### Bug Fixes

* accounts modal height ([#2007](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2007)) ([2639454](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/2639454df59c99206035f650186eac21edb45ffd))
* add CSS license check ([#2012](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2012)) ([9788710](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/97887101676832f22f06159f1f4f191084cc6f39))
* always show reserve ([#2003](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2003)) ([b118f9c](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/b118f9c65bded8f6b5afdb66e0432032d76ec2c4))
* fast unstake, proxy fixes on account & network switch ([#2001](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2001)) ([68f701b](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/68f701ba7f808607ee8e0f6cfb3b3dce9fcc37f0))
* simplify fast unstake subscription ([#2002](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/2002)) ([8edfc0c](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/8edfc0c8881d8736087539d906641b3c950a7afc))



## [1.1.7](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.1.6...v1.1.7) (2024-02-24)


### Features

* **refactor:** Add Structure kit ([#1963](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1963)) ([e6b181b](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e6b181be92c4abf706fd3b7bbe43bbf86abb6318))
* **refactor:** buttons to project ([#1960](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1960)) ([24d365c](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/24d365cc7bc4ec42ff7240a5fd7d0b24285b94d4))
* **refactor:** use local themes ([#1953](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1953)) ([03e9f71](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/03e9f7172a73d74b20fee0831bfd8fdc154f43c2))
* **ux:** Check SubWallet Mobile and filter Subwallet extension ([#1983](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1983)) ([3700fad](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/3700fad464318bb7befd75ff254921c085cb194d))


## [1.1.6](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.1.5...v1.1.6) (2024-02-15)


### Bug Fixes

* fix manage nominations refresh ([#1950](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1950)) ([e09176b](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e09176bd74f4f78b1d8c2fb2779c77967a9f1c5d))
* stringify nomination comparison ([#1952](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1952)) ([f454dbf](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/f454dbf4ee14745c6791b2d5ec763ad0a77d6fc2))


## [1.1.5](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.1.4...v1.1.5) (2024-02-14)


### Features

* **refactor:** Active pools and syncing state redesign ([#1929](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1929)) ([d2446e1](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/d2446e1140fff47424984ec37e6233388b9f542b))
* **refactor:** create pool accounts to hooks ([#1913](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1913)) ([42c0638](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/42c0638f464662e741085966a886bb2fdf00c4b2))
* **refactor:** Hooks to own folder ([#1914](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1914)) ([4e46904](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/4e469041aeafcddd51e2abbc36d2a453529a4bff))
* **refactor:** Menu refresh with mouse-based position ([#1945](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1945)) ([bf856d0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/bf856d0610a7dc2df844440ea895496e39666148))
* **refactor:** Misc project tidy ups ([#1933](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1933)) ([c905258](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/c905258ddc5587b41febfa4266fd388bf00ee75e))
* **refactor:** nominatons to BalancesController ([78c8300](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/78c8300dd1046a261dfda888f9d5ac4d0c916e20))
* **refactor:** persist Subscan results to class ([#1942](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1942)) ([b6312e6](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/b6312e60c62daef57f4fe14aaa0cc04db03eeaba))
* **refactor:** Pool memberships to active balances ([#1915](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1915)) ([764a880](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/764a880e0640416a5ad88b69d2e84887624b8f11))
* **refactor:** Syncing improvements ([#1935](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1935)) ([61645b1](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/61645b17cb8efb0a1a72532930583ab2c671c1af))
* **refactor:** Use identities hook ([#1916](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1916)) ([f55f70f](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/f55f70f165a26615ad3046f30ad4ca50ca62ba96))
* **ux:** View & copy pool addresses ([#1941](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1941)) ([850c0d9](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/850c0d9d6c8d8f481a4a5ca59616b7b0ce34b14f))


### Bug Fixes

* stricter member count fetching ([#1911](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1911)) ([c453dd1](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/c453dd1e07016b46425938a26615138d361819de))



## [1.1.4](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.1.3...v1.1.4) (2024-01-28)


### Features

* **ci:** add markdown-link-check ([#1865](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1865)) ([7e7134e](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/7e7134ea2a42ec56d095e0809a4eaa05f94ad793))
* **fix:** account for staking rate in average reward rate ([#1886](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1886)) ([9938620](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/9938620ee417bd42761a6e63828e3dd3ab8e7ee2))
* **refacor:** Pool config to bootstrap app state ([#1900](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1900)) ([8f51a86](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/8f51a8672b843b7cd7172144e2157148d03325ca))
* **refactor:** Move balance syncing to static class, `activeBalances` in UI only. ([#1858](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1858)) ([a372487](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/a3724879f377c38baf0e9b04e03749e0e2f65ee0))
* **refactor:** Move Polkawatch to inline instantiation ([#1890](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1890)) ([d7b88bd](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/d7b88bd57701c16ad143a6e2b70897b5086f82f6))
* **refactor:** Move staking metrics `payee` to active balances ([#1904](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1904)) ([7b692e0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/7b692e06006448604929ec23fe510a7c7492141b))
* **refactor:** network metrics to static, bootstrap all state before subscribe ([#1896](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1896)) ([08a813c](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/08a813c7d47d2055984f7d32c1d8b34bec9791f4))
* **refactor:** remove unneeded bonded getters ([7108e55](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/7108e55d3f1aeeb07cdaa7cdb5608425b0d6641a))
* **refactor:** rm `ExtrinsicsProvider`, nonces to `TxMeta` ([4194150](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/41941509cb0d930d53f3fc98a12736b0356c6846))
* **refactor:** Staking metrics to bootstrap and API ([#1905](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1905)) ([f6c0b93](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/f6c0b93fc5fcaf2961c91cdeae770d5503766fe8))
* **refactor:** Subscan refactor, remove fetching from Providers ([#1878](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1878)) ([57e2a1b](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/57e2a1bed952b41441635dc9eba02b79d63d3fc0))


### Bug Fixes

* balances no accounts sync ([#1889](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1889)) ([5316283](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/5316283029f9a28003bb25814623f768f3294fb8))
* Render safe guards, pool useEffect fixes  ([#1906](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1906)) ([7c0212f](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/7c0212f428e56b2eba9c735a6299c3661dd47b25))
* roll back Substrate Connect ([#1899](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1899)) ([33b5671](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/33b5671caf5ec09240e164e82618efb15deebe81))
* unlock Chunk unit type ([afe9b1c](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/afe9b1c0256eb9840a375f1d7574895a07ba0f4a))


## [1.1.3](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.1.2...v1.1.3) (2024-01-15)


### Features

* add block verification interval ([#1837](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1837)) ([0b9d6f2](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/0b9d6f2d0737b0713410143bfb134bcfe5bb485d))
* add docs folder ([#1753](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1753)) ([78c506e](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/78c506e5c97440ed5ee9b8f7f2bc4119b23f6635))
* Introduce Average Reward Rate  ([#1849](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1849)) ([e547a18](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e547a1862ec27de233434f181322b7bd984bc665))
* offline recovery ([#1836](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1836)) ([798163f](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/798163f95f1ea96ce612e9d43d1ec7cf38c71b2e))
* Pool commission provider, compartmentalise forms of commission properties ([#1755](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1755)) ([8cc0517](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/8cc0517e1e85099f51f43f17cf8fe227e8a68a5b))
* **refactor:** add stylistic eslint rules ([#1793](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1793)) ([461a438](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/461a438cbf05b7a104efea52857356733773121a))
* **refactor:** API to static class ([#1826](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1826)) ([252547b](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/252547ba299c3d5ecff773da4da47a458bd27cae))
* **refactor:** enforce curly, braces as needed ([#1795](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1795)) ([4199fa1](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/4199fa1a16b39df8c47210ce4fdf9bafdb98997e))
* **refactor:** Notifications as `CustomEvent` emission ([#1775](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1775)) ([dbb3e06](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/dbb3e06859f19f878b4afbd0d372c9b12a9ffc97))
* **refactor:** Pool members list to canvas ([#1796](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1796)) ([eb617f2](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/eb617f274d6df26450502cfdef4bfcda5d657de4))
* **refactor:** Remove explicit `any` types project-wide ([#1773](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1773)) ([fd5a59e](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/fd5a59eb5933f3ab11fd48eba8015889a7cc5325))
* **refactor:** remove ref from `OtherAccounts` ([#1825](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1825)) ([8fc49e1](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/8fc49e180b0fcd836d8fabe6ac92cc84b6a67a0c))
* **refactor:** Remove remaining explicit `any` types, turn on `no-explicit-any` ([#1792](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1792)) ([5daa698](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/5daa69827081a485d323cd51d24ab3d558954ec2))
* **refactor:** simplify average reward rate label ([#1850](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1850)) ([c568f3c](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/c568f3c32f98fc0924cf60a3f41445a3cfd0d77e))
* **refactor:** Split pool types, replace explicit any types ([#1774](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1774)) ([f921baf](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/f921baf5a08b3199cd6eff19ea3fb2d2a9897fc3))
* **refactor:** types to all `useState` hooks ([#1844](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1844)) ([69413b5](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/69413b5cffb9202de918bbd763d9b8cc049509ef))
* **refactor:** use `html5-qrcode`, remove `react-qr-reader` ([#1802](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1802)) ([759a41e](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/759a41ed0dda7814fbf72eaf5c625a93fc95af4b))
* **refactor:** Use Cloud `LedgerAccounts` context ([#1782](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1782)) ([9c59ebe](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/9c59ebeaa7d83dfe45bd21ed7c0df552fab9f13a))
* **refactor:** useless fragments, linting tidy up ([#1768](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1768)) ([d9ecec5](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/d9ecec52807cbc62b071f2abc2e6c4f1b6b2d177))
* timeout multiplier ([#1838](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1838)) ([620ed02](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/620ed027f88874afd0246cba6425f971a522b4ba))
* upgrade from yarn classic to yarn modern (berry) ([#1752](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1752)) ([6f306cb](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/6f306cbd645ded670090fa16cd804a8cf069ea8b))
* use `navigator.onLine` to handle api connection ([#1827](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1827)) ([bfef735](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/bfef73520220d69841f33a4a001106b23490a103))
* **ux:** block number in network bar ([#1835](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1835)) ([0350b31](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/0350b31234534c3c0a5d05ecd7d8db91dd218081))


### Bug Fixes

* Bond fixes ([#1816](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1816)) ([791ece3](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/791ece366b7319a054f78a1d9b10f9891214c853))
* incorrect use of ?? operand ([d9e2418](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/d9e2418e0c6ba28a80caea19b02ecadbcb38c61b))
* make odometer values copy-able ([#1834](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1834)) ([3cbb9d0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/3cbb9d00992848a7eee7c7c118548336bee2cd47))
* max bond fixes ([b49fe42](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/b49fe423074e8032984bb0fc53476d3e43838eda))
* proxies: state and network change fixes ([268a1dd](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/268a1dd8d45e0ea5b751547b405e10c2cda15731))
* read only account import, local account import ([#1833](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1833)) ([af843f5](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/af843f5d706f5123ea54a54b811b56d2f7cf8d24))
* ready after consts ([a7f0bc9](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/a7f0bc9dfd434bbcd653912a5897f7b6e2acd097))
* replace MAX_EXPOSURE_PAGE_SIZE ([8f44db1](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/8f44db1d69c91277b446ed1c9ccdbc231495ba85))
* **worker:** add worker format ([f45d6ed](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/f45d6ed08fbf339b3e27ecc0a53a6246e2f55f8d))


## [1.1.2](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.1.1...v1.1.2) (2023-11-15)


### Features

* add MethodNotSupported error to ledger ([#1627](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1627)) ([c756f5d](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/c756f5da167279fc1fb3adbf9907bc7034a0904b))
* more info for inconsistent ledger versions ([#1640](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1640)) ([cb17371](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/cb17371b5713b52fd1c34ec0bb647f2171ae21b4))
* Nova first if in wallet ([f74f276](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/f74f27626ea890796bbba1714ec92c7b08964948))
* Nova icon ([814977c](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/814977ce01da31716ed3a95140e9b42b71f2a233))
* nova standlone if in wallet ([1192b8a](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/1192b8aa73af505c7e308a6f66833cc3f4de6453))
* pool context optimisations ([#1628](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1628)) ([ad4db96](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/ad4db969875daf7994d57df1b4c572b92ae76b26))
* **refactor:** don't persist `system` external accounts, remove proxy `delegates` state ([#1639](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1639)) ([56314ae](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/56314ae8584f42a40067c7c91abba94d7570afaf))


### Bug Fixes

* add balanceTxFees ([05056fa](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/05056fafe870c5a0bb7e4426f002c392563ddce7))
* missing payout day ([#1618](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1618)) ([ffdac9c](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/ffdac9c517672acdbdf911635d41b135b43ef85e))
* modal scroll fixes ([#1607](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1607)) ([4d03b33](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/4d03b33bcd1ce0edc962b61cb3415efdcebf7a29))
* system read only accounts fix ([29b8052](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/29b8052ee2e7605b967e2f684fbb316f824eabd5))
* use ledger square logo ([#1593](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1593)) ([badcac5](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/badcac5c639855519d99f72f63d2efa1465e05eb))
* **ux:** NaN on whole value with format ([021f90b](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/021f90b138cf109bfa69a8bcef9ac8bcf173f496))

## [1.1.1](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.1.0...v1.1.1) (2023-10-31)

### Bug Fixes

* Fixes an issue where extensions would not be discovered due to a hanging asynchronous function when Enkrypt, which injects its own window.ethereum object, was enabled.
* Misc theming fix.


## [1.1.0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/compare/v1.0.9...v1.1.0) (2023-10-30)


### Features

* Add newly supported proxy calls ([#1554](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1554)) ([4ff9717](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/4ff9717c3dce4068f31ec0dcc34c128df7eb4f06))
* add sync state for eraRewardPoints fetch ([aae111c](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/aae111c538f2091a1694a13e21b14d1bcef47e8f))
* add validator performance ranks & quartiles, quartiles in generation methods ([#1546](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1546)) ([2955e70](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/2955e706927eaf4da8952790ac7a3d2ed63d79f4))
* Add validator pulse graph to list items ([#1530](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1530)) ([e41168b](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e41168b93378f03a13c760af19a51af4d5a583e3))
* allow selection of RPC providers ([#1557](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1557)) ([c0553c2](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/c0553c2c9b466a37b9d55811dbce1b8fbb6dafd3))
* **ci:** Add Release Please CI, update `CONTRIBUTING` ([#1470](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1470)) ([6b7dc60](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/6b7dc60cece70cfeb4190ac4dacc205112578288))
* **cleanup:** remove deprecated `Nominate` and `NominatePools` modals ([#1540](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1540)) ([56ed4c0](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/56ed4c0056278f706010a0eabee7978c2bebd03c))
* **context:** `ExtensionAccounts` provider ([#1494](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1494)) ([e8f11e9](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/e8f11e92730dbb4b624b2ad6fa9fb5cf37732a1f))
* **help:** remove controller help items ([#1527](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1527)) ([743510f](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/743510f30d87dc7d60d01bc5f530e856d416c6e2))
* Order nominations by nomination status. ([#1543](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1543)) ([0ab87f4](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/0ab87f46db16576cd9ee9a795dfb28f82b6391c9))
* Refactor for reusable `ExtensionAccountsProvider` context  ([#1466](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1466)) ([13380bb](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/13380bb5049fe8b55695d58e24a3928432b730d3))
* **refactor:** remove `NominateFromFavorites` modal ([#1528](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1528)) ([4bc62a3](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/4bc62a373e3c4129adb5b717b56333356efc6b26))
* **refactor:** Separate titles from lists, reformat filters, fixes ([#1539](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1539)) ([ae5f95e](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/ae5f95ed1036e7383ae59e2e6ff89833e5d6a179))
* **refactor:** use simple cloud react imports ([#1493](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1493)) ([839cc06](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/839cc06c0dc4655f5ce383ed4c72d95cb0a32f39))
* Replace icons to cloud, remove dead wallet connect option ([#1506](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1506)) ([7e3efd2](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/7e3efd2c8ec9864ca40ccc165c7ab5f76b581f94))
* store `eraRewardPoints` from recent eras ([#1529](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1529)) ([690ba51](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/690ba51e7b8cfc7285fbdb90748362d85e848460))
* **ux:** min non-zero bar segment width ([#1555](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1555)) ([9377776](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/9377776369fb6c63629c8622fd3ab9087ab70502))
* **ux:** Polkadot JS to developer tools category ([#1576](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1576)) ([5684c0a](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/5684c0aaf45426ca9839abbb9b845bb5fee175ec))
* **ux:** Pool rewards worker & pool performance graphs ([#1547](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1547)) ([be4a556](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/be4a5568fa7e46b33295f48ded3b7a2c81eec14c))


### Bug Fixes

* avoid negative free balance ([8fd61dd](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/8fd61dd4bc68c8a4fa5982839761066accba20aa))
* **ci:** fix earliest release commit ([d873517](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/d8735175cdb2a3ff2baf45df388634973eb6ee33))
* **ci:** last-release-sha ([7c9cea5](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/7c9cea5dc4d04f05b59e46a6b2e5544e8a6b3ab3))
* fix bug on favorite pools visit ([#1526](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1526)) ([2f8ea85](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/2f8ea85f6c639cf18d8154e6b908ef483122781a))
* fix new era reward points processing ([214da8d](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/214da8d5c05f723c42c739f700d2180318bcf60f))
* fixed lag in timeleft refreh in last hour ([7b703cf](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/7b703cfff83acd89a20b5075d0de6827cdfc22d8))
* miscellaneous fixes. ([#1538](https://github.com/polkadot-cloud/polkadot-staking-dashboard/issues/1538)) ([24d0ca6](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/24d0ca6ed4b5c0d081db941c3cae898468fecdcc))
* payee toggle fix on setup ([3fe3031](https://github.com/polkadot-cloud/polkadot-staking-dashboard/commit/3fe30315d18691be6e7be846b945eb84cf89b8cf))
