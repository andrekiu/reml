        �  �        ���������]�F'a4�Y�O��Ldn̡            4�  �+module Matrix = {
  exception WrongDimensions((int, int),  �);
  type t = % barray( `float). �
  let make1 Praw):< P> ((A, q.length ,,  p[0])),  L `vectorN 9v: p W Z
    \ qv), 1),  Ninit$  �> [|v[ix]|]2 x �transpos� Y(d, mr �snd(d), fst(d)n   c4  0 0, r �m[r][c]){ �reduce_nz �fn, limit}  �$ `c loop$ pix, sum"   �  switch )4 0  |� Awhen� =V  U 8sum# !=>Y � (ix + 1, fn(sum/#))( "};�  ' Q0, 0.)}� "do0`d_a, a�, (d_b, b #fn� c_a) != bj �? raise(�Z  ( ) :u� u#_aw$/  �$_a�Bfn(a�1, b	 R mod & Wb)]))m (  �0suma�  R 1dot , �a +. b);�s3 -3 g _crossp	l� lrbl	&   (y#k)� +��k] *. b[k�� )n ��Fform�
��d�	��5fn(��w _w �m �fold_leftl1row+ %  e �Ee), 5 40.0 m	 �Psum_c� At, cP -  e e�c�3 -3 ?mul3 *3 ?div3 /3 ?expf *3 1siz�2t: x �t !ge�`r, c, ��+  ��r][c];
};    �     �  �           �����ߓ�H��4],5o�ߵN.            4  B  U r 
  � � �  let set = (r, c, v, (_, raw): t) => �[r][c] = v;

6 pget_col: qix_c, (B )< r
    if# � < 0 ||  q>= c) {! �  raise(WrongDimensionsQ 21),� A)));. e} else; �vector(Array.init. Dix_r�   ] �c]));
    };
    �    �  7      
   ����x��]��� ��G�            42  �  :  �  h  let raw_transform = [%raw
    {| �function (m, r, c) { @ �ans = Array(c).fill().map(() => r c0.0));? Pfor (D piy = 0; 0< c &++f ) x) Px < r 
)  � �[iy][ix] = m   ;L *}
 `return8 $;
 | B];

� �pose = (((A, m)� �((c, r),I,r);
  � &ttOmulto�a, b, rx, ry, rp� Jconsz/rx{y|	SxT�.ry�, p, p, p	 , ��R += a `p] * b 
����  U     ~/ :�  � � (pr, pc, pivot)��fst(d_a), snd(d_b
 aEt  make(��
M - }
"7 # �
�educe_rows]Qdr, _^0: t  �� (I $ 31), �Q.init  �>� "[| �fold_left((sum, e!�sum +. e, 0.0,.3)|]> b � }H" #�padd_col� 5v, 1raw� �   " / +�  � r�  5 @, icT   �= 0 ? v :n �[ir][ic - 1])� zoax_idx�t M� $  Kd1
e  if (�# >�U ]bl /iyI� M ;e� Z(�	(�� Jx  )� �opct_eq3
� pci?0.0� : �+= (Math.abs(�A - b*  <V  �1) ? 1.0 :j ; P ?/ ri� p((da, a5�, (db, bQ
�da != db� �raise(WrongDimensionsJ $db�g} else3 Y<��P  };
