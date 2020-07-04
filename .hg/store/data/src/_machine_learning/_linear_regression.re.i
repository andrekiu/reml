          �        �����������{�EO�����8�2���            4�  �Fmodule HypothesisFit = {
  [@react.component]
  let make = (~x_m, ~y, ~hist_theta) =>? �  open LinAlg;  = �points = 1  Rc �useMemo((>   �Array.init(Matrix.size(x_m)->fst, ix =>0 $  ( �get(ix, 1, . +,  e0, y))9 
 &})� @dims� �400, 400 � � = List.hd(� � * q<CanvasI � �{(ctx, scale� Z Kh = � � 0� ix+. x *.  1  ;Z A(t_c� �, (low, high)) =� (�,� < �get_bounds�  M �((x, h(x))4 �Pter(e. �Stylus.draw_h E Ce)),G 7 Bline6 [�  � '),� (� ]E "}}�/�> s};
};

��CostCovergence�� " pidx = l �float_of_� ,hlength08 -  ?l)),( �fold_left((� (sum, (_, cost)� P[(idx ) �, ...sum],8 [ �  
 e280, 2
�!�_|"->8~of_list�7map[ KsFitPoly �qs_stabl�  t): bool��0) >' 4|| �cswitchB q| [a, b� _])Aabs_1P(snd( . 
 �b)) < 0.001< _^Dalse�
�� 60ial� t� �y��b �.Q�vector([|Random.� ~400.),  |w"[(I� ML.LinReg.� � #)]�k�onRestartjfc, setT�zS!{96� 5 tEffect1��!=���? Js.Global.� Wimeou�W +
  � [ j	sOprev�7 0nex
��gradient_step(V �D  [(B   � ]I ;}),*16 ) �->ignorel7: (� DNone }J &[|� |�4div�atyle={`DOMRe.� e.��� ~display="flex"� �~justifyContent="space-evenly( (� $)}�<�	Wx_m y�% /) � � � 0  ~ �Direction="column# � �  ~alignItems="center  � � �  <button* �onClick={_�"�	9_�:�K�.string("h 6")}� /� � b�f/div>
 � z�#da�!Da��  QGen.P(�.gen(500)@, �`normaly#daX
</�r�� /(_m 	�} />;
};        �  H           ����״��$0��f�x����~�            4�  �+   .   X   %  let make = (~x_m, ~y, ~theta) => {
  .  X  ��  �  �   D �(_, (low, high)) = scale(points, dims);
5 �get_bounds = xn �(x, h(x)* pextreme( [6  q '),G (} ]= Fre =  � �Array.append �of_list(n 2), � )� �t = fst(re L `iter(e� �Stylus.draw_O �(ctx, t(e)a Z 0 Bline/ �List.map(t, 'B   �Xmodule TimeTravel = {
  [@react.component]
�Qhist_��, ~onSelect �  �  ��string_of_� � vlength(F �S<div>�  1 {R� E �({j|Converged in $e �steps.|j})} </D *bstyle=Q `DOMRe.; e.� (��~display="flex", �maxWidth="280p �inHeight="5 �overflowY="scroll �X="visible  &() 5)}> aD�  i p  (ix, @costxL  \<span �  onClick={_��(P Nt))}2 � key={Js.Int.toS�.ix+ �0� border="solid 1n( �padding="3# �margin="E } � ��L � Js.Floa�FixedWithPrecision(�,�ogits=5y  A </�>- � ) !->):rev 	�.,
| g  �`};
};
d�7  S   ��p) > 200( �r  �   >V �| [a, b, ..._]iPabs_f0�(snd(a) -. 
 �b)) < 0.00001J ��  �   �
  type state�!: ��(LinAlg.Matrix.t, g )ss�pion: op {((int, 6 / balpha:C ,

��initial_� (:4y):� 8�P  ~   qL
�C: [(u�ML.LinReg.2 W $)]�� DNone � "2. }��  +   M�� `, setS
  ��1use !((�� � pbO  n?E0!is( 2blec .	 1 ��  �  �'� &(sk
 � bprev =vHhd(s_ o->fst;9 0nex�\�gradient_a1(s.8,a mM {�N...s`�" 0  (� � �^ z . ]l�	  	    ![|�0|], ��  	�   ��HypothesisFitS 5x_m y
 � =/cswitch|.�)T|� �H�	3 PSome(x
r ?  & ,}

 r/>
  
� / K�?...	,sD}b
�  (�[  �  �dl<label	 "AQ A = "�$ 6 Hinpu
�  defaultValue={��M� l�onBlur={e� CvT (�Event.Focus.targe�
!##$ -;
Alog( T_ J
� . )� a| exce�� (Failure(_�-()- t �s�Mt})
	 ';/>
� l
�,={�Y u	%={�	� V/})�� aCostCos?nce� 
� ��� ' � h
_�
QBelt.t.
�$,, �/ \ - ix4 !->� O} ,ExMt	/ }� P  />
    �    �  Q         ����0�R;��=�\8y�*��g5�            4  B   � �  let get_theta = state => {
    switch ( �.selection) Q| Non/ sList.hd) 3hisS c)->fst- �Some((_,  )9    1};
 �
  �  �   7  �<HypothesisFit x_m y: %={� | �)} />
  D 5  �<label> {React.string("Predi� � = ")} </) 
; {)%s ;) R�(m0, m1) = ( �	  LinAlg.Matrix.get(0, 0,- 1- � 0sig� �m1 < 0.0 ? "-" : "+", �tr_m0 = Js.Float.toFixedWithPrecision� �~digits=2r �abs_m1 =�   fT o(m1)->b _a 	�C{j|$� $� Rx * $� U|j})}: f</span�p<span>
    �     '  R         ������@�XD�&|����m*֥            4/   �  P  r   #  �~margin="10px",
