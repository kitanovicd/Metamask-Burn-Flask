# Phoenix Guard Metamask Snap

This Snap is guarding you from burning your tokens by mistake.
It has a list of addresses which are marked as not safe to send funds - those are invalid addresses (like 0x0) or contracts which doesn't implement any kind of withdrawing possibility.

If snap recognizes receiving address as burn address user will be informed with following alert message:
<br>
**ALERT: This transaction is sending funds to a burn address!!!**
<br>

If snap does not recognize receiving address as burn address user will be informed with following message:
<br>**We didn't recognize this transaction as burning transaction**