        x  �       ����������?����m,D�v��2��4��            4�  �+'use strict';

var $$Array = require("bs-platform/lib/js/a$ a.js");6 OCurr4 c$ 4 XReact4 r  _andomS r% � _aml_a� c) > �primitiveB - F �ML$Reason� �ExamplesN �../ML.bs{ Onvas9 ) 
= oLinAlg= ) 
= _Styluz ) 
= DataGen> * ? �
function LogisticRegression$Fit(Props) {
  k  x_ S.x_m; y y 0dim~ �/* tuple */[
    400,	 D
  ]0 rpallete3 =3 r"green"7 T"blue 6red Dack"R breturn�� .createElement(�a.make,�  �children: (.�(ctx, scale)1 "  � match =�.Matrix.size(x_m);K PpointPa.init(a H[0],� .ix�  � /  � �get(ix, 1,W/),W <2W V ?],
y 9�0, y) | 0V /];# O}));W	B$1 =�A._2(�,Gmap(   - .[0� � ,�!),��  \� V x �9ter� � � Fa.draw_� �;�1(t, p[0]),�.�_�� * 1* �/* () */0� )/;
    K: 
) 2;
} FiR  �:�(
}�2get��Theta(para'�}vector(� b �.$$float(400),# 2	" ]
�	_Train�'�;�useState�
�{d"� e 1set( %[1t 3� oEffect�  X Yimeou$ ��0nexT2	�.LogReg.gradient_step(0.5,� e �
e� /, � ] � +���J 100���,�� /])f�]Ax_m:C Oy: y�
x: ,(	G /
}
I�u
!.P% �.clusters(4, 8g�	 � (�?800���� ^, ix)�<� 1<�	  
?1]
&});y;�=� 
�<�__min(V�1], 1.0)� ;�=3 U/ =� �;

exports.eEFit; t  N   Q;
/* >� Not a pure module */
    x    b  �           �����G5�03�
"�0#V�!            4�  C    �(2var List = require("bs-platform/lib/js/list.js");
  } ��function forn(n, fn) {
  W �_ix = 0;
  while(true !   A_ix; @if ( D== n& �  return /* () */0, e} else% �Curry._1(fn, ix); � �ix + 1 | 0 �continue N �
  };
}

� �near_boundary(x1, theta� �&residual = LinAlg$ReasonReactExamples.Matrix.get(0, 0F +5 15 e* x1;
-� /N 2N � B  � " �  � = Props.  �"� = ,   7 �match$2 =
 A1[1]8 ��  �  q8 �$$Array.iter((z&(p� � oStylus� � draw_point(ctx,�t, p[0]), Caml_a c _$ppallete* 1* yU� A}), p s% !u__x_000!O2[0], 01 =} o:: */[{ J ?1],  P/* []�   } 	y � , 1t AlineHhst.mape��/* tuple�  /e,) 
eL> ]A&__��  D� 
 �"5 1 . �: +,
� : �,
  
j  
�   _�0nex1/ML� �
LogReg.gradient_step(0.050�, x_m, y� �i  �   !60% �     /# Ly: y�c �: theta
    �    �           ��������H����]�S3z�`�            4�  �  =  �  "n �F�function get_color(n, y) {
  var match = LinAlg$ReasonReactExamples.Matrix.size(y);9 bcols =@ 4[1] p_ix = 0 �while(trueo !   A_ix; @if ( !==Q ) �  return -1( e} else � o$1 = (� 0get� !ix� A| 0)t ^ � Q � � � �  � `ix + 1X ; �continue < 
 �};
}

  M  Y   & �"black",' t"purple �gray"
  �  �   3  �� R
  � . Q/  TDhigh�#$2�) 7low( �0];
  
    4 . 3motheta)� �Cforn�u3[1], (�8(ix�$� 1ine� wst.map(E � � �Curry._1(t, /* tuple */[
   /e,7 "�near_boundary(e, " .,y){  ]�* !})/::?low[  �n�/* [] */02 �]
  *  �   �KoStylus�Pdraw_�Q(ctx,��, Caml_array.c _�ppalletex ()� �0}))�" ' W: ,$ �3    ~upRandomTQ(w1Kpredw-K �make($$A!iinit(33^param�	�	?  � B P  �.$$float(40�� ���  �   $o � 0 �E  �   ]!�next = ML]�LogReg.gradient_step(20Fr, x_m, i �E  ^   !16% ��  7   ��@ointkDataGen� P% �.clusters(6, 8006 __�"!?800W �    �  )b ?x_m#�norm(__xz�	�1w(2
H Y y� 4>row��67 ?col��(�� , � P[1] -�	�	/0;e 
�	^Z/1.S �	O 
0O  P}));
    f     !        
   ����❁:	�`6w)� ��S��J�&              "  ,         ], /* () */0);
    �     o           ����2��(��䔗�P��+]�            4q   �F  �     <  var match = ML$ReasonReactExamples.norm(__x, /* array */[
  R  j     � x_m: match[0],
