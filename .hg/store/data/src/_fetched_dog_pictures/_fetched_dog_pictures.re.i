        �  �        ��������k��f� ;���z�����vh            4�  �)[@bs.val] external fetch: string => Js.Promise.t('a) = "% �";

type state =
  | LoadingDogs `ErrorF/   &  ed r(array(o �));

[@react.component]
let make = ()� @{
   ({ `, setS
  � R> 1use (1 �  d �!  // Notice that instead of `useEffect`, we have r0`. SeeC �reasonml.github.io/ -� �/docs/en/� �s#hooks for more info
 � e (�  �(  ��("https://dog.ceo/api/breeds/image/random/3")9 �|> then_(responseg  �##json()-   R1 �  }�(_previous w�C �##message�J � �resolve(! }�  caO_err� �� &aignore Q`Return9XNone,W4Som��...), meansaRdon'tg4anyK �cleanup to do bef.�unmounting. That's not 100% true. We shouldH �technically cancel�# p� � Unofortunately, �re's currently noL 0way� G aE 6�s in general� 1 be7 �less use�  � �; but since folks�  us�!em�� provide such anM �example � @. In�1lit� "is.� @just� �a plain Uback,� Sith a� �lation API  � }�A<div qstyle={� pDOMRe.S .���~height="120px", �display="fle �alignItems="center  � �ifyContent  "()
 1)}> @{swi/)/�  ���`("An e& 1 oc$d!L	�9  :...1 �d~3 =>�    �->Belt.A�.mapWithIndex((i,* )� �x( = /  �
 �  pwidth="o  qmarginRC Pi ===P� clength� p- 1 ? "c _ : "8k �borderRadius=$ �xShadow=M � 4px 16px rgb(200,  )= �ackgroundSize="cover( 
I_�={j|url($�?|j}1 	@Posi>�^ ��
� _� key=dogc�//>�2 ->�Y  }}��/div>;
};
    �       �           ����[��;Kk��������               �  �   };