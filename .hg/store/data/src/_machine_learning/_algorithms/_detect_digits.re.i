        �  �       ��������-��S�	�t�1���S            4�  �let forn = (fn, n) => {
   �rec loop = ix =>
    switch (ix)) 0  | Awhen& 0= nD &() : @  fn7 ;  [ s(ix + 1 3};
 �0);
};

module Digit =� cscale k � �float_of_int(n) /. 28.0 *. 100.;
_ �[@react.component]T 0makS �(~image)Z   @dims @100,P � q<Canvas � �{(ctx, _B � Forn( V  row%   ;colL  � Nsk = �  Js.Typed_array.Uint8A �unsafe_getm  ,  � `* 28 +� % /);� @value � #   ?> 0T �? Stylus.draw_square�    � (>b(col),Jo(row))1 #1.NM* R255 -� $ )� >: (2}B +28 
� 	 �"}}�/�>
 ^�[@bs.val] external fetch: stringv�Js.Promise.t('a) = "% "A MK	N(TS setIb! R> �useState(1 ANone�  �Effect0((T� � �("src/t10k-q �s-idx3-ubyte"~�|> then_(responseX  �##blob()-    )   !##UoBuffer,  � 	>bit��	 O�a �##slice(28�0* 3P�6, 16 + 4 ,28�
�� (_� SSome(� )) wyresolve�}	wignore
m  � B<div�{UX" |� x�<" T=x />$ � +�d("wait���</div>;
};    �    �  �       	    ����	䂄�LA0��O2Мo�W            4=
  C   � �Ilet fornn = (fn, n) => {
  0(ir  c   P, ic),   �;
};

   � �
    !   #  d @makec �~image, ~labell �	  <  �  �    <span>
  �<Canvas dims �  {(ctx, _�  � ( �  (row, col/ "  � |value = �  Js.Typed_array.Uint8A �unsafe_get(� �row * 28 +m ;N e >> 0g �? Stylus.draw_square�   �  p(scale(| ",  _row))/ �1. /. 28. *. 100.( R255 -� " ) <: (� }< )28 / $}}�/���{React.string({j|$HB|j})3 !</< L }��type entry =��:�t� X a: int,G �module RandomDigitO 1[@r� �component]
�Wstatez  �(idx, setIDX) = � @useS- !((/ 0 tEffect1(� Y Ytoken��Js.Global.o znterval[I �  (_ � R.int(rlength(� +))�_500,
�4Som� � Uclear� � )4 )![|n G|],
U 	�{switch � a| [||]� 3v"wait")& � <�!={K a[idx]. }	  �} />
  �  �   ��;_Train5&� �"hello")}v �  f  �   6kK m]o 1)B ��  k  �@�Promise.all2(;�fetch("src/t10k-,� s-idx3-ubyte"),+ >+ 1+ )�(|>v rthen_((e"s,� s)� s� . �##blob()6  i �r 9QhBuffery 	 � &�� V:ing���init(5000, ix� ; ���slice(28*� �+ 16, 16 + ( ) /28� �� 2�� � 08, �� /,
�/->'L_, 0R }���/);�wresolveu}Y`ignore��{  �   9
R<�%X /> <� �/span>;
    �    �  x      
   ����Om� �o�	������ˏ[�            4�	  �:  _  p  4module WriteDigit = {
  [@react.component]
  let make = () =>*  @dims �100, 100); r<Canvas we �ble=true onChange=Js.log> {(ctx, _Z R}} </> >L s};
};

� �LiveTraining� �type state �	  step: LinAlg.Matrix.t, �accuracy: list(int) Ccost 9 "),� �
  �  �  ��~x_m, ~y, ~theta%(� `, setS
 1) = 1  Rm1use (^� J ,� 3[],� 3[]}iA �Effect0(��  Js.Global.setTimeout( *  , :� \(prev �  � � = ML.LogReg.gradient_ �(2000.0, A . !, =y);K � O TNIST. (;  	�   5 	
� $, k Q, ...�  ]6 �  .   * }� %}) }'  F   �->ignore= 3Non  
K( �List.length� �) == 0 ? 0 :' ,hd# *;
iU   Q � ?z %�([|[|0.0|]|])w E 9rspan> {��string({j|$� $. @|j})). ;�� #Z*&�@ssag�zentries��m = Array� & 
7x_m	�  G 7inij8  m/ix\)im� Q[ix]. �sz = 28 * 28 � Psz, b�>��Js.Typed_a- RUint88 �unsafe_get(z A � )->float_of_intM 	h�)��ML.norm(_, () 
M�add_col(1.y}M[label} _`10, ilN   =B @? 1.[?0.0� �� p + 1, _� �  qRandom.�\(1.))� (3,� #);�#~s�bIif (G E= 0)tL<div�a"wait"�  �U else8 L
� 1LSMemo1	�� A, [|
 $|]=9  <U �y�/� ��  k  �   G�<i�B/> <mT	 i	  �/span>;
    �    -  H         ����E�wM'��ݘ&aFv��� f            4�  �    /     r0,
  u ��  let massage = p => {
   � = LinAlg.Matrix.make([|Array.init(28 * 28, _< �0.0)|]);C �sz = 100.0 /. 28.0 �List.iter(
� �((x, y))� C �(nx, ny) = (int_of_float(xS Ysz),  y %);G  ifF � < 0 || nx >= 28 y y ) 7  (F i} else  � @ix =T +C  ;! 
?�set(0, ix, 255.0, m`  #},	 p	 $ 1m;
%  ���  �   7�k��(~onChange:z tXCunita�  �     i\ �<Canvas dims writeble=true S !={ (7c(p))}>� b{(_, _d !}} "</[ � >;
  S  l    � accuracy: list(�)���  �   � 6tes� P�  
�g} �React.useState(() ]\{step�vector([||]),� �[], cost
 }� )� �
C  
�   H  ��length(sv .E �) == 0 ?" :) ,hd% T ��  6   �6�prediction = ML.NIST. C  � !, D<div� �<span> {�string({j|$y   $� �|j})} </. ;  G : �THE PREDICTION IS: $� I �   � qP  �  ��  �    �� %, ��
    �   *� �<LiveTraining� 7 />n ��  �  Nmodule DigitGallery =�1[@r� �component]
� �amples: a�(~ �*�"Hello I'm a|  } "!� �� �ModelDebugg� � oparams�  ` k s� 	P|� #to5 %, �� Eo stuff� ctype t�_� � ]theta� 5�  �o,c \  H �  � )W �input =
  | Idle	 e;ng(� )  ,ed ,� )h D�  � 3to_d:�   �send_to_worker: S�Queue.clientMe9� a� WC @Star� I � 0Upd�� ,�4 BSetS�(� 0;

�preducer�W� : �switch ( {�  w�3...J 7,w}� �%  :  �:E$ .� �*s,}C��� 9�� 
zappend(7 .. _, [|{� }l� }�buseWeb� �� 
��dispatch)��R�U
o � p  �
 �	
e ��j'( �� rEffect0��(F D� �er, cleanup
 � "C� �hrt(msg	8msg�
c| Ack(� s(�  )8 �VS 4 
] =aJs.log� ��		Z �>#TSome(Iz�n��     v  �o�-<O	</+={2 3} /6 ~/={i6 ���; �0��[
	��S B(e))E  �</span>;
    �    	;  *         ����v�&��$1�A[i��n�1            4�  �   �   �  �>�  5   �  let unit = ((sz, _)) => {
    1. /. 28. *. float_of_int(sz);
  };
D �pointInCanvasM �r, c), dimsR  , aside =w ( ; (a  r)t  + ,z c � );
  P  �   I] 0mak]  (~Z �: (int, int), ~value� �  �  Q  S  xforn(
  6idxN   Y �(row, col)�  * Q/ 28,4 �mod 28);8 � � = LinAlg.Matrix.getQ ,$ ? �Stylus.draw_square�   Nctx, 	�!((f 4row�2  � �255.0 -.� ! _�a  r   ; 08 *# " R�  ��b  U ��  �   O/m+ �(Array.i� u_� Q0.0))� ��  �   /� 
Y �set(ny, nx,� 1, m; ��  	{   �module DigitGallery = lPhuffl�vsamples=bRandom� �Js.Date.now()->in��RBelt.� T (R )  #-> `ub(_, � #inelength0 �, 5 * 10b	�  	�l�	�  
*  �Z; 0: aQ b(NIST. )] < 3 �65, 65); �(selection, setS  ,�React.useState((T � L , tEffect1�*()�d (w
�) == 0 ?h 4 : � H DNone }�#[|. "|] � sviews =* u 6map�H(e: B� <A?HP={e.d g} />},� G�
  
3  ;��E  �  �) U<div>7 �<span> {?�string("Ex� A of l �s in the dataset")} </; J ��<button onClick={g	�_�}F  � S/ 8")}l /m � 	� '</�  8Rtyle=d `DOMRe.<e<�~display="flex", ~ �Flow="wrap", (� � �*)}� �  �  �   $�LineChart!�  �  u  =� �K� c x<� 9 �  {(�B scad
�$stO X) > 0�?��t-" =T ]tof_listI >/;
�Bline� �  5t, ? (�� �C : (h"</� >���  4  �j�ModelDebugging��getSpark�  k@windd'fng��i((ix, p 
�0ix)6 b(p)), F 
�!to3	a
  [@r4�component]
�Uparame�training_ izepoch =�+ �� � $V3 `omax(0,W W - 20 b2, ' <�� Qplore~D Reters��"8� � �alignItems="center  �justifyContent$ (0A � ��marginRight="20px�4A{j|E1: $ 7|j}?*</�Q  ��=(500, 100) p(={C@p��p.accuracyu /�j=
210,�	6 �A{j|$C d
� c
	j�137, 137jq3  D � �, p.costj  	c
�; 4 .,
@ '  �B  � #�QPredi� #to5 �, ~onChang�(� 1setQ	^
 �	��Hello I p~ n stuff�QWritev � $={n	:�  	BSome� 
E  �
;}}
��{switch (+)q |t#ed�	5, p�
#���K{�iM�)ix� �'->�	 �"v:I%�j|$ix : |j} ++ Js.F B.toS�v�. _ �  (el Ge1 F	B �/}
z
+4=(1�6�	�
B |�' .}}� �Ttype �I	 ,�,W �  �  �   T� BSetSV (c 
�
0;t,  �"b / f��qJs.log( `P{...s0S, to_�:H �" < H r�y  A_atch(U Ped))
        >  $�         ����7��I`��=<�E���Xζ~            4L  �   w  �   <  let make = (~samples: array(NIST. �), ~onSelect) => {
  �  		   �  H(e: 6 *   �<span onClick={_  W �(e.digit)}>2 @  <D � dims value={* 8} /+  </^  r},
  7 �|module Bar =�  � �rec texp = n =< �switch (n)� 0| 0� #1. B(-1) d /. 10 B \ 1x =\ �(n / 2); Bx *. �(n mod 2 ==T ?S S : 1.4 } �[@react.component]
�Az, ~"xq<Canvas? =(# 420)� �{(ctx, _�A�x.iteri(�v(ix, e)�  u Z >= e �  ? Stylus.draw_squareS   �  �(float_of_int(ix)9�20., 0.0)3    b55. -. f<*. a <  ) :: (( *[|# �=-15�  0 1 2I H  n0.0001   5 '|] �2 }}r/s1>;
�0};
�� " ��`column�}R�`DOMRe.7 e.�/� ~display="flex"� ~ �Direction="Y 
 5="1 �)� �
  �  =  ��  �"v:&� Moound =  `  Js.FE �.toPrecisionWith Q(v, ~�_s=5);g O<div` s2/={D
 V) �width="100%' 	�?row. Fs/}> D� �(. "  �.string({j|$ix : $�^|j})}i P�   <acsz=200�Ov />M 
o</div>��qd  �  �2  h   �sGallery? ��={state.training�s� v0={e�- �send_to_worker(T< �Queue.Predi��))}
    />
