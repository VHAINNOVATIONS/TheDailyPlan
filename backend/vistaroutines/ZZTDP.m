ZZTDP ; AU - THE DAILY PLAN UTILS ; 02/24/2016
 ;;1.0;THE DAILY PLAN;**1**;Feb 24, 2016;Build 2
 Q
 ; RPCEXECUTE is copied from RAPTOR project
RPCEXEC(TMP,DT) ;
 ; Execute an RPC based on paramaters provided in TMP reference global
 ;
 ; Input parameter
 ; ================
 ;
 ; TMP is a reference to a global with nodes. e.g.,  ^TMP($J)
 ;
 ;   ,"name")      NAME (#8994, .01)
 ;   ,"version")   VERSION (#8994, .09)
 ;   ,"use") = L|R
 ;   ,"input",n,"type")   PARAMETER TYPE (#8994.02, #02)
 ;   ,"input",n,"value")  input parameter value
 ;      e.g.
 ;      ,"input",n,"type")="LITERAL"
 ;      ,"input",n,"value")="abc"
 ;
 ;      ,"input",n,"type")="REFERENCE"
 ;      ,"input",n,"value")="^ABC"
 ;
 ;      ,"input",n,"type")="LIST"
 ;      ,"input",n,"value",m1)="list1"
 ;      ,"input",n,"value",m2,k1)="list21"
 ;      ,"input",n,"value",m2,k2)="list22"
 ;
 ;          where m1, m2, k1, k2 are numbers or strings
 ;
 ; Output value
 ; ==============
 ; The RPC output is in  @TMP@("result")
 ;  e.g., ,"result","type")="SINGLE VALUE"
 ;                  "value")="Hello World!"
 ;
 ; Return {"success": result, "message" : message }
 ;    result 1 - success
 ;           0 - error
 ;
 N RPC,PRPC,TARGS,TCNT,TI,TOUT,TRESULT,X
 N XWBAPVER,DUZ,DT
 ;
 S U=$G(U,"^")  ; set default to "^"
 ;
 S PRPC("name")=$G(@TMP@("name"))
 S:PRPC("name")["ORWDX SEND" ^TMP($J,"input",5,"value")=""
 Q:PRPC("name")="" $$ERROR(-1,"RPC name is missing")
 ;
 S RPC("ien")=$O(^XWB(8994,"B",PRPC("name"),""))
 Q:'RPC("ien") $$ERROR(-2,"Undefined RPC ["_PRPC("name")_"]")
 ;
 S XWBAPVER=$G(@TMP@("version"))
 S PRPC("use")=$G(@TMP@("use"))
 S PRPC("context")=$G(@TMP@("context"))
 S PRPC("duz")=$G(@TMP@("duz"))
 S PRPC("division")=$G(@TMP@("division"))
 ; Set DUZ
 S DUZ=PRPC("duz")
 S:'$D(DUZ(2)) DUZ(2)=PRPC("division")
 S:DUZ DUZ(0)=$P(^VA(200,DUZ,0),U,4)
 S DT=$G(@TMP@("dt"))
 ;
 S X=$G(^XWB(8994,RPC("ien"),0)) ;e.g., XWB EGCHO STRING^ECHO1^XWBZ1^1^R
 S RPC("routineTag")=$P(X,"^",2)
 S RPC("routineName")=$P(X,"^",3)
 Q:RPC("routineName") $$ERROR(-4,"Undefined routine name for RPC ["_PRPC("name")_"]")
 ;
 ; 1=SINGLE VALUE; 2=ARRAY; 3=WORD PROCESSING; 4=GLOBAL ARRAY; 5=GLOBAL INSTANCE
 S RPC("resultType")=$P(X,"^",4)
 S RPC("resultWrapOn")=$P(X,"^",8)
 ;
 ; is the RPC available
 D CKRPC^XWBLIB(.TOUT,PRPC("name"),PRPC("use"),XWBAPVER)
 Q:'TOUT $$ERROR(-3,"RPC ["_PRPC("name")_"] cannot be run at this time.")
 ;
 S X=$$CHKPRMIT(PRPC("name"),PRPC("duz"),PRPC("context"))
 Q:X'="" $$ERROR(-4,"RPC ["_PRPC("name")_"] is not allowed to be run: "_X)
 ;
 S X=$$BUILDARG(.TARGS,RPC("ien"),TMP)  ; build RPC arguments list - tArgs
 Q:X<0 $$ERROR($P(X,U),$P(X,U,2)) ; error building arguments list
 ;
 ; now, prepare the arguments for the final call
 ; it is outside of the $$buildArgumets so we can newed the individual parameters
 S (TI,TCNT)=""
 F  S TI=$O(TARGS(TI)) Q:TI=""  F  S TCNT=$O(TARGS(TI,TCNT)) Q:TCNT=""  N @("tA"_TI) X TARGS(TI,TCNT)  ; set/merge actions
 ;
 S X="D "_RPC("routineTag")_"^"_RPC("routineName")_"(.TRESULT"_$S(TARGS="":"",1:","_TARGS)_")"
 S DIC(0)="" ; JAM 2014/9/5 - some obscure problem with LAYGO^XUA4A7
 X X  ; execute the routine
 M @TMP@("result","value")=TRESULT
 S @TMP@("result","type")=$$EXTERNAL^DILFD(8994,.04,,RPC("resultType"))
 S TRASH=$$SUCCESS()
 Q "OK"
 ;
 ;
ISINPREQ(PIEN,PSEQIEN) ; is input RPC parameter is required
 ; PIEN - RPC IEN in file #8994
 ; PSEQIEN - Input parameter IEN in multiple file #8994.02
 ;
 Q $P(^XWB(8994,PIEN,2,PSEQIEN,0),U,4)=1
 ;
BUILDARG(OUT,PIEN,TMP) ;Build RPC argument list
 ;
 ; Return values
 ; =============
 ; Success 1
 ; Error   -n^error message
 ;
 ; OUT array with arguments
 N TCNT,TERROR,TIEN,TI,TII,TREQUIRED,TPARAM,TINDEXSEQ,X,COUNT
 ;
 S TI=0
 S TII=""
 S TCNT=0
 ;
 K OUT
 S OUT=""
 S TERROR=0
 S TINDEXSEQ=$D(^XWB(8994,PIEN,2,"PARAMSEQ"))  ; is the cross-reference defined
 S TPARAM=$S(TINDEXSEQ:"^XWB(8994,PIEN,2,""PARAMSEQ"")",1:"^XWB(8994,PIEN,2)")
 ;
 S COUNT=0
 F  S TII=$O(@TMP@("input",TII)) Q:('TII)!(TERROR)  D
 . S COUNT=COUNT+1
 . S TIEN=TII  ; get the IEN of the input parameter
 . I '$D(@TMP@("input",TII,"value")) S OUT=OUT_"," Q
 . I $D(@TMP@("input",TII,"value"))=1 D  Q
 . . S OUT=OUT_"tA"_TII_","   ; add the argument
 . . I $$UP^XLFSTR($G(@TMP@("input",TII,"type")))="REFERENCE" D
 . . . S TCNT=TCNT+1,OUT(TII,TCNT)="S tA"_TII_"=@@TMP@(""input"","_TII_",""value"")"  ; set it
 . . . Q
 . . E  S TCNT=TCNT+1,OUT(TII,TCNT)="S tA"_TII_"=@TMP@(""input"","_TII_",""value"")"  ; set it as action for later
 . . Q
 . ; list/array
 . S OUT=OUT_".tA"_TII_","
 . S TCNT=TCNT+1,OUT(TII,TCNT)="M tA"_TII_"=@TMP@(""input"","_TII_",""value"")"  ; merge it
 . Q
 ;
 Q:TERROR TERROR
 S OUT=$E(OUT,1,$L(OUT)-1)
 Q 1
 ;
FORMAT(CODE,MESSAGE) ; return JSON formatted result
 S ^TMP($J,"RPCEXECUTE","result")=CODE_U_MESSAGE
 Q "OK"
 ;Q "{""success"": "_CODE_", ""MESSAGE"": """_$S($TR(MESSAGE," ","")="":"",1:MESSAGE)_"""}"
 ;
ERROR(CODE,MESSAGE) ;
 Q $$FORMAT(0,CODE_" "_MESSAGE)
 ;
SUCCESS(CODE,MESSAGE) ;
 Q $$FORMAT(1,$G(CODE)_" "_$G(MESSAGE))
 ;
 ; Is RPC pertmited to run in a context?
CHKPRMIT(PRPCNAME,PUSER,PCONTEXT) ;checks to see if remote procedure is permited to run
 ;Input:  PRPCNAME - Remote procedure to check
 ;        PUSER    - User
 ;        PCONTEXT - RPC Context
 Q:$$KCHK^XUSRB("XUPROGMODE",PUSER) ""  ; User has programmer key
 N RESULT,X
 N XQMES
 S U=$G(U,"^")
 S RESULT="" ;Return XWBSEC="" if OK to run RPC
 ;
 ;In the beginning, when no DUZ is defined and no context exist,
 ;setup default signon context
 S:'$G(PUSER) PUSER=0,PCONTEXT="XUS SIGNON"   ;set up default context
 ;
 ;These RPC's are allowed in any context, so we can just quit
 S X="^XWB IM HERE^XWB CREATE CONTEXT^XWB RPC LIST^XWB IS RPC AVAILABLE^XUS GET USER INFO^XUS GET TOKEN^XUS SET VISITOR^"
 S X=X_"XUS KAAJEE GET USER INFO^XUS KAAJEE LOGOUT^"  ; VistALink RPC's that are always allowed.
 I X[(U_PRPCNAME_U) Q RESULT
 ;
 ;
 ;If in Signon context, only allow XUS and XWB rpc's
 I $G(PCONTEXT)="XUS SIGNON","^XUS^XWB^"'[(U_$E(PRPCNAME,1,3)_U) Q "Application context has not been created!"
 ;XQCS allows all users access to the XUS SIGNON context.
 ;Also to any context in the XUCOMMAND menu.
 ;
 I $G(PCONTEXT)="" Q "Application context has not been created!"
 ;
 S X=$$CHK^XQCS(PUSER,PCONTEXT,PRPCNAME)         ;do the check
 S:'X RESULT=X
 Q RESULT
 ;
LOGIN(ACCESSCODE,VERIFYCODE) ;
 K (ACCESSCODE,VERIFYCODE)
 ; LEAVE DUZ, DT AND U in the symbol table 
 N %,ACCVER,DILOCKTM,DPNAME,DISYS,%DT,DTIME,%H
 N CHECKRES,%I,I,IO,IOF,IOM,ION,IOS,IOSL,IOST,IOT,J,OK,PERSONDUZ,PERSONNAME
 N POP,RESULTS,SUPERVISOR,TERMREASON,USER,V4WVCC,V4WCVMSG
 N X,XOPT,XPARSYS,XQVOL,XQXFLG,XUCI,XUDEV,XUENV,XUEOFF,XUEON
 N XUF,XUFAC,XUIOP,XUVOL,XWBSTATE,XWBTIME,Y
 ;
 S ACCESSCODE=$g(ACCESSCODE) I ACCESSCODE="" q "Missing Access Code"
 S VERIFYCODE=$g(VERIFYCODE) I VERIFYCODE="" q "Missing Verify Code"
 ;
 K RESULTS
 S U="^" D NOW^%DTC S DT=X
 S (IO,IO(0),IOF,IOM,ION,IOS,IOSL,IOST,IOT)="",POP=0
 S ACCVER=ACCESSCODE_";"_VERIFYCODE
 S ACCVER=$$ENCRYP^XUSRB1(ACCVER)
 D SETUP^XUSRB()
 D VALIDAV^XUSRB(.USER,ACCVER)
 S PERSONDUZ=USER(0)
 ;
 ;KBAZ/ZAG - add logic to check if verify code needs to be changed.
 ;0 = VC does not need to be changed
 ;1 = VC needs to be changed
 S V4WVCC=$g(USER(2))
 S V4WCVMSG=$g(USER(3)) ;sign in message
 ;
 S TERMREASON=""
 I 'PERSONDUZ,$G(DUZ) S TERMREASON=": "_$$GET1^DIQ(200,DUZ_",",9.4) ;Termination reason
 I 'PERSONDUZ QUIT USER(3)_TERMREASON
 ;
 S PERSONNAME=$p(^VA(200,PERSONDUZ,0),"^")
 S DPNAME=$p(PERSONNAME,",",2)_" "_$p(PERSONNAME,",")
 S RESULTS("DT")=DT
 S RESULTS("DUZ")=PERSONDUZ
 S RESULTS("username")=PERSONNAME
 S RESULTS("displayName")=DPNAME
 S RESULTS("greeting")=$g(USER(7))
 K ^TMP($J,"TDP_LOGIN")
 M ^TMP($J,"TDP_LOGIN")=RESULTS
 QUIT ""
 ;
NKO(PTID,TMP)  ;
 N RESULT
 D FILLVALU(TMP,PTID,"nextOfKin",.21)
 D FILLVALU(TMP,PTID,"altNextOfKin",.211)
 D FILLVALU(TMP,PTID,"emergencyContact",.33)
 D FILLVALU(TMP,PTID,"altEmergencyContact",.331)
 Q ""
 ;
FILLVALU(TMP,PTID,TOP,ITM) ;
 N GLOB,NAME,VAL
 S GLOB=$G(^DPT(PTID,ITM))
 S NAME=$P(GLOB,"^",1)
 Q:GLOB=""
 Q:NAME=""
 S @TMP@(TOP,"name")=NAME
 S VAL=$P(GLOB,"^",2) S:VAL]"" @TMP@(TOP,"relation")=VAL
 S VAL=$P(GLOB,"^",3) S:VAL]"" @TMP@(TOP,"st1")=VAL
 S VAL=$P(GLOB,"^",4) S:VAL]"" @TMP@(TOP,"st2")=VAL
 S VAL=$P(GLOB,"^",5) S:VAL]"" @TMP@(TOP,"st3")=VAL
 S VAL=$P(GLOB,"^",6) S:VAL]"" @TMP@(TOP,"city")=VAL
 S VAL=$P(GLOB,"^",7) I VAL]"" D
 . N STATE
 . S STATE=$P($G(^DIC(5,VAL,0)),"^",2)
 . S:STATE]"" @TMP@(TOP,"state")=STATE
 S VAL=$P(GLOB,"^",8) S:VAL]"" @TMP@(TOP,"zip")=VAL
 S VAL=$P(GLOB,"^",9) S:VAL]"" @TMP@(TOP,"phone")=VAL
 S VAL=$P(GLOB,"^",11) S:VAL]"" @TMP@(TOP,"workPhone")=VAL
 S VAL=$P(GLOB,"^",10) S:VAL]"" @TMP@(TOP,"sameAsNKO")=VAL
 Q
 ;
USERKEYS(UID,KEYS) ;
 Q:$G(KEYS)="" ""
 N KEY,VAL,I
 S KEY=$P(KEYS,"^",1)
 S VAL=''$D(^XUSEC(KEY,UID))
 F I=2:1:$L(KEYS,"^") D
 . S KEY=$P(KEYS,"^",I)
 . S VAL=VAL_"^"_''$D(^XUSEC(KEY,UID))
 Q VAL
 ;
ADMINFO(DFN) ;
 Q:$G(DFN)="" ""
 N VAINDT,VA200
 S VA200=1
 D INP^VADPT
 Q:'$D(VAIN) ""
 N PROV,ATTPROV,DX,HASD
 S HASD=0
 S:$G(VAIN(2))]"" PROV=$P(VAIN(2),"^",2),HASD=1
 S:$G(VAIN(11))]"" ATTPROV=$P(VAIN(11),"^",2),HASD=1
 S:$G(VAIN(9))]"" DX=VAIN(9),HASD=1
 Q:HASD PROV_"^"_ATTPROV_"^"_DX
 Q ""
 ;
HXFACTOR(DFN,START,STOP) ;
 K ^TMP($J,"HX_FACTORS")
 N HF,DATE,ID,NDX
 Q:$G(DFN)="" "0^Invalid patient id."
 S:$G(START)="" START=0
 S:$G(STOP)="" STOP=$$DT^XLFDT+1
 S NDX=0
 ;
 S HF=0 F  S HF=$O(^PXRMINDX(9000010.23,"PI",DFN,HF)) Q:HF<1  D
 . S DATE=0 F  S DATE=$O(^PXRMINDX(9000010.23,"PI",DFN,HF,DATE)) Q:DATE<1  D
 .. Q:DATE<START  Q:DATE>STOP
 .. S ID=0 F  S ID=$O(^PXRMINDX(9000010.23,"PI",DFN,HF,DATE,ID)) Q:ID<1  D
 ... S ^TMP($J,"HX_FACTORS",NDX,"id")=HF
 ... S ^TMP($J,"HX_FACTORS",NDX,"name")=$$EXTERNAL^DILFD(9000010.23,.01,,HF)
 ... S ^TMP($J,"HX_FACTORS",NDX,"date")=DATE
 ... S NDX=NDX+1
 Q 1
 ;
POSTING(IEN) ;
 Q:$G(IEN)="" "0^Invalid posting id."
 K ^TMP($J,"POSTING",IEN)
 N TIUREC,TIUI,TIUARR,TIUL
 D INQUIRE^TIUSRVR2(IEN,.TIUREC,0)
 S TIUI=0,TIUL=0
 F  S TIUI=$O(^TIU(8925,IEN,"TEXT",TIUI)) Q:+TIUI'>0  D
 . S TIUARR(TIUL)=$G(^TIU(8925,IEN,"TEXT",+TIUI,0))
 . S TIUL=TIUL+1
 M ^TMP($J,"POSTING",IEN,"text")=TIUARR
 S:$D(TIUREC(8925,IEN,.01)) ^TMP($J,"POSTING",IEN,"type")=TIUREC(8925,IEN,.01)
 S:$D(TIUREC(8925,IEN,.05)) ^TMP($J,"POSTING",IEN,"status")=TIUREC(8925,IEN,.05)
 S:$D(TIUREC(8925,IEN,.09)) ^TMP($J,"POSTING",IEN,"urgency")=TIUREC(8925,IEN,.09)
 S:$D(TIUREC(8925,IEN,1201)) ^TMP($J,"POSTING",IEN,"entryDate")=TIUREC(8925,IEN,1201)
 S:$D(TIUREC(8925,IEN,1202)) ^TMP($J,"POSTING",IEN,"author")=TIUREC(8925,IEN,1202)
 S:$D(TIUREC(8925,IEN,1301)) ^TMP($J,"POSTING",IEN,"referenceDate")=TIUREC(8925,IEN,1301)
 S:$D(TIUREC(8925,IEN,1501)) ^TMP($J,"POSTING",IEN,"signedDate")=TIUREC(8925,IEN,1501)
 S:$D(TIUREC(8925,IEN,1502)) ^TMP($J,"POSTING",IEN,"signedBy")=TIUREC(8925,IEN,1502)
 Q 1
 ;
BOILPLTS(DFN,TEXT) ;
 Q $$BOIL^TIUSRVD(TEXT,1)
 ;
ROUTENM(ABBR) ;
 N ID,LINE,ONAME,NAME
 S ID=$O(^PS(51.2,"C",ABBR,""))
 Q:ID="" ABBR
 S LINE=^PS(51.2,ID,0)
 S ONAME=$P(LINE,"^",2) Q:ONAME]"" ONAME
 S NAME=$P(LINE,"^",1) Q:NAME]"" NAME
 Q ABBR
 ;
SCHNM(ABBR)  ;
 N ID,LINE,NAME
 S ID=$O(^PS(51.1,"AC","PSJ",ABBR,""))
 Q:ID="" ABBR
 S LINE=^PS(51.1,ID,0)
 S NAME=$P(LINE,"^",8) Q:NAME]"" NAME
 Q ABBR
 ;
ALLERGY(DFN) ;TDP ALLERGY
 N GMRAL,GN,GMVALG
 D EN1^GMRADPT
 Q:$G(GMRAL)="" ""
 Q:$G(GMRAL)=0 0
 K ^TMP($J,"TDP_ALLERGIES")
 N ID,NDX S ID="",NDX=0
 F  S ID=$O(GMRAL(ID)) Q:'ID  S NDX=NDX+1 D
 . S ^TMP($J,"TDP_ALLERGIES",NDX,"allergenName")=$P(GMRAL(ID),"^",2)
 . S ^TMP($J,"TDP_ALLERGIES",NDX,"allergenType")=$P(GMRAL(ID),"^",3)
 . N IDS,NDXS S IDS="",NDXS=0
 . F  S IDS=$O(GMRAL(ID,"S",IDS)) Q:'IDS  S NDXS=NDXS+1 D
 . . S ^TMP($J,"TDP_ALLERGIES",NDX,"reaction",NDXS)=$P(GMRAL(ID,"S",IDS),";")
 Q 1
 ;
