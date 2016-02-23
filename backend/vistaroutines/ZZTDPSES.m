ZZTDPSES ; AU PWC - THE DAILY PLAN SESSION UTILS ; 02/22/2016
 ;;1.0;THE DAILY PLAN;;Feb 22, 2016;
 Q
 ;
CLEAR() ;
 K
 Q 1
 ;
SAVE(%ZZG) ;
 K @%ZZG
 N %ZZZ
 S %ZZZ="%"
 F  S %ZZZ=$O(@%ZZZ) Q:%ZZZ=""  D
 . W %ZZZ,!
 . Q:$E(%ZZZ)="%"
 . M @%ZZG@(%ZZZ)=@%ZZZ
 Q 1
 ;
RESTORE(%ZZG) ;
 N %ZZZ
 S %ZZZ=""
 F  S %ZZZ=$O(@%ZZG@(%ZZZ)) Q:%ZZZ=""  D
 . M @%ZZZ=@%ZZG@(%ZZZ)
 Q 1
 ;
