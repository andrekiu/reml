          6        ��������FTr�`}�����'#'�Y�            46  �&open LinAlg;

let normalize = (points: array((float,  �))) => {
  7 �aggregat7 �(low, high), e( B(min �e), max(   #);C �(x, _) = v 5[0] �tx, sumx) =
    A� �.fold_left( @  ((% + #),P � (� # �x), x +., %},A  40.) �  � Pget_u� _  S 2 /.�_of_int(� clengthI)@ d+2, h� dh -. l" �transform& Et, po@  (p+ � R()) / 1d(t` 3};
D � k � Amap(� yu (h #(t� 3y),� )J 3x_m{�Matrix.makew�;ini�  s), r =>0 	2 @2, c� �c == 0 ? 1. :� �[r]->fst)= )�4y =� vvector(� s�gnd(s),S �@(x_m�  ;
1`moduleUReg =��gradient_step�cheta, = ��lpha = 1.7; #(m�� @size| ();P4resOb   �2pos:  #-> �cross(_,M 	 � X �A Pmul_cA � �(m)v`Ocost!pr~� (�residual =�  ? �PTduce(U  , ����e ** 2.0� ( *� "� P};
};        �  �           �����ukq�}� �ieo_ޘ@��            4p  �1   C   �   �  let aggregate = ((low, high, sum), e) => (
    min! 2e), 2ax(-  �sum +. e 2);
c �(x, y) = points[0] Ptx, t �
   �     |  a((sumx� 3y),F � 3{
  (� - Ix),  y6 1 4},
\  , @, 0.Z  $  � ),
  2  �   o� Qget_uB_, _�  � �/. float_of_int(Array.length(� )	 J dhb, h, _H ph -. l;{ ��  �   !� p  b(t)) / Ad(t)- ��  !   \^ �normalized =� � Wmap((=�(transform(t1 /,�h �  [   2� �radient_step� �alpha, theta, x_m, y) => {
    �     U  {         ����j���{b���*���Y�\�              +  �   I  let normalized = Array.map(((x, y)) => (transform(tx, x), y), points);
    =       z         �������	OƵ d�u���*`��               �   �     let (tx, _) =
    Y     c  �         �����td74����%���V/L�            4d   B  x �8 X};

module LogReg = {
  let gradient_step = (alpha, theta, x_m, y) =>2   p;
  };
    �     �  (         ����˜{}a�U��؜I��e            4m  �-  �  �  a    let sigmoid = z => 1. /. (1. +. exp(-. z));
0 �linear = Matrix.cross(x_m, theta+ h& �transform(@ ,x / GerroY �res(h, y" f(m, _)# @size{ # qscale =  � � 2pos: ,w )1 #->& �mul_c(_, alpha�float_of_int(m� � �, scale);
    �    �  �         �����	�m�;t���I�$v�J�            4l  B    �#`let norm = (x: Matrix.t, ix: array(int)) => {
  0 �aggregate5 �(low, high, sum), e- �(
    min! 2e), 2ax(-  �sum +. e $);c Dns =� �make(snd(x)! f(m, _)$ �size(ans! Qreduc� �fn, e, m� ! `c loop# "ix� 1 =>  �  switch )4 �  | ix when @== mQ 8sum !=>U � (ix + 1, fn(sumO#))( "};�  ' 0!;
 � Diter� � /ix�  *()�   � Eix); � /);� �  C�alize_diLPcol: :j: unit� Vfirst�0get	Tcol, ��]# =� �(� e1row1� g 7rowi &),A � #,  70.0 m � amean =��/. float_of_int(m' @rang� � p -. low�60.0 1/  �� 
��&et�  $ ,  �  (� 'ix�  �  � )� � 7 6ans  �0  A.� 	�#, F�ans;
};

    	>    �  �      
   ����^̏���OJtBT��:W��            4�  �C      <   8let norm = (x: Matrix.t, ~ix: array(int)=[||], ()) => {
   �   �   !  F �(m, c) =D �size(ans);
  B  c   `  AU �.iter(
    �alize_dim, # �length(ix) == 0 ?; �nit(c, ic� �ic) : ix: l "	� " .� �sigmoid = z0 �1. /. (1. +. exp(-. z): q
   
P  P
�  � 2�  H �residual� dcross(4�ranspose(x_m), error);
? Vscale< dmul_c(T p, alpha� �float_of_int(m� "� 2�
M @cost��theta, x_m, y�q �eps = 0.0 1�  �_� � # h� i u & 0pre^tform(h,|- Aos =  2 ndot(y,@  X 0, e� Qlog(e��ps)), (a, b� J �  a *. bA " � ?neg� $o1. -. � % /a)� s (  � @pos,� ^ R   Eb)->j�->reduce_rows 
` �};
};

module NIST = {E�accuracyIolinear1�max_idx(> 
� {pct_eq(* �y), h);
  };
        �  m         �����_i�s$����.�>�DJ�            4f  �   �   �  �(Y  �   N  let normalize_dim = (col: int, ans) => {
  - �(m, _) = Matrix.size(' �;
  �  @  / 6ans< > % Siter( u  ix =>  6 &et$ ( , :col (: qget(ix,! � �-. mean) /. range9 8ans ) m � 1};
 
� � � �make(snd(x));! _(_, c ! �massage =_ �Array.map� hrow_ixa	7 :r =�(1 (, o / (  }� � �length(ix) == 0 ? �init(c, ic� Qic) :��  G  �   �  (
[lsample+A, F� 6mB m� ,� ( 3ans�� R�  �"� #@xppredict	ctheta,� )� eswitch[Scross� !, : #))+ �| exception (LinAlg.7 � WrongDimensions!_)tC(-1)> flinear  h�transform() �, LogReg.sigmoid�Js.log(h);I 8rawi�x_idx(h)->snd��nt_of_float(raw[0][0]�P  };
    �     �  `         �����E���P^E�����.�Uڹ            4  �>  ,  V   R  let predict = (theta, sample): LinAlg.Matrix.t => {
    Js.log21 �;
  �  _   �( �| exception (N �
WrongDimensions(_, _)) =>a  | �make([|Array.init(10, _� �0.0)|])
p `linear � �ransform( �, LogReg.sigmoid)
    �     `  �   	      	���������vx,	���{�J�-�\            4k   �    =   _    Matrix.res(theta, scale)
 '-> $_,- Tmul_c/ �0.1 /. float_of_int(m)));
