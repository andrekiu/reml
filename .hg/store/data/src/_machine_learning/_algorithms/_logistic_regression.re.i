        �  	       �����������Ÿ��y�k��[�V.            4	  �/module Fit = {
  [@react.component]
  let make = (~x_m, ~y) =>2  @dims �400, 400); `pallet= �[|"green", "blue 2red back"|]7 q<CanvasV > �  {(ctx, scale}  g �(rows, _) = LinAlg.Matrix.size(x_m);2 �points = �  Array.initP Dix =�  (    � �get(ix, 1, � ,0 20  �int_of_float(M \0, y): ) !#(tPu(�map(fst,?!),�; D9terpI�Stylus.draw_N �t` �(p)), ~color=C�[snd(p)], (� � /,
�  "}}S/T> s};
};

�STrain  � �getRandomTheta�p
��vector([|n 8 .�o400.), &3|])� �( (t� Q, set�  �RJ �useState(� 
� #()A, tEffect1�  �Js.Global.j himeout�0 � 0nex{�ML.LogReg.gradient_step(0.5, � � 9y);D �  (_`  N ! ( }6n1000,

�->ignore9 5Non C ![|� G|],
r<Lxx_m y /l� �b   le�Z800;
�� DataGen.P �.clusters(4,5 )0  � =�  n -(
�
�n,ix�Qx�2H�� I[ix]hb[|1., + �	�)5 W ?y =_�  � � Amin(� !->M �int, 1.0)q <��P>;
};    �    2  	           ���� M�4k粋5�����A!z            4%  B    �v  let forn = (n, fn) => {
   �rec loop = ix => �  switch (ix)- 0  |" Awhen* 0= nJ (() @ @  fn= ;  e u(ix + 1 5};
 0   � �near_boundary� �x1, theta� �sidual =U �LinAlg.Matrix.get(0, 0= /+."  1" q*. x1;
O &-.a /: 2: � �
   $   A   %� @make� �~x_m, ~y, ~� �    L   E 1�+et (t, (low, high)) = scale(Array.map(fst, points), dims);Q � ) �Q Eline* [_ q]->ListV e�*e,�$(e� w)->t, _�� Stylus.draw_g Q(ctx,q � iq  ��  ��xt = ML.LogReg.gradient_step(0.05w !, @yQ ��     O �60,
  N  a    @<Fit8 � y theta />;
    �    �  �         ������=Ⱥ����/��9�����            4�  C  � �  let get_color = (n, y) => {
    �(_, cols) = LinAlg.Matrix.size(y);+ �rec loop = ix => �  switch (ix)X 0  |" Awhen* =b  x H(-1)# E �   int_of_float(� 0get�  ix� )P 01 ?? :� e(ix + Y }�   0� �};

  �     I� �pallete = [|"green", "blue 2red 0ack	 Qpurpl �gray"|];
  8  r   !  x(� �,
  d  �  �' �Opred�Stheta�4 gforn(
l  = , &ix�	k {line =
� �List.mapU  e� �(e, near_boundary �  � /))K N->t,y �[low, high] *);� �Stylus.draw_� Q(ctx,� 1, ~�=��[ix], ()B 8},
\ �    �   �EpRandomT� N = yE�E
 Dmaker� Array.init(3, _^  � � .&�400.))),
� ��  *   E� {Q, set�  � �React.useState((
� 1(y)Q �~  �   DK�next = ML.LogReg.gradient_step(20.�P, x_m P �     N  16��  �   L` � clusters = 6;

�@oint �DataGen.P .- (	 Q, lenr ��  �   "&
spML.norm��[|1, 2|]. ��  �   ���len, row* � 0coliBsnd(� �[row]) - �= 0 ? 1.0 : 0.0)
      ),
    	�     0  �      
   ����L����r��f�<r4�>	3��              
�     $    ->ML.norm(_, ~ix=[|1, 2|], ());
    	�       �         �����"����`�^�9�d7��}              
9  
E     let (x_m, _) =
