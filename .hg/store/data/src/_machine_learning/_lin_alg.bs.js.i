        �  �        ����������MYR�a=��>^Ϸb.K�            4�  �+'use strict';

var $$Array = require("bs-platform/lib/js/a$ a.js");6 OCurr4 c$ 4 _aml_am c) > _int32> ) > �exceptionsC . H I �WrongDimensI [ �.create("LinAlg-ReasonReactExamples.Matrix.L d @funcH � make(raw) {
  return /* tuple */[
   �  raw.length, �.m@_getr C, 0)6 5 9],
X  G];
}� �vector(v� *v� 1� �e.init(< % (� 2(ix�  � �?*/[�v, ix)];H ?}))� transpose(param�  IAm =  C[1]; d ?0];>'[d[1], /0]=; 9c8
< 0< r< J v �m, r), c);
d ?}))��reduce_n(fn, limit�t_ix = 0�D_sum �while(true�  " !  ( ; D 2_ix  if�H ===m < e} else } �1._2� 1sum�� � �ix + 1 | 0 �continue Z J
  }2dot�,�f$1, fn
b�($1�_ 0 a�+_a�`atch = `[0] != b!  ,! %hthrow W�:d_a bu�
�/_a� /_a^$�1!a1? #b? Caqmod_(c,�>1])g� )0sum� bI!do� bF& 7a + b;
�  
�so 5-o [cross_[[1[�b[+�B JkG U  �+�)Ok) *�%k� 3}),�9	 a�/fn		9d���	�1���D��fold_left#ro�B
@ 
�5), D "e, 0.0,@_c(t� [t�e� _e + cq 7-q ?mulq 7*q ?divq 7/q ?expq 5�Math.pow(e�z  jsize(tv +[0 W, c, ��(��}E ! =a T:e 2:   c:   f:   �:
   @dot:   Asum:�. s) r �: b  �: b ` R 2_c: V    �  �: �  �:   %: P Aize:   @get: �
};

exports.P	 �;
/* No side effect */
    �    ~  �           �����`�T	�i|��'���@��            4�  B  � �'pfunction set(r, c, v, param) {
  return Caml_array.c _5  Aget(F r[1], r)Z e);
}

t �get_col(ix_cu �var match = C[0]; 2c = %[1 r ( 1if U � < 0 ||  B>= c_ �  throw [
  �WrongDimensions, �/* tuple */2 I  r, 1 ]A !cA  � }� %aw ��vector($$A�1ini�(m r  �
g�
Qraw, \  ?c);b  2}))��  �  �   + :  s s �: get_col
        �  N      
   �����x�J��H�^O�I��:��j�            4  C   y �:var Caml_obj = require("bs-platform/lib/js/c' �.js");
  i  F �raw_trans4 � = (
    function (m, r, c) { �  let ans = Array(c).fill().map(() => r c0.0));? Pfor (D piy = 0; 0< c &++f ) x) Px < r 
)  � �[iy][ix] = m   ;L *}
 `return8 $;
 0);
��  �   @  � match = param[0T   2c = %[1 r !0]i��  �     8c,
 �r
  
     2 �Curry._3(�,� #1]�R
  	� $b�Omult� �a, b, rx, ry, rpEJcons�/rx�y�	�x�.ry, p, p, p	 , �R += a `p] * b 
!q	�  	�  b	�  	� �
}  k   �p7d_a4!pc b3Spivot)  z Smake($5(��
 "$1 br, pc,O )�"� %��reduce_rows(> @��� 'dr�([0� �/* tuple */[P J  dr�1 ] !$$d�.init(dr, (�,ix�	�@/* a<  } G �fold_left(H osum, eL \ �sum + e;
0 �}), 0.0,�� %.c @_getQIix))�= ) @];
}o"� %�� �add_col(v, �>raw��#�+��c + 1 | 0��r�
	: h 
B ��*Pic ==o6 Aif (6 OvI_ elseU r �raw, ir),� -<)� 
)��oax_idx}� �1 $ t ��1��l>tU ]l /iy~�4 = M ;�5N��H�	�� ��/opct_eq�
�
 pc`?0.0' : �+= (Math.abs(P  -LPx]) <V  �1) ? 1.0 :j � P ?/ r�� ���Edb =��+da� ���notequal(da, db)� hthrow �� WrongDimensions�)da b�� ��� �d	)�"F :   �: ,, � 5  �
:
 " � 8  �:  ( � H  [   �  getW:	  � k:	   �:     	:      � �x  �   &/*��Not a pure module */
