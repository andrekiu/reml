        "  7        ��������H̞`{Ʒ���_�ے���$            47  �T// This is our simple, robust watcher. It hooks into the BuckleScript build
// system to listen for � events.& �See package.json's `start` sQ �and `./node_modules/.bin/bsb --help`
K �Btw, if you change t� AfileF areload� Ppage,* � r browser cacheH �_might_ not pick up4 �new version. Ih �
're in Chrome, do Force Rj �.

var websocket 1er; �LAST_SUCCESS_BUILD_STAMP = localStor�getItem('1 �') || 0;� K
  5�ws _` means it'll pipe� M �through a� � connection��a default port of 9999.H E �configurabM`e.g. `� T5000` S] PD =C b;

funh dsetUpW% `() {
 �(Y� == null �.readyState !== 1I S  try
 /  S  � a`ws://�yhost:${� O}`);L �.onmessage = ( E) =>    �newData = JSON.parse/ .data).;I  !I >m �K ;. 	�s�,� V �// Refresh�!P�will naturally re-run��rything,F �including�:�erve whichO  E �esolve allr * .N PNo st�&! �.`W(true� 4}

	    cJV (exn~�console.error("Theq` triedm{  Bweb \�, but failed. Here's� 0O:");d   $;
� l}
};

j; �Interval( �, 2000);
