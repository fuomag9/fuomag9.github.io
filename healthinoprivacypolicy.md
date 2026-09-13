# Healthino Privacy Policy

**Effective date: September 13, 2026**

Healthino is a food scanner and consumption journal. It is built to work almost entirely on your device, and it collects no data about you. This policy explains exactly what happens with your information.

## Data Collection and Use

**We do not collect, transmit, or store any personal data on our servers.** Healthino has no accounts, no analytics, no tracking, no advertising, and no third-party SDKs.

Specifically:

- **Scans and journal entries** are stored locally on your device (SwiftData). They never leave your device unless you explicitly enable Apple Health sync (see below).
- **Barcode lookups** are sent as anonymous HTTPS requests to the Open Food Facts public database (world.openfoodfacts.org). Requests contain the barcode and nothing about you. Open Food Facts is an independent open project with its own privacy policy: https://world.openfoodfacts.org/privacy
- **On-device food recognition** uses a Core ML model bundled inside the app (Food-101) and Apple Intelligence (FoundationModels). Photos and their analysis never leave your device.
- **Optional Apple Health sync**: if you enable it in Settings, Healthino writes the nutrition of foods you log (calories, sugars, fat, sodium, fiber, protein) to Apple Health on your device. This data is handled by Apple under Apple's privacy policy. You can disable the sync at any time; deleting a journal entry also deletes its samples from Apple Health.
- **Optional custom recognition server**: if you enable and configure a custom vision server in the app's settings, food photos you scan are sent over the network to that endpoint. This is a server you choose and control; Healthino's developer has no access to it, receives no copy, and this feature is off by default.
- **Camera access** is used only to scan barcodes and photograph food. Photos you take are processed as described above and are not saved to your photo library unless you explicitly choose to (for example by picking a photo with the system picker).

## Data Sharing

We do not share, sell, or distribute any personal information to third parties. The only network traffic the app generates is: anonymous Open Food Facts lookups, optional Apple Health sync on your device, and — only if you enable it — photo uploads to your own configured recognition server.

## Children

Healthino is not directed at children under 13 and does not knowingly collect any information from anyone, children included, since no data is collected at all.

## Security

Your journal is stored in the app's sandbox on your device. Apple protects device storage and Apple Health data with device-level encryption. No data is transmitted to the developer, ever.

## Your Rights

Since no personal data is collected or processed by the developer, there is nothing to access, correct, export, or delete on our side. Deleting the app removes all locally stored data.

## Changes to This Policy

If the data practices change (for example, an optional service is added), this page will be updated and the effective date above revised.

## Contact

Questions about this policy: contact [at] fuo.fi or open an issue at https://github.com/fuomag9
