ZZTDPSES ; AU - THE DAILY PLAN SESSION UTILS ; 02/26/2016
 ;;1.0;THE DAILY PLAN;**1**;Feb 24, 2016;Build 2
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
