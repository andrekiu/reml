          "        ����������u�l��2N
}��㐧2            4"  �)let draw_point = (ctx, (x, y)) => {
  open Webapi.Canvas � 2d;
  beginPath= ) �arc(
    N 	 ~ y Sr=1.0 �startAngle=0 2end �Pervasives.acos(-1.) *. 2.* �anticw=false � Cfill� @};

� qclear_c� � Fw, h� � .�  A BRect; �~x=0., ~y �w=float_of_int(w), ~h 2h))� � |Eline� ?ptsx �  8 �rec loop =1 1 =>� �switch (D { �| [f, s, ...t]) %  � emoveTo� afst(f)� �snd(f));2  � 2 s2 s2  � $([|  0| _� �ignore() 7};
` �setStrokeStyleh  �String, "red"S 	� 2Wid�J, 1. ��  ,
 | �(ctx);
};         s  Z           �����W�^I�To��N�y�"L~��W            4t     �2$   8let draw_point = (ctx, (x, y), ~color="black", ()) => {
   � � $  setFillStyleA �String, color);
    z     �  l         ����\���~��83�>o�>m8��            4�   �T  �  �   2let draw_line = (ctx, pts, ~color="red", ()) => {
  �  �   8  Canvas2d.setStrokeStyleG  �String, color);
    �     �  d         ����i�9�^]�������%n�'            4  B  j �> �};

let draw_square = (ctx, p, side, density) => {
  open Webapi.Canvas;
  G �color = {j|rgb($: ., 
 @)|j}7 A � 2d.setFillStyle�  rString,_ )6 �fillRect(~x=fst(p), ~y=snd "w=� #~h	 `ctx);
