        F  Z        ��������K���m��hZԥM#C�ΓsU            4Z  �+'use strict';

var $$Array = require("bs-platform/lib/js/a$ a.js");6 �Caml_obj7 c' : O < x �LinAlg$ReasonReactExamplesN "./( 3.bs< �
function normalize(points) {
  \ �aggregate = / �(param, e( �  return /* tuple */[
  .� 2minB 0[0]E ,, 	#ax, 1, + s];
  };� wmatch =K.-C_get� D, 0)4 2x =8 9[0]H D$1 =�.fold_left(( $$1� [  ]  , x*?x),*  Dx + " z ?}),u � xm x ] $0
  7E5sum\E$1[1^t u^get_db_� 4 - 	Ptrans.	J Kt, pI B(p -� /� �.length) /� 9(t)[ !d^map((� �� E(tx,� ��� x_(�.Matrix.make(� Vinit(� #', � r� � 	E 25 c5 
 ��c === 0;1 
Aif (1 Z � 1Q o} elseM s>K, r)	w   !})�	 �y�vector(�s�s�| ,� �8x_m�'y
�}��gradient_step(theta,= & y��� s�5x_m*?__x9 �=pos> /$1@ �cross(__x,- Ores(S ){i TQul_c(� u, 1.7 /-*))�Ocost�!pr5�  v�residual =�  s  � ;0/m#kTduce(� 	(su=	R � Math.pow(e, 2.0��(2.0 * m) +�/;
 $}

QReg =` 	Q:  � �: �
};

exports.�& =�; c 	 �;
/* No side effect */
    F    �  K           �����Tm��T=�N�)���g��            4  �   E     � �$Fvar Caml_primitive = require("bs-platform/lib/js/c- �.js");
  W  �   �  
Z .< �	float_min(param[0], e),
8 #ax8 18   `2] + e� � @   � �y = match[1]� bG  e��  �   e  �aggregate� 
 [$1[0]� 3 13 �1])
    &   6 xK 0% P1  ;� �/* tuple */[- /y, 0 ]Q �M  f   t#$1"} " K# �get_u = function � 1) {Z freturn{�/ points.length;
  }W ��     &6 B(p -a a(t)) / 1d(tT��  �   *`Ptrans�T(ty, d X��     Q��,$1 = LinAlg$ReasonReactExamples.Matrix.vector($$Array.map((� s� �  j  v   n $1 ��  �   /5 �gradient_step(alpha, theta, x_m, yU ��  	7   y� Cres(L - �mul_c(__x$1, � # /
`0]));
    �     )  %         ����y�Vh�V
SO����j��ǍJ            43   �  �  �  �o  �     �param[1]
         �  �         �����@�᱌iڟc��V�            4�   B  � �, xfunction gradient_step$1(alpha, theta, x_m, y) {
  return �;
}

var LogReg =" 	L :[ �
};

   � exports.D �LogReg;
    �    ,  �         �����e���N�./iB&��            4O  �D  	    C  var sigmoid = function (z) {
    return 1 / (1 + Math.exp(-z));
  };
G �-linear = LinAlg$ReasonReactExamples.Matrix.cross(x_m, theta)D h? �transform(t ,� H Oerro� �res(h, y; Omatc� @size� ; ?__x� � 2posf ,� n _scalep �mul_c(__x, alpha /� 1[0]N �-��, scale);
    �    
  =         ����ؠB��t��z����"2��            4x  C   E �4var Curry = require("bs-platform/lib/js/c$ �.js");
   �function norm(x, ix) {
  Y �$ans = LinAlg$ReasonReactExamples.Matrix.make(x[1]);: _match< �size(ans; " =? 4[0] �reduce = � �(fn, e, m� ' �_ix = 0;  suO e �while(true5 & %  , ; L 4_ix @if ( &==u   wreturn > g} else# � �1._2� 1summ;& r �ix + 1 | 0 �continue b  } }$ ��alize_dim+8col&_first��get(0, col, �
��&((m � 8row#6 @para� , e� =row� ��/* tuple */[
   �Caml_primitive.c �float_min(� �[0], e),@ #ax@ 1@ " o2] + e!  ]� ?}),� �, 	50.0 ]0�5eanmf2] / m Urange E1] -�  +V  16 )fnzM�Set(ix�('ix! -� 2) /� (}�  $1� ;?-/$1 �/* () */015�$$Array.iter(d � �ans;
}

  � � exports.9 � = norm;
    �    �  �      
   ������K����vb�SϣD�            4G  �  :  Q   qfunction norm(x, $staropt �, param) {
  var ix =# � !== undefined ? �: /* array */[];
    4   �T �match$1 = ix.length === 0;
  $$A= `.iter(� �alize_dim,9 ?& Anit( e[1], (� 2(ic� 
 �return ic; �})) : ix)� " % :P �sigmoid(zV H �1 / (1 + Math.exp(-z));
}
F aH  �  ��  M   ��$residual = LinAlg$ReasonReactExamples.Matrix.cross(( �transpose(x_m), error);�_scalep dmul_c(� �, alpha /1[0]$"� %$�cost$1(theta, x_m, yJ�� 2siz� � 5m =}  h;� � S NpredB Uf,$h,F /osE odot(y,n  � 	�e��}�log(e + 0.0 1� 	�	V Ja, bY U Pa * b�';
< � ?neg� yO1 - � 9Q /a)' �, �reduce_rows(Z ; �@pos,�/  3�-a - b;
) E})))���  �  v 6:	 �,
  gradient_step:  $1"  N:TU
};

� �accuracyjolinear +_�max_idx(r pct_eq(e Ry), h` � aNIST =� :
 �
  (  =   Hexports.2   C;
/*� -{  � Not a pure module */
    R    G  !
         �����]����ԙ�����u�e            4 	  C   � �(Nvar Caml_js_exceptions = require("bs-platform/lib/js/c1 �.js");
  �  4  �X       h �normalize_dim = func> � (col, ans) {
  . � match = LinAlg$ReasonReactExamples.Matrix.size(> ;= " =A 0[0]� ��  �   0_ !$1� fduce((� �sum, row� �  �  f  �< 4eana �$1[2] / m} Wrange  E1] - �0] + 0.0 1: wreturn � .A )fny(ixb � _ qet(ix, �(0 g0 � -G2) /0*, � }� 
� v_ix = 0 �while(true�  - , G_ix;  ifj === m2 �/* () */08 k} else1 �Curry._1(fn, ix); � �ix + 1 | 0 �continue f }j"k " u� ?ans�make(x[1]� U&�  �  �   �G 1ssa��$$Array.mapWnrow_ix�9 :r =#1 e: # �! X%),�?� Rinit(`81],�"ic�    ?�tuple */[{ Gans, XNd� I �K � 8ter|�+UN*  ?U" I :ans %}) �"� %A� � predict(theta, ) Qlinea�3try�  4Scross5!, d �  \c��(raw_exn)� ex+�.internalToO E D $;
W0exn�/==� �WrongDimensio�X-)xPthrow� $;
0}7�Ptrans�(S�, sigmoid� �console.log(h3?raw��x_idx(h)[1�m Wa�c _% praw, 0) < }
M��  �   )  accuracy:
  �\�: predict
    �     �  !#         ����̿���_�r���f�M�?�&�            43  B   �   console.log(theta, sample);
       �  �return LinAlg$ReasonReactEx5 �s.Matrix.make(/* array */[$$A �.init(10, (function (param) {
  y O0.0;& B}))]� �:      G� �transform(linear, sigmoid);
    w     �  !�         ���������:�o�Ae�l��W��            4'  B  d �   var m = match[0];
  �  h   �  �7scale = LinAlg$ReasonReactExamples.Matrix.mul_c(residual, alpha / m);
L ?__xJ �res(theta, A oreturn> O__x,� k �0.1 / m));
