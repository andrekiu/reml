        
�  V       ��������1�4�q�Z:A<RZ�}:��7            4V  �Amodule HypothesisFit = {
  [@react.component]
  let make = (~x_m, ~y, ~theta) =>: �  open LinAlg;  8 �points = 1  R^ �useMemo((>   �Array.init(Matrix.size(x_m)->fst, ix =>0 $  ( �get(ix, 1, . +,  e0, y))9 
 &})� @dims� �400, 400 q<Canvas z �{(ctx, scale� K Kh = � � 0� ?x+. x *.  1  ;Z �(_, (low, high)) =� (h,� 5 �get_bounds� � (x, h(x)* pextreme( [6  q '),G (} ]= Hre =� � �cappend �of_list(n #),')�  �hfst(re -Pter(e� �Stylus.draw_O ��t(e), ()e ^ 4 Bline3 �List.map(t,+"}}/> s};
};

Z�CostCovergence[\hist_V " pidx = l �float_of_� � xlength(= (-  ?l))�( �fold_left(Q(sum,nQcost)� P[(idx ) �, ...sum],8 [ �  n o280, 2n*A(t_c6 <, _)->s`[ =�TimeTravel �, ~onSelect0ter<ostringX4divP " {�E q({j|Con�bd in $e �steps.|j})} </D Ebstyle=Q `DOMRe.V e.� (��~display="flex", �maxWidth="280p �inHeight="5  h�flowY="scroll �X="visible  &() &)}�a>� i !  g'(t1*
  \<span �  onClick={_��(P Nt))}2 � key={Js.Int.toS�.ix+ �0� border="solid 1n( �padding="3# �margin="10# ~ � ��L P Js.F�.toFixedWithPrecision(�,�ogits=5y  B </�>- �	V !->*:rev 
�
| h YsFitPolyVqs_stablF � t): bool�0) >v 4|| QcswitchB hq| [a, b� _]�Aabs_�P(snd(r . 
 �b)) < 0.00001> �Tfalsew	
�
  type stat(_!: )(V
.$	"t,)�s2pion: op {((int, 6 / balpha:C ,\
)	x $ =� y .r %Q| Non/ j#hd) ��
- tSome((_�	�   -};�  Dial_)(�<y):� 0	� ��vector([|Random.�~400.),  #|]A�#[(��ML.LinReg.f � )� . �<2.,� ��onRestart��`, setS
  3� �xu�tEffect1E�!�?��Global.set='ou�	] 
�� +(s 		)	fprev =��;9 0nex���gradient_!1(s.�,a �M {� F
n" 0  (� � �^ z .� ]+}� }g *16 	!� ->ignore7: (8 % }J ![|E|� S�	��	�~justifyContent="space-evenly( ��<SRx_m y�%={\O)} /M
F  2Dirm�="column# � �  ~alignItems="centerA
�<button
�	/{
�?...~,1w�P
	K �/>
O	"2 "	"</� )>
�
E l<labelKa"Predi{A = ":) � � +;
�p(m0, m1�
�],- 1- � 0sig� "m1�� ? "-" : "+", tr_m0 =�
&m0�
2r  e	*m1T {	_m1)->b _a �$� $� Rx * $� �
A�i<input��defaultValue={� �K��onBlur={	
�vT �� Event.Focus.tarAe)##$ -;
bAlog( �"
�� . )� a| exce�
� (Failure(_
-()- t 'sOt})
�
'}}r//>��
�,={�}��%={�	�� 
c	� /}
� 
q� 
� �x�� ' � �_�QBelt.y	tz,"
,, �/ \ - ix4 !->� O} 	,Ex��/ }��� �5�Adata�OData�  QGen.P��.gen(500�G 3�
`normalQ#daZ<J�;�� /(_m 	�} />;
};    
�     q  ^           ��������:VT���M[�Z��            4�   �    8   ;  �/Stylus.draw_line(ctx, List.map(t, extremes), ());
    ?   @G �_canvas, points), ());
